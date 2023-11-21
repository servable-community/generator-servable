/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import bootGit from "../../../actions/bootGit/index.js"
import bootPackageManager from "../../../actions/bootPackageManager/index.js"
import askForProtocolShell from "../../../fractions/protocol/shell/ask/index.js"
import writeProtocolShell from "../../../fractions/protocol/shell/write/index.js"
import openProject from "../../../actions/openProject/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import askForFolder from "../../../prompts/askForFolder/index.js"
import askForPackageManager from "../../../prompts/packageManager/index.js"
import askForGit from "../../../prompts/transverse/askForGit.js"
import askForGithubRepository from "../../../prompts/transverse/askForGithubRepository.js"
import askForLicense from "../../../prompts/license/index.js"
import askForProtocolManifest from "../../../fractions/protocol/manifest/ask/index.js"
import writeProtocolManifest from "../../../fractions/protocol/manifest/write/index.js"

export default {
    id: 'newprotocol',
    path: 'protocol/new',
    aliases: ['protocol'],
    name: 'Protocol → New standalone project 🚀',
    version: '0.1.0',
    prompting: async (props) => {
        await askForProtocolManifest(props)
        await askForProtocolShell(props)
        await askForFolder(props)
        await askForGithubRepository(props)
        await askForLicense(props)
        await askForPackageManager(props)
        await askForGit(props)
    },
    writing: async (props) => {
        const { generator, payload, } = props
        const targetPath = `${payload.targetFolder}/${payload.protocolId}`
        generator.destinationRoot(targetPath)

        await writeProtocolShell(props)
        generator.fs.copy(generator.templatePath('src/**/*'), `${targetPath}/src`)
        await writeProtocolManifest({ ...props, targetRootPath: `${targetPath}/src` })

        generator.fs.copyTpl(generator.templatePath('src/README.md'), `${targetPath}/src/README.md`, payload)

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
            subTitle: `For more information, also visit https://servablecommunity.com and follow us @servablecom.`
        })
        await openProject(props)
    }
}
