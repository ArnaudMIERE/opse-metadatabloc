import vue from "rollup-plugin-vue";
import alias from '@rollup/plugin-alias';
const json = require("@rollup/plugin-json");
import importResolver from "rollup-plugin-import-resolver";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { i18n } from "./lib/index.js";

const postcss = require("rollup-plugin-postcss");
const ComponentVue = [
    //"./src/lib/modules/myproject-fake-block/myproject-fake-block.vue",
    "./src/lib/modules/opse-datasetname-block/opse-datasetname-block.vue",
];

const confFile = ComponentVue.map(componentpath => {
    const confFileName = componentpath.split("/").reverse()[0];
    return {
        input: componentpath,
        output: {
            file: "modules/" + confFileName + ".esm.js",
            format: "esm"
        },
        external: ["vue-i18n", "vue"],
        plugins: [
            alias({
                entries: {
                    ['@']: __dirname + '/src'
                }
            }),
            commonjs({
                include: /node_modules/
            }),
            resolve(),
            importResolver({ extensions: [".js", ".vue"] }),
            postcss(),
            json(),
            i18n(),
            vue({ customBlocks: ["i18n"] })
        ]
    };
});
export default confFile;