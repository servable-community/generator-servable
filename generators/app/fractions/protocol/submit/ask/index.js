/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolIndex from "../../../../lib/protocolIndex.js"
import askForGeneric from "../../../../prompts/utils/askForGeneric.js"
import create from "./create.js"
import update from './update.js'

export default async (props) => {
    const { generator, payload } = props

    const index = await protocolIndex(payload.targetProtocolPath)
    if (!index || !index.registry || !index.registry.id) {
        return create(props)
    }

    generator.log(`Your protocol ${index.id} has already been submitted as ${index.registry.id}`)
    if ((await askForGeneric({
        ...props, options: {
            ...props.options,
            type: 'confirm',
            name: 'registryUpdate',
        }
    }))) {
        return update(props)
    }

    return false
}



