/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import which from "which"

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

    const [codeStableLocation] = await Promise.all([which('code').catch(() => undefined), which('code-insiders').catch(() => undefined)])

    const choices = []
    choices.push({
        name: "Open with `code`",
        value: codeStableLocation
    })
    choices.push({
        name: "Skip",
        value: 'skip'
    })
    const answer = await generator.prompt({
        type: "list",
        name: "openWith",
        message: "Do you want to open the new folder with Visual Studio Code?",
        choices
    })

    if (answer && answer.openWith && answer.openWith !== 'skip') {
        generator.log(`Opening ${generator.destinationPath()} in Visual Studio Code...`)
        generator.spawnCommand(answer.openWith, [generator.destinationPath()])
    }
}
