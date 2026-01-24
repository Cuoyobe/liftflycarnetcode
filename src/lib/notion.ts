import { Client } from '@notionhq/client';
import type {
    PageObjectResponse,
    QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';

/**
 * 新闻项数据结构
 */
export interface NewsItem {
    id: string;          // 页面 ID
    title: string;       // 标题
    summary: string;     // 摘要
    cover: string | null;// 封面图 URL
    link: string;        // 外部链接
    zhihuLink?: string;  // 知乎链接（可选）
    xLink?: string;      // X链接（可选）
    publishedAt: string; // 发布日期
}

/**
 * 知识库文章数据结构
 */
export interface KBArticle {
    id: string;          // 页面 ID
    title: string;       // 标题
    summary: string;     // 摘要
    category: string;    // 分类
    slug: string;        // URL 标识
    order: number;       // 排序
    publishedAt: string; // 发布日期
    locale: string;      // 语言
    content: ArticleBlock[]; // 文章内容块
}

/**
 * 文章内容块类型
 */
export interface ArticleBlock {
    type: 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3' | 'bulleted_list_item' | 'numbered_list_item' | 'quote';
    text: string;
}

// Notion 客户端初始化
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

// 数据库 ID 配置
const newsDatabaseId = process.env.NOTION_DATABASE_ID ?? '';
const kbDatabaseId = process.env.NOTION_KB_DATABASE_ID ?? '';

/**
 * 从 Notion 富文本数组中提取纯文本
 */
function getPlainText(
    richText: Array<{ plain_text: string }>
): string {
    return richText.map((t) => t.plain_text).join('');
}

/**
 * 从 Notion 页面中提取封面图 URL
 */
function getCoverUrl(page: PageObjectResponse): string | null {
    if (!page.cover) return null;

    if (page.cover.type === 'external') {
        return page.cover.external.url;
    }

    if (page.cover.type === 'file') {
        return page.cover.file.url;
    }

    return null;
}

/**
 * 将 Notion 页面解析为 NewsItem
 */
function parseNewsItem(page: PageObjectResponse): NewsItem | null {
    const properties = page.properties;

    // Title (title type)
    const titleProp = properties['Title'] || properties['标题'];
    if (!titleProp || titleProp.type !== 'title') return null;
    const title = getPlainText(titleProp.title);

    // Summary (rich_text type)
    const summaryProp = properties['Summary'] || properties['简介'];
    const summary = summaryProp?.type === 'rich_text'
        ? getPlainText(summaryProp.rich_text)
        : '';

    // Link (url type)
    const linkProp = properties['Link'] || properties['链接'];
    const link = linkProp?.type === 'url' ? linkProp.url ?? '' : '';

    // Zhihu Link (url type)
    const zhihuLinkProp = properties['Zhihu Link'] || properties['知乎链接'];
    const zhihuLink = zhihuLinkProp?.type === 'url' ? zhihuLinkProp.url ?? undefined : undefined;

    // X Link (url type)
    const xLinkProp = properties['X Link'] || properties['X链接'];
    const xLink = xLinkProp?.type === 'url' ? xLinkProp.url ?? undefined : undefined;

    // Published date (date or created_time)
    const dateProp = properties['Date'] || properties['日期'];
    const publishedAt = dateProp?.type === 'date' && dateProp.date
        ? dateProp.date.start
        : page.created_time;

    // Cover image
    const cover = getCoverUrl(page);

    return {
        id: page.id,
        title,
        summary,
        cover,
        link,
        zhihuLink,
        xLink,
        publishedAt,
    };
}

/**
 * 将 Notion 页面解析为 KBArticle
 */
function parseKBArticle(page: PageObjectResponse): KBArticle | null {
    const properties = page.properties;

    // Title (title type)
    const titleProp = properties['Title'] || properties['标题'];
    if (!titleProp || titleProp.type !== 'title') return null;
    const title = getPlainText(titleProp.title);

    // Summary (rich_text type)
    const summaryProp = properties['Summary'] || properties['简介'];
    const summary = summaryProp?.type === 'rich_text'
        ? getPlainText(summaryProp.rich_text)
        : '';

    // Category (select type)
    const categoryProp = properties['Category'] || properties['分类'];
    const category = categoryProp?.type === 'select' && categoryProp.select
        ? categoryProp.select.name
        : 'General';

    // Locale (select type) - New Field
    const localeProp = properties['Locale'] || properties['语言'];
    const locale = localeProp?.type === 'select' && localeProp.select
        ? localeProp.select.name
        : 'zh'; // Default to Chinese if not specified

    // Slug (rich_text type)
    const slugProp = properties['Slug'] || properties['链接标识'];
    const slug = slugProp?.type === 'rich_text'
        ? getPlainText(slugProp.rich_text)
        : '';

    // Order (number type)
    const orderProp = properties['Order'] || properties['排序'];
    const order = orderProp?.type === 'number' && orderProp.number !== null
        ? orderProp.number
        : 999;

    // Published date
    const dateProp = properties['Date'] || properties['日期'];
    const publishedAt = dateProp?.type === 'date' && dateProp.date
        ? dateProp.date.start
        : page.created_time;

    return {
        id: page.id,
        title,
        summary,
        category,
        locale,
        slug,
        order,
        publishedAt,
        content: [],
    };
}

/**
 * 获取并解析页面内容块
 */
async function getPageContent(pageId: string): Promise<ArticleBlock[]> {
    try {
        const blocks = await notion.blocks.children.list({
            block_id: pageId,
        });

        const parsedBlocks: ArticleBlock[] = [];

        for (const block of blocks.results) {
            if (!('type' in block)) continue;

            const type = block.type;
            let text = '';

            // @ts-ignore
            const richText = block[type]?.rich_text;
            if (Array.isArray(richText)) {
                text = getPlainText(richText);
            }

            if (text) {
                switch (type) {
                    case 'paragraph':
                    case 'heading_1':
                    case 'heading_2':
                    case 'heading_3':
                    case 'bulleted_list_item':
                    case 'numbered_list_item':
                    case 'quote':
                        parsedBlocks.push({
                            type: type as ArticleBlock['type'],
                            text,
                        });
                        break;
                }
            }
        }

        return parsedBlocks;
    } catch (error) {
        console.error(`Failed to fetch content for page ${pageId}:`, error);
        return [];
    }
}

/**
 * 从 Notion 数据库获取新闻列表
 * 支持中英文属性名
 */
export async function getNewsItems(): Promise<NewsItem[]> {
    // 如果环境变量未配置,直接返回空数组,避免构建时的警告
    if (!process.env.NOTION_API_KEY || !newsDatabaseId) {
        console.warn('Notion credentials not configured. News section will be empty.');
        return [];
    }

    const queryInfo = async () => {
        return await notion.databases.query({
            database_id: newsDatabaseId,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ],
            page_size: 60,
        });
    };

    let response: QueryDatabaseResponse;
    try {
        response = await queryInfo();
    } catch (error) {
        console.error('Failed to fetch news from Notion:', error);
        return [];
    }

    const items: NewsItem[] = [];
    for (const page of response.results) {
        if (!('properties' in page)) continue;
        const item = parseNewsItem(page as PageObjectResponse);
        if (item && item.title) {
            items.push(item);
        }
    }

    // Sort by publishedAt in descending order (newest first)
    items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return items;
}

/**
 * 从 Notion 数据库获取知识库文章列表
 * 支持中英文属性名
 */
export async function getKBArticles(): Promise<KBArticle[]> {
    // 如果环境变量未配置,直接返回空数组,避免构建时的警告
    if (!process.env.NOTION_API_KEY || !kbDatabaseId) {
        console.warn('Notion credentials not configured. Knowledge base will be empty.');
        return [];
    }

    const queryInfo = async (useChinese: boolean) => {
        return await notion.databases.query({
            database_id: kbDatabaseId,
            filter: {
                property: useChinese ? '状态' : 'Status',
                select: {
                    equals: useChinese ? '已发布' : 'Published',
                },
            },
            sorts: [
                {
                    property: useChinese ? '排序' : 'Order',
                    direction: 'ascending',
                },
            ],
        });
    };

    let response: QueryDatabaseResponse;
    try {
        // First try Chinese schema
        response = await queryInfo(true);
    } catch (error) {
        // Fallback to English schema
        try {
            response = await queryInfo(false);
        } catch (finalError) {
            console.error('Failed to fetch KB articles from Notion:', finalError);
            return [];
        }
    }

    const articles: KBArticle[] = [];
    for (const page of response.results) {
        if (!('properties' in page)) continue;
        const article = parseKBArticle(page as PageObjectResponse);
        if (article && article.title) {
            // Fetch content for each article
            article.content = await getPageContent(article.id);
            articles.push(article);
        }
    }
    return articles;
}
