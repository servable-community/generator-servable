/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import which from "which"
import askForGeneric from "../../prompts/utils/askForGeneric"

export default async (props) => {
    const { generator, payload, } = props

    if (!generator.options['open'] && !generator.options['quick']) {
        const cdLocation = generator.options['destination'] || payload.appName
        generator.log('To start editing with Visual Studio Code, use the following commands:')
        generator.log('')
        generator.log('     code ' + cdLocation)
        generator.log('')
        return
    }

    const codeStableLocation = await which('code').catch(() => undefined)
    if (!codeStableLocation) {
        return
    }

    const choices = []
    choices.push({
        name: "Open with `code`",
        value: codeStableLocation
    })
    choices.push({
        name: "Skip",
        value: 'skip'
    })
    const answer = await askForGeneric({
        ...props, options: {
            ...props.options,
            type: "list",
            name: "openWith",
            // message: "Do you want to open the new folder with Visual Studio Code?",
            choices
        }
    })

    if (answer && answer.openWith && answer.openWith !== 'skip') {
        generator.log(`Opening ${generator.destinationPath()} in Visual Studio Code...`)
        generator.spawnCommand(answer.openWith, [generator.destinationPath()])
    }
}
