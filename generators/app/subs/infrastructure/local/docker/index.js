/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
import projectUpdated from "../../../../actions/projectUpdated/index.js"
import bootInfra from "../../../../actions/bootInfra/index.js"
import askForLocalInfraDocker from "../../../../prompts/localInfraDocker/index.js"

export default {
    id: 'infrastructure-local-docker',
    path: 'infrastructure/local/docker',
    aliases: ['docker', 'infrastructure', 'local'],
    name: 'Bootstrap a local infrastructure 🐰',
    version: '0.1.0',
    prompting: async (props) => {
        const { generator, payload } = props

        await askForLocalInfraDocker({ ...props, options: { force: true } })
    },

    writing: async (props) => {
        await bootInfra({ ...props, options: { force: true } })
    },

    end: async (props) => {
        const { generator, payload } = props

        if (generator.update) {
            await projectUpdated(props)
            return
        }


        // await openProject(props)
    }
}
