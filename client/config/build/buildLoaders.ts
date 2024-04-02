import {ModuleOptions} from 'webpack';
import {BuildOptions} from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

  const isDev = options.mode === "development";

  const assetsLoader = [
    /* FONTS */
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
    /* IMAGES */
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    /* GIFS */
    {
      test: /\.gif$/,
      type: 'asset/inline',
    },
  ];

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ],
  }

  const scssLoader = {
    // test: /\.s[ac]ss$/i,
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        // Creates `style` nodes from JS strings
        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      {
        // Translates CSS into CommonJS
        loader: "css-loader",
        options: {
          // modules: {
          //   localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          // },
          sourceMap: true,
        },
      },
      {
        // Compiles Sass to CSS
        loader: 'sass-loader'
      },
      {
        loader: 'postcss-loader',
      },
    ]
  }

  const
    babelLoader = buildBabelLoader(options);

  /* Важен порядок, если лоадеры обрабатывают одинаковые файлы (по типу css) !!! */
  return [
    svgLoader,
    ...assetsLoader,
    scssLoader,
    babelLoader,
    {
      test: /\.script\.js$/,
      use: [
        {
          loader: 'script-loader',
          options: {
            sourceMap: true,
          },
        },
      ]
    }
  ]
}
