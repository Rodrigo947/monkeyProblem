import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { resolve } from "path";

const config = {
  input: "mainFiles/Main.ts",
  output: {
    dir: "compiledFiles",
    format: "esm",
  },
  plugins: [
    typescript(),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts"],
      include: resolve("mainFiles", "**", "*.ts"),
    }),
  ],
};

export default config;
