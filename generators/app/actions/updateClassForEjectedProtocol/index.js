/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import getClassProtocols from "../../lib/classProtocols/get.js"
import updateClassProtocols from "../../lib/classProtocols/update.js"
import askForTemplateParameter from "../../prompts/utils/askForTemplateParameter.js"
import Bluebird from "bluebird"


export default async (props) => {
    const { generator, payload, } = props

    let existingProtocols = await getClassProtocols(payload.targetClassAbsolute)
    if (!existingProtocols) {
        existingProtocols = []
    }

    const { id, declaration, } = payload.existingProtocol

    let protocol = {
        id,
        metadata: {
            generatorVersion: generator.version,
            updatedAt: (new Date()),
        }
    }

    if (declaration && declaration.template && declaration.template.params) {
        const { params, slug, name, id } = declaration.template
        protocol = {
            ...protocol,
            name,
            id,
            slug,
            params
        }
    }

    let isTemplate = false
    if (declaration && declaration.parameters && declaration.parameters.length) {
        await Bluebird.Promise.mapSeries(
            declaration.parameters,
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
        folder: payload.targetClassAbsolute,
        generator,
        items: existingProtocols,
        isTemplate
    })
}
