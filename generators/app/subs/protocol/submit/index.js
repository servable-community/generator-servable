/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawEnd from "../../../lib/draw/drawEnd.js"
import targetProtocol from "../../../prompts/targetProtocol/index.js"
import askForSubmitProtocol from "../../../fractions/protocol/submit/ask/index.js"
import writeForSubmitProtocol from "../../../fractions/protocol/submit/write/index.js"

export default {
    id: 'submitprotocol',
    path: 'protocol/submit',
    aliases: ['submitprotocol'],
    name: 'Protocol 🐝 → Community → Submit (create or update) ↑',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props
        await targetProtocol(props)
        const shouldWrite = await askForSubmitProtocol(props)
        if (!shouldWrite) {
            generator.abort = true
        }
    },
    writing: async (props) => {
        const { generator, payload } = props

        const path = payload.targetProtocolPath

        await writeForSubmitProtocol({
            targetRootPath: path,
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
