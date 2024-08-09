export default interface PostModel {
  id?: number;
  title: string;
  image_url: string;
  slug: string;
  category_id: number;
  category_title?: string;
  is_published: boolean;
  published_at?: number;
  keywords?: string;
  description?: string;
  summary?: string;
  content?: string;
}
