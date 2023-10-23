/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import updateClassForEjectedProtocol from "../../../actions/updateClassForEjectedProtocol/index.js"
import updatePackageForAddedProtocol from "../../../actions/updatePackageForAddedProtocol/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import getCommunityProtocol from "../../../prompts/getCommunityProtocol/index.js"
import targetClass from "../../../prompts/targetClass/index.js"

export default {
    id: 'addprotocol',
    path: 'protocol/add',
    aliases: ['protocol'],
    name: 'Protocol → Community → Import ↓',
    version: '0.1.0',
    prompting: async (props) => {
        await targetClass(props)
        await getCommunityProtocol(props)
    },

    writing: async (props) => {
        const { generator, payload } = props
        const targetPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/protocols/${payload.protocolId}`
        generator.destinationRoot(targetPath)

        await updatePackageForAddedProtocol(props)
        await updateClassForEjectedProtocol(props)
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Protocol added successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
    }
}
