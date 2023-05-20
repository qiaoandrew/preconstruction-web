import { Client } from '@notionhq/client';
import { BlogPreview } from '@/types/types';
import { changeGoogleDriveURL } from '@/util/helpers';

const API_KEY = process.env.NEXT_PUBLIC_NOTION_API_KEY;
const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID as string;

const notion = new Client({ auth: API_KEY });

/**
 * Get list of blogs in database.
 */
const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: DATABASE_ID });
  return response.results;
};

/**
 * Get blog previews.
 */
export const getBlogPreviews = async (): Promise<BlogPreview[]> => {
  const blogs = await getDatabase();
  return blogs.map((blog: any) => {
    const id = blog.properties.ID.rich_text[0].text.content;
    return {
      id,
      link: `/blog/${id}`,
      title: blog.properties.Title.title[0].text.content,
      date: blog.properties.Date.date.start.split('-').join('/'),
      image: changeGoogleDriveURL(blog.properties.Image.url),
      description: blog.properties.Description.rich_text[0].text.content,
    };
  });
};

/**
 * Get paths of blog pages.
 */
export const getBlogPaths = async () => {
  const blogs = await getDatabase();
  return blogs.map((blog: any) => ({
    params: { id: blog.properties.ID.rich_text[0].text.content },
  }));
};

/**
 * Get ID of Notion page by id.
 */
export const getPageId = async (id: string) => {
  const databaseQuery = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'ID',
      rich_text: {
        equals: id,
      },
    },
  });
  return databaseQuery.results[0].id;
};

/**
 * Get title, date, image of blog page by id.
 */
export const getLanding = async (id: string) => {
  const page = (await notion.pages.retrieve({ page_id: id })) as any;
  return {
    title: page.properties.Title.title[0].text.content,
    date: page.properties.Date.date.start.split('-').join('/'),
    image: changeGoogleDriveURL(page.properties.Image.url),
  };
};

/**
 * Return all blocks in a page given page id.
 */
export const getBlocks = async (id: string) => {
  const response = await notion.blocks.children.list({
    block_id: id,
    page_size: 50,
  });
  let blocks: any[] = [];
  response.results.forEach((block: any) => {
    switch (block.type) {
      case 'paragraph':
        blocks.push({
          type: 'p',
          id: block.id,
          richText: block.paragraph.rich_text,
        });
        break;
      case 'heading_2':
        blocks.push({
          type: 'h2',
          id: block.id,
          richText: block.heading_2.rich_text,
        });
        break;
      case 'heading_3':
        blocks.push({
          type: 'h3',
          id: block.id,
          richText: block.heading_3.rich_text,
        });
        break;
      case 'bulleted_list_item':
        if (blocks.length === 0 || blocks.at(-1).type !== 'ul') {
          blocks.push({
            type: 'ul',
            id: block.id,
            items: [block.bulleted_list_item.rich_text],
          });
        } else {
          blocks.at(-1).items.push(block.bulleted_list_item.rich_text);
        }
        break;
      case 'numbered_list_item':
        if (blocks.length === 0 || blocks.at(-1).type !== 'ol') {
          blocks.push({
            type: 'ol',
            id: block.id,
            items: [block.numbered_list_item.rich_text],
          });
        } else {
          blocks.at(-1).items.push(block.numbered_list_item.rich_text);
        }
        break;
      case 'image':
        blocks.push({ type: 'img', id: block.id, url: block.image.file.url });
        break;
    }
  });
  return blocks;
};
