/* eslint-disable @typescript-eslint/no-unused-vars */

import { readFileSync, writeFileSync } from 'fs'
import { argv, cwd } from 'process'

const VERSION_TYPE = argv[2]
const PACKAGE_SOLUTION = './package.json'

const updatePackageVersion = (basePath) => {
  try {
    let ps = JSON.parse(readFileSync(basePath + PACKAGE_SOLUTION, 'utf-8'))
    let version = String(ps.version)
    let newversion = ''
    let tp1 = version.split('.')
    switch (VERSION_TYPE) {
      case 'Major': {
        let tp2 = Number(tp1[0])
        tp2 += 1
        newversion = String(tp2 + '.0.0')
        break
      }
      case 'Minor': {
        let tp2 = Number(tp1[1])
        tp2 += 1
        newversion = String(tp1[0] + '.' + tp2 + '.0')
        break
      }
      case 'Draft': {
        let tp2 = Number(tp1[2])
        tp2 += 1
        newversion = String(tp1[0] + '.' + tp1[1] + '.' + tp2)
        break
      }
    }
    ps.version = newversion
    writeFileSync(basePath + PACKAGE_SOLUTION, JSON.stringify(ps, null, '\t'))
    console.log('Version updated to ' + newversion)
  } catch (e) {
    // don't care
  }
}

let basePath = cwd() + '\\'
updatePackageVersion(basePath)
