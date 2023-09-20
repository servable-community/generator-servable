/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
import fs from 'fs'

export default async (props) => {
    const { generator, location, url, } = props

    const options = location ? {
        cwd: location
    } : {}

    generator.spawnCommandSync('rm', ['-rf', `${location}/_cloned`], options)
    generator.spawnCommandSync('git', ['clone', '--branch', 'master', url, '_cloned'], options)
    generator.copyDestination(`${location}/_cloned/src`, `${location}`)


    try {
        const targetPath = `${location}/_cloned/package.json`
        const rawdata = await fs.promises.readFile(targetPath, 'utf8')
        const originPackageJSON = JSON.parse(rawdata)
        generator.spawnCommandSync('rm', ['-rf', `${location}/_cloned`], options)

        return { originPackageJSON }
    } catch (e) {
        console.error(e)
        return null
    }


}
