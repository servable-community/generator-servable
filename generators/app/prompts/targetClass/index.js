/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import chalk from "chalk"
import isFolderClass from "./lib/isFolderClass.js"
// import getServablePackage from "./lib/getServablePackage.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import path from "path"
import targetProtocol from "../targetProtocol/index.js"
import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { generator, payload,
        includeCoreClasses = true,
        appProtocolMessage = `Add class to app protocol?`,
        includeProtocolAsAClass = false,
        forProtocols = 'Do you want to target protocols or classes'
    } = props

    let value = generator.options['targetClass']
    if (value) {
        payload.targetClass = value
        payload.targetClassPath = null
        return
    }

    if (generator.options['quick']) {
        return
    }

    const originalDestinationPath = generator.originalDestinationPath

    if (await isFolderClass(originalDestinationPath)) {
        payload.targetClassPath = originalDestinationPath
        payload.targetClass = payload.targetClassPath.split(path.sep).pop()

        // const config = await getServablePackage(originalDestinationPath)
        // payload.desiredWriteDestinationPath = ''
        generator.log(chalk.italic(`→ The class will be added to the protocol in the current folder.\n`))
        return
    }

    if (includeProtocolAsAClass) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'forProtocols',
                message: forProtocols,
                // message: `Add class to ${payload.targetApp} app protocol?`,
                defaultValue: true
            }
        })

        if (payload.forProtocols) {
            payload.targetClassPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/app`
            payload.targetClass = payload.targetProtocolPath.split(path.sep).pop()
            return
        }
    }

    await targetProtocol(props)
    drawSectionHeader({
        generator,
        title: `Class choice 🚀`,
        subTitle: `Choose the class.`
    })

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "file-tree-selection",
            name: "targetClassPath",
            message: "Choose the class to add a protocol to",
            onlyShowDir: true,
            root: `${payload.targetProtocolPath}/classes`,
            onlyShowValid: true,
            hideRoot: true,
            // validate: (name,) => {
            //     if (!name || !name.length) {
            //         return false
            //     }
            //     // return true
            //     return isFolderClassSync(name)
            // },
        }
    })

    // const folderPath = path.resolve(generator.destinationPath(), destination)
    // this.destinationRoot(folderPath)

    payload.targetClass = payload.targetProtocolPath.split(path.sep).pop()
}
