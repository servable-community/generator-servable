/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
import chalk from "chalk"
import isFolderProtocol from "./lib/isFolderProtocol.js"
// import getServablePackage from "./lib/getServablePackage.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import targetApp from "../targetApp/index.js"
import path from "path"
import isFolderProtocolSync from "./lib/isFolderProtocolSync.js"
import askForGeneric from "../utils/askForGeneric.js"
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter.js"

export default async (props) => {
    const { generator, payload,
        includeAppProtocol = true,
        appProtocolMessage = `Use app protocol?`
    } = props

    let value = generator.options['targetProtocol']
    if (value) {
        payload.targetProtocol = value
        payload.targetProtocolAbsolute = null
        return
    }

    if (generator.options['quick']) {
        return
    }

    const originalDestinationPath = generator.originalDestinationPath

    if (await isFolderProtocol(originalDestinationPath)) {
        payload.targetProtocolAbsolute = originalDestinationPath
        payload.targetProtocol = payload.targetProtocolAbsolute.split(path.sep).pop()

        // const config = await getServablePackage(originalDestinationPath)
        // payload.desiredWriteDestinationPath = ''
        generator.log(chalk.italic(`→ The class will be added to the protocol in the current folder.\n`))
        return
    }

    await targetApp(props)

    drawSectionHeader({
        generator,
        title: `PROTOCOL CHOICE 🚀`,
        subTitle: `Choose a protocol`
    })

    if (includeAppProtocol) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'useAppProtocol',
                message: appProtocolMessage,
                // message: `Add class to ${payload.targetApp} app protocol?`,
                defaultValue: true
            }
        })

        if (payload.useAppProtocol) {
            payload.targetProtocolAbsolute = `${payload.desiredWriteDestinationPathAbsolute}/lib/app`
            payload.targetProtocol = payload.targetProtocolAbsolute.split(path.sep).pop()
            return
        }

    }

    const res = (await generator.prompt({
        type: "file-tree-selection",
        name: "target",
        message: "Choose a local protocol",
        onlyShowDir: true,
        root: `${payload.desiredWriteDestinationPathAbsolute}/lib/protocols`,
        onlyShowValid: true,
        hideRoot: true,
        validate: (name,) => {
            if (!name || !name.length) {
                return false
            }
            // return true
            return isFolderProtocolSync(name)
        },
    })).target

    // const folderPath = path.resolve(generator.destinationPath(), destination)
    // this.destinationRoot(folderPath)
    payload.targetProtocolAbsolute = res
    payload.targetProtocol = payload.targetProtocolAbsolute.split(path.sep).pop()
    payload.protocolName = capitalizeFirstLetter(payload.targetProtocol)
}
