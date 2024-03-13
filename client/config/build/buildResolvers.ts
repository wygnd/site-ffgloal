import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";
import path from "path";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
      styles: options.paths.stylesSrc,
    }
  }
}