/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import bootGit from "../../../actions/bootGit/index.js"
import bootPackageManager from "../../../actions/bootPackageManager/index.js"
import copyProtocolShell from "../../../actions/copyProtocolShell/index.js"
import openProject from "../../../actions/openProject/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"

import askForFolder from "../../../prompts/askForFolder/index.js"
import askForPackageManager from "../../../prompts/packageManager/index.js"
import askForGit from "../../../prompts/transverse/askForGit.js"
import askForGithubRepository from "../../../prompts/transverse/askForGithubRepository.js"
import askForLicense from "../../../prompts/license/index.js"
import askForProtocolId from "../../../prompts/transverse/askForProtocolId.js"
import askForGeneric from "../../../prompts/utils/askForGeneric.js"

export default {
    id: 'newprotocol',
    path: 'protocol/new',
    aliases: ['protocol'],
    name: 'Protocol → New 🚀',
    version: '0.1.0',
    prompting: async (props) => {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                name: 'protocolName',
            }
        })

        await askForProtocolId(props)

        await askForGeneric({
            ...props, options: {
                ...props.options,
                name: 'protocolDescription',
            }
        })

        await askForFolder(props)
        await askForGithubRepository(props)
        await askForLicense(props)
        await askForPackageManager(props)
        await askForGit(props)
    },

    writing: async (props) => {
        const { generator, payload, } = props
        // const sourcePath = payload.targetProtocolPath
        const targetPath = `${payload.targetFolder}/${payload.protocolId}`
        // const targetPathSrc = `${targetPath}/src`

        generator.fs.copy(generator.templatePath('src/**/*'), `${targetPath}/src`)
        await copyProtocolShell(props)

        // generator.fs.copy(sourcePath, targetPathSrc)
        generator.fs.copyTpl(generator.templatePath('src/manifest.json'), `${targetPath}/src/manifest.json`, payload);
        generator.fs.copyTpl(generator.templatePath('src/README.md'), `${targetPath}/src/README.md`, payload);

        // await bootGit(props)

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
            title: "Protocol created successfully",
            subTitle: `For more information, also visit https://servablecommunity.com and follow us @servable.`
        })
        await openProject(props)
    }
}
