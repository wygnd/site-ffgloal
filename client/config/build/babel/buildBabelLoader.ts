import {removeDataTestAttrs} from "./removeDataTestAttrs";
import {BuildOptions} from "../types/types";
import {PluginItem} from "@babel/core";

export function buildBabelLoader(options: BuildOptions) {

  const isDev = options.mode === "development";

  let buildBabelPlugins: PluginItem[] = [];

  if (isDev) {
  } else {
    buildBabelPlugins.push(
      [
        removeDataTestAttrs,
        {
          props: ["data-testId"]
        }
      ],
      "@babel/plugin-transform-runtime"
    );
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          ["@babel/preset-react", {
            runtime: isDev ? "automatic" : "classic"
          }]
        ],
        plugins: buildBabelPlugins,
      }
    }
  }
}