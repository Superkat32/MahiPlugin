import {ID} from "./ts/constants";

const PathModule = require('path')

module.exports = {
    mode: 'development',
    devtool: false,
    target: 'node',
    entry: './ts/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: `${ID}.js`,
        path: PathModule.resolve(__dirname, '..')
    }
}