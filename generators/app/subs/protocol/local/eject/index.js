/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForFolder from "../../../../prompts/askForFolder/index.js"
import targetProtocol from "../../../../prompts/targetProtocol/index.js"
import updatePackageForEjectedProtocol from "../../../../actions/updatePackageForEjectedProtocol/index.js"
import removeEjectedProtocol from "../../../../actions/removeEjectedProtocol/index.js"
import bootGit from "../../../../actions/bootGit/index.js"
import drawEnd from "../../../../lib/draw/drawEnd.js"
import askForGit from "../../../../prompts/transverse/askForGit.js"
import askForPackageManager from "../../../../prompts/packageManager/index.js"
import bootPackageManager from "../../../../actions/bootPackageManager/index.js"
import openProject from "../../../../actions/openProject/index.js"
import askForGithubRepository from "../../../../prompts/transverse/askForGithubRepository.js"
import askForProtocolShell from "../../../../fractions/protocol/shell/ask/index.js"
import writeProtocolShell from "../../../../fractions/protocol/shell/write/index.js"
import askForProtocolIndex from "../../../../fractions/protocol/content/index/ask/index.js"
import writeProtocolIndex from "../../../../fractions/protocol/content/index/write/index.js"
// import checkFileExists from "../../../../lib/checkFileExists.js"

export default {
    id: 'ejectprotocol',
    path: 'protocol/local/eject',
    aliases: ['ejectprotocol',],
    name: 'Protocol → Local → Eject ↳',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props

        const hasProtocol = await targetProtocol({ ...props, includeAppProtocol: false })
        if (!hasProtocol) {
            generator.abort = true
            return
        }
        payload.protocolId = payload.targetProtocol

        await askForProtocolIndex(props)
        await askForGithubRepository(props)
        await askForFolder(props)
        await askForPackageManager(props)
        await askForProtocolShell(props)
        await askForGit(props)
    },
    writing: async (props) => {
        const { generator, payload, } = props
        const sourcePath = payload.targetProtocolPath
        const targetPath = `${payload.targetFolder}/${payload.protocolId}`
        const targetPathSrc = `${targetPath}/src`
        generator.destinationRoot(targetPath)

        await writeProtocolShell(props)
        await writeProtocolIndex({ ...props, targetRootPath: `${targetPath}/src` })


        generator.fs.copy(sourcePath, targetPathSrc)

        // if (await checkFileExists(`${sourcePath}/.yo-rc.json`)) {
        //     generator.fs.copy(`${sourcePath}/.yo-rc.json`, `${targetPath} /.yo-rc.json`,)
        // }

        await updatePackageForEjectedProtocol(props)
        await removeEjectedProtocol(props)

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
            title: "Protocol ejected successfully",
            subTitle: `The servable app has been updated to use the updated package. You can find the ejected package here: ${targetPath}`
        })

        await openProject(props)
    }
}
