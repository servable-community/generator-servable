/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForFolder from "../../../prompts/targetFolder/index.js"
import targetProtocol from "../../../prompts/targetProtocol/index.js"
import updatePackageForEjectedProtocol from "../../../actions/updatePackageForEjectedProtocol/index.js"
import removeEjectedProtocol from "../../../actions/removeEjectedProtocol/index.js"
import bootGit from "../../../actions/bootGit/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import askForGeneric from "../../../prompts/utils/askForGeneric.js"
import askForGit from "../../../prompts/transverse/askForGit.js"
import askForPackageManager from "../../../prompts/packageManager/index.js"
import bootPackageManager from "../../../actions/bootPackageManager/index.js"
import openProject from "../../../actions/openProject/index.js"
import copyProtocolShell from "../../../actions/copyProtocolShell/index.js"

export default {
    id: 'ejectprotocol',
    path: 'protocol/eject',
    aliases: ['ejectprotocol',],
    name: 'Protocol → Local → Eject ↳',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props

        await targetProtocol({ ...props, includeAppProtocol: false })
        await askForGeneric({
            ...props, options: {
                ...props.options,
                name: 'githubUsername',
            }
        })
        payload.protocolId = payload.targetProtocol
        payload.completedProtocolId = payload.protocolId.indexOf('servable-') === 0 ? `${payload.protocolId}` : `servable-${payload.protocolId}`
        payload.repositoryUrl = `https://github.com/${payload.githubUsername}/${payload.completedProtocolId}`

        await askForFolder(props)
        await askForPackageManager(props)
        await askForGit(props)
    },
    writing: async (props) => {
        const { generator, payload, } = props
        const sourcePath = payload.targetProtocolAbsolute
        const targetPath = `${payload.targetFolder}/${payload.protocolId}`
        const targetPathSrc = `${targetPath}/src`

        await copyProtocolShell(props)

        generator.fs.copy(sourcePath, targetPathSrc)

        // generator.fs.copyTpl(generator.templatePath('package.json'), generator.destinationPath(`package.json`), payload)
        // generator.fs.copy(generator.templatePath('.gitignore'), generator.destinationPath(`.gitignore`))
        // generator.fs.copy(generator.templatePath('.editorconfig'), generator.destinationPath(`.editorconfig`),)
        // generator.fs.copy(generator.templatePath('.eslintrc'), generator.destinationPath(`.eslintrc`),)
        // generator.fs.copy(generator.templatePath('.prettierrc'), generator.destinationPath(`.prettierrc`),)

        await updatePackageForEjectedProtocol(props)
        await removeEjectedProtocol(props)

        await bootGit(props)


        await bootPackageManager({
            ...props,
            installDependencies: false,
            targetPathFinder: v => `${targetPath}/${v}`
        })
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

        await openProject(props)
    }
}
