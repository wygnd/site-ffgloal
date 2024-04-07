import bitrix from "@2bad/bitrix";
import * as process from "node:process";

const BitrixRepository = bitrix(process.env.BITRIX_REPOSITORY_URL);