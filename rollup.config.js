
import builder from "@daybrush/builder";

const external = {
    "scenejs": "Scene",
};

export default builder([
    {
        external,
        name: "Scene",
        input: "src/index.umd.ts",
        output: "./dist/effects.js",
        exports: "named",
    },
    {
        external,
        name: "Scene",
        input: "src/index.umd.ts",
        output: "./dist/effects.js",
        exports: "named",
        uglify: true,
    },
    {
        external,
        input: "src/index.ts",
        output: "./dist/effects.esm.js",
        exports: "named",
        format: "es",
    },
]);
