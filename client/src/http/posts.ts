import {IPost, IPostRequest, IPostsRequest} from "@/@types/post";
import {$api} from "@/http/index";

export async function get_posts({
                                  post_type,
                                  number_posts,
                                  orderBy,
                                  order,
                                  paged,
                                  status
                                }: IPostsRequest): Promise<IPost[]> {
  const response = await $api.post("/posts", {
    post_type,
    number_posts,
    paged,
    orderBy: orderBy || "post_id",
    order: order || "ASC",
    status: status || "Publish"
  });

  return response.data;
}

export async function get_post(options: IPostRequest): Promise<IPost> {
  const response = await $api.post('/posts/post', {
    post_id: options.post_id,
    attributes: options.attributes
  });

  return response.data;
}