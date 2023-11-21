/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawTitle from "../../lib/draw/drawTitle.js"
// import notify from "./notify.js"

export default async (props) => {
    const { generator, payload, generators } = props

    drawTitle({
        generator,
        title: `WELCOME TO THE SERVABLE GENERATOR 🚀 🐻🚀 🐻🚀 🐻🚀 🐻🚀 🐻`,
        // subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        // subTitle: quote()
    })

    // await notify(props)

    const generatorType = generator.options['generatorType']
    if (generatorType) {
        const _generator = generators.find(g => g.aliases.indexOf(generatorType) !== -1)
        if (_generator) {
            payload.type = _generator.id
        } else {
            generator.log("Invalid extension type: " + generatorType + '\nPossible types are: ' + generators.map(g => g.aliases.join(', ')).join(', '))
            generator.abort = true
        }
    } else {
        const choices = []
        for (const g of generators) {
            // (new inquirer.Separator()),
            const name = g.name
            if (name) {
                choices.push({
                    name,
                    value: g.id
                })
            }
        }
        payload.type = (await generator.prompt({
            type: 'list',
            name: 'type',
            message: 'What do you want to do?',
            pageSize: choices.length,
            choices
        })).type
    }
}
