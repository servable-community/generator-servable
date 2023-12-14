/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"
import writeReleaseType from "../../releaseType/write/index.js"

export default async (props) => {

    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    payload.protocolDescription = payload.protocolDescription ? payload.protocolDescription : ''
    payload.author = payload.author ? payload.author : ''

    const defaultTargetPath = `${payload.targetFolder}/${payload.protocolId}`
    const destinator = targetRootPath ? v => `${targetRootPath}/${v}` : v => `${defaultTargetPath}/${v}`

    payload.protocolTargetFolder = targetRootPath
    payload.doubleDestination = targetRootPath
    // updateDestination(targetPath)
    const localPath = v => `${__dirname}/template/${v}`
    generator.fs.copyTpl(localPath('package.json'), destinator(`package.json`), payload)
    generator.fs.copy(localPath('gitignore'), destinator(`.gitignore`))
    generator.fs.copy(localPath('npmignore'), destinator(`.npmignore`))
    generator.fs.copy(localPath('editorconfig'), destinator(`.editorconfig`,))
    generator.fs.copy(localPath('eslintrc'), destinator(`.eslintrc`,))
    generator.fs.copy(localPath('prettierrc'), destinator(`.prettierrc`,))
    // generator.fs.copy(localPath('yarnrc'), destinator(`.yarnrc`,)
    generator.fs.copy(localPath('eslintignore'), destinator(`.eslintignore`,))
    // generator.fs.copy(localPath('npmrc-pnpm'), destinator(`.npmrc-pnpm`,)
    generator.fs.copy(localPath('releaserc'), destinator(`.releaserc`,))
    generator.fs.copy(localPath('LICENSE'), destinator(`LICENSE`,))
    generator.fs.copy(localPath('jest.config.json'), destinator(`jest.config.json`,))

    // generator.fs.copyTpl(localPath('README.md'), destinator(`README.md`), payload)

    await writeReleaseType(props)
}
