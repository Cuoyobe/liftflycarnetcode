'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface GridCell {
    id: number;
    x: number;
    y: number;
    isActive: boolean;
    distance: number;
}

interface InteractiveGridProps {
    cellSize?: number;
    gap?: number;
    activeRadius?: number;
}

export function InteractiveGrid({
    cellSize = 40,
    gap = 4,
    activeRadius = 120,
}: InteractiveGridProps): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>();
    const [cells, setCells] = useState<GridCell[]>([]);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Calculate grid dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({ width: rect.width, height: rect.height });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Generate grid cells
    useEffect(() => {
        if (dimensions.width === 0 || dimensions.height === 0) return;

        const totalCellSize = cellSize + gap;
        const cols = Math.ceil(dimensions.width / totalCellSize) + 2;
        const rows = Math.ceil(dimensions.height / totalCellSize) + 2;

        const newCells: GridCell[] = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                newCells.push({
                    id: row * cols + col,
                    x: col * totalCellSize,
                    y: row * totalCellSize,
                    isActive: false,
                    distance: Infinity,
                });
            }
        }
        setCells(newCells);
    }, [dimensions, cellSize, gap]);

    // Handle mouse move with RAF throttling
    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current) return;

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            rafRef.current = requestAnimationFrame(() => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePos({ x, y });
            });
        },
        []
    );

    // Cleanup RAF on unmount
    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    // Handle mouse leave
    const handleMouseLeave = useCallback(() => {
        setMousePos({ x: -1000, y: -1000 });
    }, []);

    // Calculate cell states based on mouse position
    const getCellStyle = useCallback(
        (cell: GridCell) => {
            const cellCenterX = cell.x + cellSize / 2;
            const cellCenterY = cell.y + cellSize / 2;
            const dx = mousePos.x - cellCenterX;
            const dy = mousePos.y - cellCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < activeRadius) {
                const intensity = 1 - distance / activeRadius;
                const scale = 1 - intensity * 0.4;
                const opacity = 0.15 + intensity * 0.35;
                const blur = intensity * 2;

                return {
                    transform: `scale(${scale})`,
                    opacity,
                    boxShadow: `inset 0 ${intensity * 8}px ${blur + 4}px rgba(0, 0, 0, ${intensity * 0.5})`,
                    background: `var(--color-soft-white)`, // Use soft-white but rely on opacity
                };
            }

            return {
                transform: 'scale(1)',
                opacity: 0.15, // Slightly higher opacity for visibility
                boxShadow: 'none',
                background: 'var(--color-border)', // Use border color for inactive cells
            };
        },
        [mousePos, cellSize, activeRadius]
    );

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {cells.map((cell) => {
                const style = getCellStyle(cell);
                return (
                    <motion.div
                        key={cell.id}
                        className="absolute rounded-sm transition-all duration-150 ease-out"
                        style={{
                            left: cell.x,
                            top: cell.y,
                            width: cellSize,
                            height: cellSize,
                            ...style,
                        }}
                    />
                );
            })}
        </div>
    );
}
