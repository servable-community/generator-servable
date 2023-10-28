/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolManifestAsk from "../../../../fractions/protocol/manifest/ask/index.js"
import protocolManifestWrite from "../../../../fractions/protocol/manifest/write/index.js"
import drawEnd from "../../../../lib/draw/drawEnd.js"


import targetApp from "../../../../prompts/targetApp/index.js"

export default {
    id: 'newlocalprotocol',
    path: 'protocol/local/new',
    aliases: ['protocol'],
    name: 'Protocol → Local → New ✨',
    version: '0.1.0',
    prompting: async (props) => {
        await targetApp(props)
        await protocolManifestAsk(props)
    },

    writing: async (props) => {
        const { generator, payload } = props
        const targetPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/protocols/${payload.protocolId}`
        generator.destinationRoot(targetPath)

        generator.fs.copy(generator.templatePath('**/*'), generator.destinationPath(''))
        // generator.fs.copyTpl(generator.templatePath('manifest.json'), generator.destinationPath(`manifest.json`), payload);
        generator.fs.copyTpl(generator.templatePath('README.md'), generator.destinationPath(`README.md`), payload);
        await protocolManifestWrite(props)

    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Protocol created successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
        // await openProject(props)
    }
}
