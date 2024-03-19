export interface IPost {
  post_id: number;
  author_id: number;
  title: string;
  content: string;
  name: string;
  menu_order: number;
  type: string;
}

export interface IPostArgs {
  number_posts: number;
  post_type: string;
}