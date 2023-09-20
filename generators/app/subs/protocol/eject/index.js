/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import askForFolder from "../../../prompts/targetFolder/index.js"
import targetProtocol from "../../../prompts/targetProtocol/index.js"
import updatePackageForEjectedProtocol from "../../../actions/updatePackageForEjectedProtocol/index.js"
import removeEjectedProtocol from "../../../actions/removeEjectedProtocol/index.js"
import checkFileExists from "../../../lib/checkFileExists.js"
import bootGit from "../../../actions/bootGit/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"

export default {
    id: 'ejectprotocol',
    path: 'protocol/eject',
    aliases: ['ejectprotocol',],
    name: 'Eject a protocol ⏏️',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props

        await targetProtocol({ ...props, includeAppProtocol: false })
        await askForFolder(props)
        // await packageManager(props)
        // await askForGit(props)
    },
    writing: async (props) => {
        const { generator, payload, updateDestination, updateSource } = props
        const sourcePath = payload.targetProtocolAbsolute
        payload.protocolId = payload.targetProtocol
        payload.protocolDescription = ''
        payload.repositoryUrl = ''
        payload.author = ''

        const targetPath = `${payload.targetFolder}/${payload.protocolId}`
        const targetPathSrc = `${targetPath}/src`
        payload.protocolTargetFolder = targetPath
        payload.doubleDestination = targetPath
        // updateDestination(targetPath)

        generator.fs.copyTpl(generator.templatePath('package.json'), `${targetPath}/package.json`, payload)
        generator.fs.copy(generator.templatePath('gitignore'), `${targetPath}/.gitignore`)
        generator.fs.copy(generator.templatePath('editorconfig'), `${targetPath}/.editorconfig`,)
        generator.fs.copy(generator.templatePath('eslintrc'), `${targetPath}/.eslintrc`,)
        generator.fs.copy(generator.templatePath('prettierrc'), `${targetPath}/.prettierrc`,)
        generator.fs.copy(generator.templatePath('yarnrc'), `${targetPath}/.yarnrc`,)
        generator.fs.copy(generator.templatePath('eslintignore'), `${targetPath}/.eslintignore`,)
        generator.fs.copy(generator.templatePath('npmrc-pnpm'), `${targetPath}/.npmrc-pnpm`,)



        generator.fs.copy(sourcePath, targetPathSrc)
        if (await checkFileExists(`${sourcePath}/.yo-rc.json`)) {
            generator.fs.copy(`${sourcePath}/.yo-rc.json`, `${targetPath} /.prettierrc`,)
        }
        // generator.fs.copyTpl(generator.templatePath('package.json'), generator.destinationPath(`package.json`), payload)
        // generator.fs.copy(generator.templatePath('.gitignore'), generator.destinationPath(`.gitignore`))
        // generator.fs.copy(generator.templatePath('.editorconfig'), generator.destinationPath(`.editorconfig`),)
        // generator.fs.copy(generator.templatePath('.eslintrc'), generator.destinationPath(`.eslintrc`),)
        // generator.fs.copy(generator.templatePath('.prettierrc'), generator.destinationPath(`.prettierrc`),)

        await updatePackageForEjectedProtocol(props)
        await removeEjectedProtocol(props)

        // await bootPackageManager({
        //     ...props,
        //     installDependencies: false,
        //     targetPathFinder: v => `${targetPath} / ${v}`
        // })
    },
    end: async (props) => {
        const { generator, payload } = props
        const targetPath = `${payload.targetFolder}/${payload.protocolId}`

        await bootGit({ ...props, location: targetPath })
        drawEnd({
            generator,
            title: "Protocol ejected successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez - vous.Paul Éluard`
        })

        // await openProject(props)
    }
}
