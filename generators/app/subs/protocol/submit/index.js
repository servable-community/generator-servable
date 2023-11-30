/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import submitProtocol from "../../../actions/submitProtocol/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import targetProtocol from "../../../prompts/targetProtocol/index.noapp.js"
import askForGenericBulk from "../../../prompts/utils/askForGenericBulk.js"

export default {
    id: 'submitprotocol',
    path: 'protocol/submit',
    aliases: ['submitprotocol'],
    name: 'Protocol → Community → Submit ↑',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props
        await targetProtocol(props)
        await askForGenericBulk({
            ...props, items: [
                {
                    name: 'registryUsername',
                },
                {
                    name: 'registryPassword',
                    type: 'password'
                },
            ]
        })

    },
    writing: async (props) => {
        const { generator, payload } = props

        const path = payload.targetProtocolPath
        generator.log("targetProtocolPath", path)

        await submitProtocol({
            path,
            generator,
            payload
        })
        return
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Protocol submitted successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
    }
}
