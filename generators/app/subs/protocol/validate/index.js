/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import drawEnd from "../../../lib/draw/drawEnd.js"
import existingProtocol from "../../../prompts/existingProtocol/index.js"
import targetApp from "../../../prompts/targetApp/index.js"
import validateConfig from "../../../actions/validateConfig/index.js"

export default {
    id: 'validateprotocol',
    path: 'protocol/validate',
    aliases: ['validate'],
    name: 'Protocol → Local → Validate (static check) 🚦 [#TODO]',
    version: '0.1.0',
    prompting: async (props) => {
        return
        const { generator, payload } = props
        await targetApp(props)
        await existingProtocol(props)
    },

    writing: async (props) => {
        const { generator, payload } = props
        const targetPath = `${payload.desiredWriteDestinationPathAbsolute}`
        generator.destinationRoot(targetPath)
        const { isValid, message } = await validateConfig(props)
        generator.log(`isValid: ${isValid}, message: ${message}`)
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Config validated successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
    }
}
