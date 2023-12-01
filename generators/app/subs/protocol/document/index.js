/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawEnd from "../../../lib/draw/drawEnd.js"
import targetProtocol from "../../../prompts/targetProtocol/index.js"
import { documentProtocol } from 'servable-engine'

export default {
    id: 'protocoldocument',
    path: 'protocol/document',
    aliases: ['documentprotocol',],
    name: 'Protocol 🐝 → Local → Generate documentation 📚',
    prompting: async (props) => {
        const { generator, payload } = props
        await targetProtocol(props)

    },
    writing: async (props) => {
        const { generator, payload } = props
        const path = payload.targetProtocolPath
        generator.log("targetProtocolPath", path)
        await documentProtocol({
            path,
            write: true
        })
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Protocol documented",
            subTitle: `The documentation can be found in ${payload.targetProtocolPath}/documentation/generated`
        })
    }
}
