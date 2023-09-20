/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import gitClone from "../../../actions/gitClone/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import existingProtocol from "../../../prompts/existingProtocol/index.js"
import targetApp from "../../../prompts/targetApp/index.js"
import updateDependenciesForForkedProtocol from "./actions/updateDependenciesForForkedProtocol/index.js"
import updateManifestForForkedProtocol from "./actions/updateManifestForForkedProtocol/index.js"

export default {
    id: 'overrideprotocol',
    path: 'protocol/override',
    aliases: ['override'],
    name: 'Override a community protocol 🚦',
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

        await updateManifestForForkedProtocol({
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
