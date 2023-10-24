/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"

export default async (props) => {

    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    payload.protocolDescription = payload.protocolDescription ? payload.protocolDescription : ''
    payload.author = payload.author ? payload.author : ''

    const defaultTargetPath = `${payload.targetFolder}/${payload.protocolId}`
    const targetPather = targetRootPath ? v => `${targetRootPath}/${v}` : v => `${defaultTargetPath}/${v}`

    payload.protocolTargetFolder = targetRootPath
    payload.doubleDestination = targetRootPath
    // updateDestination(targetPath)
    const localPath = v => `${__dirname}/template/${v}`
    generator.fs.copyTpl(localPath('package.json'), targetPather(`package.json`), payload)
    generator.fs.copy(localPath('gitignore'), targetPather(`.gitignore`))
    generator.fs.copy(localPath('npmignore'), targetPather(`.npmignore`))
    generator.fs.copy(localPath('editorconfig'), targetPather(`.editorconfig`,))
    generator.fs.copy(localPath('eslintrc'), targetPather(`.eslintrc`,))
    generator.fs.copy(localPath('prettierrc'), targetPather(`.prettierrc`,))
    // generator.fs.copy(localPath('yarnrc'), targetPather(`.yarnrc`,)
    generator.fs.copy(localPath('eslintignore'), targetPather(`.eslintignore`,))
    generator.fs.copy(localPath('github/workflows/release.yml'), targetPather(`.github/workflows/release.yml`,))
    // generator.fs.copy(localPath('npmrc-pnpm'), targetPather(`.npmrc-pnpm`,)
    generator.fs.copy(localPath('releaserc'), targetPather(`.releaserc`,))
    generator.fs.copy(localPath('LICENSE'), targetPather(`LICENSE`,))
    generator.fs.copy(localPath('jest.config.json'), targetPather(`jest.config.json`,))
    generator.fs.copy(localPath('static/img/icon.png'), targetPather(`static/img/icon.png`,))
    generator.fs.copyTpl(localPath('README.md'), targetPather(`README.md`), payload)
}
