const spawn = require('cross-spawn')
const path = require('path')

const { resolveBin } = require('../utils')

const args = process.argv.slice(2)

const relativeArgs = args.map(a => a.replace(`${process.cwd()}/`, ''))

const result = spawn.sync(resolveBin('rimraf'), relativeArgs, {
  stdio: 'inherit'
})
