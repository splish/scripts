const chokidar = require('chokidar')
const _ = require('lodash')
const path = require('path')

const cwd = process.cwd()
const src = path.join(cwd, 'src')

const build = _.debounce(() => {
  require('./build-typescript')
}, 1000)

chokidar
  .watch(src, {
    persistent: true
  })
  .on('add', () => {
    build()
  })
  .on('change', () => {
    build()
  })
  .on('unlink', () => {
    build()
  })
