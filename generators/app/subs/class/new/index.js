/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askClassContent from "../../../fractions/class/content/generic/ask/index.js"
import writeClassContent from "../../../fractions/class/content/generic/write/index.withprotocol.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import targetProtocol from "../../../prompts/targetProtocol/index.js"

export default {
    id: 'class',
    path: 'class/new',
    aliases: ['class',],
    name: 'Class 🌸 → Local → New ✨',
    prompting: async (props) => {
        const { generator, payload } = props
        await targetProtocol(props)
        await askClassContent(props)
    },
    writing: async (props) => {
        const { generator, payload } = props
        await writeClassContent({
            ...props,
            targetProtocolPath: payload.targetProtocolPath,
            className: payload.className,
            upgradeProtocolSchemaVersion: true
        })
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Class created",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
    }
}
