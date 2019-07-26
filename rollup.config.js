'use strict'

import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import {uglify} from 'rollup-plugin-uglify'

function genConfig(options = {}) {
  const plugins = [json()]
  const name = options.uglify ? 'apib.min' : 'apib'
  const output = {
    file: `dist/${name}.js`,
    format: options.format || 'umd',
    name: 'apib',
    globals: {
      axios: 'axios'
    }
  }
  if (options.sourcemap) {
    output.sourcemap = true
  }
  plugins.push(babel({
    babelrc: false,
    presets: [
      ['@babel/preset-env', {
        modules: false
      }]
    ],
    plugins: [
      ['@babel/proposal-class-properties', {
        loose: true
      }],
      ['@babel/transform-classes', {
        loose: true
      }]
    ]
  }))
  if (options.uglify) {
    plugins.push(uglify())
  }
  const config = {
    input: 'lib/apib.js',
    output,
    plugins,
    external: [
      'axios'
    ]
  }
  return config
}

export default [
  genConfig({
    sourcemap: true
  }),
  genConfig({
    sourcemap: true,
    uglify: true
  })
]
