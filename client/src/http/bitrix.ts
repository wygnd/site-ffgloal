import {IFormData} from "@/@types/form";
import {$api} from "@/http/index";

export async function create_deal(formData: IFormData) {
  try {
    const {data} = await $api.post("/bitrix/deal/create", formData);
    return data;
  } catch (error) {
    console.log(error?.response?.data?.message);
    return null;
  }
}