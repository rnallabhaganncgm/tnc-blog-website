export interface Post {
  excerpt: string;
  ID: number;
  post_title: string;
  slug: string;
  post_date: string;
  post_content: string;
  post_excerpt?: string | null;
  post_status: string;
  post_modified?: string; 
  author_name: string;
  author_slug: string;
  author_avatar_url?: string; 
  author_bio?: string;
  category_name?: string;
  category_slug?: string;
  tags?: string;
  thumbnail_url?: string;
}

export type Category = {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
};
