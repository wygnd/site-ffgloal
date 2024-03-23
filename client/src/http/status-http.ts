import {IStatus} from "@/@types/status";
import {$apiAuth} from "@/http/index";

export async function get_statuses(): Promise<IStatus[]> {
  try {
    const response = await $apiAuth.get('/status');
    return response.data;
  } catch (e) {
    // console.log(e.message)
    return [];
  }
}