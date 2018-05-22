const spawn = require('cross-spawn')
const path = require('path')

const { resolveBin } = require('../utils')

const args = process.argv.slice(2)

const relativeArgs = args.map(a => a.replace(`${process.cwd()}/`, ''))

const cwd = process.cwd()
const dist = path.join(cwd, 'dist')

const outDir = ['--outDir', dist]

spawn.sync(resolveBin('rimraf'), outDir, { stdio: 'inherit' })

spawn.sync(resolveBin('tsc'), ['--outDir', dist, ...relativeArgs], {
  stdio: 'inherit'
})

spawn.sync(resolveBin('babel'), [dist, '--out-dir', dist], {
  cwd,
  stdio: 'inherit'
})
