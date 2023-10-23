/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import getClassProtocols from "../../lib/classProtocols/get.js"
import updateClassProtocols from "../../lib/classProtocols/update.js"
import askForTemplateParameter from "../../prompts/utils/askForTemplateParameter.js"
import Bluebird from "bluebird"


export default async (props) => {
    const { generator, payload, } = props

    let existingProtocols = await getClassProtocols(payload.targetClassPath)
    if (!existingProtocols) {
        existingProtocols = []
    }

    const { id, packages, } = payload.existingProtocol
    const mainPackage = packages.filter(a => a.type === "main")[0]
    const { usage } = mainPackage

    let protocol = {
        id,
        metadata: {
            generatorVersion: generator.version,
            updatedAt: (new Date()),
        }
    }

    if (usage && usage.template && usage.template.params) {
        const { params, slug, name, id } = usage.template
        protocol = {
            ...protocol,
            name,
            id,
            slug,
            params
        }
    }

    let isTemplate = false
    if (usage && usage.parameters && usage.parameters.length) {
        await Bluebird.Promise.mapSeries(
            usage.parameters,
            async parameter => askForTemplateParameter({
                ...props,
                parameter,
                protocol: payload.existingProtocol
            }))

        isTemplate = true
    }

    existingProtocols.push(protocol)

    await updateClassProtocols({
        ...props,
        folder: payload.targetClassPath,
        generator,
        items: existingProtocols,
        isTemplate
    })
}
