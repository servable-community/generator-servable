/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawEnd from "../../../lib/draw/drawEnd.js"
import targetApp from "../../../prompts/targetApp/index.js"
import askForGeneric from "../../../prompts/utils/askForGeneric.js"

export default {
    id: 'newprotocol',
    path: 'protocol/new',
    aliases: ['protocol'],
    name: 'Protocol → Local > New ✨',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props

        // await askForAppId(props)
        await targetApp(props)

        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'input',
                name: 'protocolId',
                message: 'Unique protocol Id'
            }
        })
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'input',
                name: 'protocolDescription',
                message: 'Description'
            }
        })
    },

    writing: (props) => {
        const { generator, payload } = props
        const targetPath = `${payload.desiredWriteDestinationPathAbsolute}/lib/protocols/${payload.protocolId}`
        generator.destinationRoot(targetPath)

        generator.fs.copy(generator.templatePath('**/*'), generator.destinationPath(''))
        generator.fs.copyTpl(generator.templatePath('manifest.json'), generator.destinationPath(`manifest.json`), payload);
        generator.fs.copyTpl(generator.templatePath('README.md'), generator.destinationPath(`README.md`), payload);
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Protocol created successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
    }
}
