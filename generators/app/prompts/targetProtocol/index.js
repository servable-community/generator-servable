/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import chalk from "chalk"
import isFolderProtocol from "./lib/isFolderProtocol.js"
// import getServablePackage from "./lib/getServablePackage.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import isFolderProtocolSync from "./lib/isFolderProtocolSync.js"
import askForGeneric from "../utils/askForGeneric.js"
import updateTargetProtocolFromPath from "./updateTargetProtocolFromPath.js"
import path from "path"

export default async (props) => {
    const { generator, payload,
    } = props

    if (generator.options['targetProtocolPath']) {
        updateTargetProtocolFromPath({ payload, path: generator.options['targetProtocolPath'] })
        return true
    }

    if (generator.options['quick']) {
        // return true
    }

    const originalDestinationPath = generator.originalDestinationPath

    if (await isFolderProtocol(originalDestinationPath)) {
        updateTargetProtocolFromPath({ payload, path: originalDestinationPath })
        generator.log(chalk.italic(`→ The target protocol is the current folder.\n`))
        return true
    }

    drawSectionHeader({
        generator,
        title: `Protocol choice 🐝`,
        subTitle: `Choose a protocol`
    })

    const root = `${originalDestinationPath}`

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "file-tree-selection",
            name: "targetProtocolPath",
            // message: "Choose a local protocol",
            onlyShowDir: true,
            root,
            onlyShowValid: false,
            // hideRoot: true,
            enableGoUpperDirectory: true,
            hideRoot: false,
            hideChildrenOfValid: true,
            validate: (name,) => {
                if (!name || !name.length) {
                    return false
                }
                // return true
                return isFolderProtocolSync(name)
            },
            transformer: (name,) => {
                if (!name || !name.length) {
                    return name
                }

                const _name = name.split(path.sep).pop()
                const isServable = isFolderProtocolSync(name)
                return isServable ? `${chalk.underline(_name)} 🐝 ` : `${_name}`
            }
        }
    })

    updateTargetProtocolFromPath({ payload, path: payload.targetProtocolPath })
    return true
}
