import presetWeapp from "unocss-preset-weapp";
import { extractorAttributify, transformerClass } from "unocss-preset-weapp/transformer";
import transformerDirectives from "@unocss/transformer-directives";
import { presetIcons } from "@unocss/preset-icons";

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default {
    presets: [
        // https://github.com/MellowCo/unocss-preset-weapp
        presetWeapp(),
        // attributify autocomplete
        presetWeappAttributify(),
        // 图标库（小程序必须用 inline 模式，避免字体加载问题）
        presetIcons({
            scale: 1.2,
            mode: "auto",
        }),
    ],
    shortcuts: [
        {
            "border-base": "border border-gray-500_10",
            center: "flex justify-center items-center",
        },
    ],
    rules: [],
    transformers: [
        transformerDirectives({
            enforce: "pre",
        }),

        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
        transformerAttributify(),

        // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
        transformerClass(),
    ],
};
