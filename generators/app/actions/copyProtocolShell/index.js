/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


export default async (props) => {

    const { generator, payload, } = props

    payload.protocolDescription = payload.protocolDescription ? payload.protocolDescription : ''
    payload.author = payload.author ? payload.author : ''

    const targetPath = `${payload.targetFolder}/${payload.protocolId}`

    payload.protocolTargetFolder = targetPath
    payload.doubleDestination = targetPath
    // updateDestination(targetPath)

    generator.fs.copyTpl(generator.templatePath('package.json'), `${targetPath}/package.json`, payload)
    generator.fs.copy(generator.templatePath('gitignore'), `${targetPath}/.gitignore`)
    generator.fs.copy(generator.templatePath('npmignore'), `${targetPath}/.npmignore`)
    generator.fs.copy(generator.templatePath('editorconfig'), `${targetPath}/.editorconfig`,)
    generator.fs.copy(generator.templatePath('eslintrc'), `${targetPath}/.eslintrc`,)
    generator.fs.copy(generator.templatePath('prettierrc'), `${targetPath}/.prettierrc`,)
    // generator.fs.copy(generator.templatePath('yarnrc'), `${targetPath}/.yarnrc`,)
    generator.fs.copy(generator.templatePath('eslintignore'), `${targetPath}/.eslintignore`,)
    generator.fs.copy(generator.templatePath('github/workflows/release.yml'), `${targetPath}/.github/workflows/release.yml`,)
    // generator.fs.copy(generator.templatePath('npmrc-pnpm'), `${targetPath}/.npmrc-pnpm`,)
    generator.fs.copy(generator.templatePath('releaserc'), `${targetPath}/.releaserc`,)
    generator.fs.copy(generator.templatePath('LICENSE'), `${targetPath}/LICENSE`,)
    generator.fs.copy(generator.templatePath('jest.config.json'), `${targetPath}/jest.config.json`,)
    generator.fs.copy(generator.templatePath('static/img/icon.png'), `${targetPath}/static/img/icon.png`,)
    generator.fs.copyTpl(generator.templatePath('README.md'), `${targetPath}/README.md`, payload)


}
