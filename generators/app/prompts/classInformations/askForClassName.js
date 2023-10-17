/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import path from "path"
import chalk from "chalk"
import capitalizeFirstLetter from "../../lib/capitalizeFirstLetter.js"

export default async (props) => {
    const { generator, payload, classes = [] } = props
    let value = generator.options['className']
    if (value) {
        payload.className = value
        return
    }
    const nameFromFolder = generator.options['destination'] ? path.basename(generator.destinationPath()) : ''
    if (generator.options['quick'] && nameFromFolder) {
        payload.className = nameFromFolder
        return
    }

    value = (await generator.prompt({
        type: 'input',
        name: 'className',
        message: 'What\'s the class name?',
        default: nameFromFolder,
        validate: (name,) => {
            const classNames = classes.map(c => c.className.toLowerCase())
            if (classNames.includes(name.toLowerCase())) {
                generator.log(chalk.red(chalk.italic(`\n${name} class is already present.`)))
                return false
            }
            return true
        },
        transformer: (name,) => {
            if (!name) {
                return name
            }

            return capitalizeFirstLetter(name)
        }
    })).className

    payload.className = capitalizeFirstLetter(value)
    payload.classDescription = ''
}
