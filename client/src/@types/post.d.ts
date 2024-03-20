export interface IPost {
  post_id: number;
  author_id: number;
  title: string;
  content: string;
  name: string;
  menu_order: number;
  type: string;
}

export interface IPostsRequest {
  post_type: string;
  number_posts: number;
  paged: number;
  orderBy?: "post_id" | "title" | "menu_order";
  order?: "ASC" | "DESC";
  status?: "Publish" | "Draft" | "Hidden";
}

export interface IPostRequest {
  post_id: number;
  attributes?: string[]
}
