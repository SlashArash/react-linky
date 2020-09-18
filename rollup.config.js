import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const input = "src/index.tsx";

const plugins = [typescript()];

export default {
  input,
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  plugins,
};
