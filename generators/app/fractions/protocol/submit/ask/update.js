/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolIndex from "../../../../lib/protocolIndex.js"
import uniqueRefExists from '../lib/uniqueRefExists/get.js'
import askRegistryLogin from '../../../shared/registry/login/ask/index.js'


export default async (props) => {
    const { generator, payload } = props
    payload.registrySubmitMode = 'update'

    const index = await protocolIndex(payload.targetProtocolPath)
    if (!index || !index.registry || !index.registry.id) {
        return true
    }

    payload.registryUniqueRef = index.registry.id

    const exists = await uniqueRefExists({ protocolId: payload.registryUniqueRef })
    if (!exists) {
        generator.log(`The protocol with the id ${index.id} has already been submitted but can't be found. Please retry later.`)
        return false
    }

    return askRegistryLogin({ ...props, initiate: true })
}
