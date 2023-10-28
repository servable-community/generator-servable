/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
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
import protocolsInFolder from "./lib/protocolsInFolder.js"

export default async (props) => {
    const { generator, payload,
        includeAppProtocol = true,
        appProtocolMessage = `Use app protocol?`
    } = props

    let value = generator.options['targetProtocol']
    if (value) {
        payload.targetProtocol = value
        payload.targetProtocolPath = null
        return true
    }

    if (generator.options['quick']) {
        return true
    }

    const originalDestinationPath = generator.originalDestinationPath

    if (await isFolderProtocol(originalDestinationPath)) {
        payload.targetProtocolPath = originalDestinationPath
        payload.targetProtocol = payload.targetProtocolPath.split(path.sep).pop()

        // const config = await getServablePackage(originalDestinationPath)
        // payload.desiredWriteDestinationPath = ''
        generator.log(chalk.italic(`→ The class will be added to the protocol in the current folder.\n`))
        return true
    }

    await targetApp(props)

    drawSectionHeader({
        generator,
        title: `Protocol choice 🚀`,
        subTitle: `Choose a protocol`
    })

    if (includeAppProtocol) {
        await askForGeneric({
            ...props, options: {
                ...(props.options ? props.options : {}),
                type: 'confirm',
                name: 'useAppProtocol',
                message: appProtocolMessage,
                // message: `Add class to ${payload.targetApp} app protocol?`,
                defaultValue: true
            }
        })

        if (payload.useAppProtocol) {
            payload.targetProtocolPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/app`
            payload.targetProtocol = payload.targetProtocolPath.split(path.sep).pop()
            return true
        }

    }

    const root = `${payload.desiredWriteDestinationPathAbsolute}/lib/protocols`
    const items = await protocolsInFolder(root)
    if (!items || !items.length) {
        generator.log('No protocols found in this app')
        return false
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "file-tree-selection",
            name: "targetProtocolPath",
            // message: "Choose a local protocol",
            onlyShowDir: true,
            root,
            onlyShowValid: true,
            hideRoot: true,
            validate: (name,) => {
                if (!name || !name.length) {
                    return false
                }
                // return true
                return isFolderProtocolSync(name)
            },
        }
    })

    payload.targetProtocol = payload.targetProtocolPath.split(path.sep).pop()
    payload.protocolName = capitalizeFirstLetter(payload.targetProtocol)
    return true
}
