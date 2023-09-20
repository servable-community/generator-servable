/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
import chalk from "chalk"
import isFolderServableApp from "./lib/isFolderServableApp.js"
import isFolderServableAppSync from "./lib/isFolderServableAppSync.js"
import getServablePackage from "./lib/getServablePackage.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import path from "path"

export default async (props) => {
    const { generator, payload, } = props

    let value = generator.options['targetApp']
    if (value) {
        payload.targetApp = value
        return
    }

    // payload.targetApp = 'standalone'

    if (generator.options['quick']) {
        return
    }

    const originalDestinationPath = generator.originalDestinationPath

    if (await isFolderServableApp(originalDestinationPath)) {
        const config = await getServablePackage(originalDestinationPath)
        payload.desiredWriteDestinationPathAbsolute = originalDestinationPath
        payload.desiredWriteDestinationPath = payload.desiredWriteDestinationPathAbsolute.split(path.sep).pop()

        generator.log(chalk.italic(`→ No app choice required. The protocol will be added servable app in the current folder (${payload.appName}).\n`))
        return
    }

    drawSectionHeader({
        generator,
        title: `APP CHOICE 🚀`,
        subTitle: `Choose the app you want to add a protocol to.`
    })

    const res = (await generator.prompt({
        type: "file-tree-selection",
        name: "target",
        message: "Choose a servable app",
        onlyShowDir: true,
        root: originalDestinationPath,
        onlyShowValid: true,
        hideRoot: true,
        // onlyShowValid: true,
        // validate: name => {
        //     return (name && name.length && !['.'].includes(name[0]))
        // }
        validate: (name,) => {
            if (!name || !name.length) {
                return false
            }
            // return name[0] === '.'

            // generator.log(name)
            const isServable = isFolderServableAppSync(name)
            // generator.log(name)
            return isServable

            const _name = name.split(path.sep).pop()
            const exclusions = ['node_modules', '.git', '.github', '.vscode', '__tests__']
            if (exclusions.includes(_name.toLowerCase())) {
                return false
            }

            return (_name && _name.length && !['.'].includes(_name[0]))
        },
        transformer: (name,) => {
            if (!name || !name.length) {
                return name
            }

            const _name = name.split(path.sep).pop()
            //const isServable = (_name && _name.length && !['.'].includes(_name[0]))
            const isServable = isFolderServableAppSync(name)
            return isServable ? `${_name} (Servable project) ` : `${_name} ('N/A')`
        }
    })).target

    payload.desiredWriteDestinationPathAbsolute = res
    payload.desiredWriteDestinationPath = payload.desiredWriteDestinationPathAbsolute.split(path.sep).pop()

}
