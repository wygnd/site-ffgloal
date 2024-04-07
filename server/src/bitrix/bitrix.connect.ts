import bitrix from "@2bad/bitrix";
import * as process from "node:process";

export const BitrixRepository = bitrix(process.env.BITRIX_REPOSITORY_URL);