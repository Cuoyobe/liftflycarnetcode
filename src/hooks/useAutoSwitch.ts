import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * 自动切换 Hook
 * @param itemCount 项目总数
 * @param interval 切换间隔(毫秒)
 * @returns { currentIndex, direction, handleManualSwitch }
 */
export function useAutoSwitch(itemCount: number, interval: number = 5000) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<NodeJS.Timeout>();
    const currentIndexRef = useRef(currentIndex);

    // 保持 ref 同步
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const startAutoSwitch = useCallback(() => {
        if (itemCount <= 1 || interval <= 0) return;

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % itemCount);
        }, interval);
    }, [itemCount, interval]);

    const stopAutoSwitch = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = undefined;
        }
    }, []);

    // 自动切换逻辑 - interval 为 0 时禁用自动切换
    useEffect(() => {
        startAutoSwitch();
        return () => stopAutoSwitch();
    }, [startAutoSwitch, stopAutoSwitch]);

    /**
     * 手动切换分类
     * @param index 目标索引
     */
    const handleManualSwitch = useCallback((index: number) => {
        setDirection(index > currentIndexRef.current ? 1 : -1);
        setCurrentIndex(index);

        // 重置计时器
        if (interval > 0) {
            stopAutoSwitch();
            startAutoSwitch();
        }
    }, [interval, startAutoSwitch, stopAutoSwitch]);

    return { currentIndex, direction, handleManualSwitch, stopAutoSwitch, startAutoSwitch };
}
