/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import generateSchema from "../../../actions/generateSchema/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import targetApp from "../../../prompts/targetApp/index.js"

export default {
    id: 'printschema',
    path: 'schema/print',
    aliases: ['schema'],
    name: 'App → Print schema 👀',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props
        await targetApp(props)
    },

    writing: async (props) => {
        const { generator, payload } = props
        const targetPath = `${payload.desiredWriteDestinationPathAbsolute}`
        generator.destinationRoot(targetPath)
        const schema = await generateSchema(props)
        generator.log(schema)
    },
    end: async (props) => {
        const { generator, payload } = props

        drawEnd({
            generator,
            title: "Schema generated successfully",
            subTitle: `Il n'y a pas de hasard. Il n'y a que des rendez-vous. Paul Éluard`
        })
    }
}
