/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import gitClone from "../../../../actions/gitClone/index.js"
import drawEnd from "../../../../lib/draw/drawEnd.js"
import existingProtocol from "../../../../prompts/getCommunityProtocol/index.js"
import targetApp from "../../../../prompts/targetApp/index.js"
import updateDependenciesForForkedProtocol from "./actions/updateDependenciesForForkedProtocol/index.js"
import updateIndexForForkedProtocol from "./actions/updateIndexForForkedProtocol/index.js"

export default {
    id: 'injectprotocol',
    path: 'protocol/local/inject',
    aliases: ['protocol'],
    name: 'Protocol 🐝 → Local → Inject ↲',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props
        await targetApp(props)
        await existingProtocol(props)
    },

    writing: async (props) => {
        const { generator, payload } = props

        const { existingProtocol } = payload
        const targetPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/protocols/${existingProtocol.id}`
        generator.destinationRoot(targetPath)
        const location = targetPath
        const _package = existingProtocol.packages.filter(a => a.type === 'main')[0]
        const { url } = _package
        //const url = 'https://github.com/parse-community/parse-server'
        const { originPackageJSON } = await gitClone({
            ...props,
            location,
            url
        })

        await updateIndexForForkedProtocol({
            ...props,
            targetPath,
            origin: existingProtocol,
            originPackageJSON
        })
        await updateDependenciesForForkedProtocol({
            ...props,
            protocolTargetPath: targetPath,
            appPath: payload.desiredWriteDestinationPathAbsolute,
            originPackageJSON
        })
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
