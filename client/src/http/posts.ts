import {IPost} from "@/@types/post";
import {$api} from "@/http/index";

export default async function get_posts(type: string): Promise<IPost> {
  const data = await $api.get(`/posts/${type}`);
  return data.data;
}