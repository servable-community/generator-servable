/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolIndex from "../../../../lib/protocolIndex.js"
import uniqueRefExists from '../lib/uniqueRefExists/get.js'
import askRegistryLogin from '../../../shared/registry/login/ask/index.js'

export default async (props) => {
    const { generator, payload } = props
    payload.registrySubmitMode = 'create'
    const index = await protocolIndex(payload.targetProtocolPath)

    const { id } = index

    const exists = await uniqueRefExists({ protocolId: id })
    if (exists) {
        generator.log(`A protocol with the id ${index.id} has already been submitted. Please change the protocol id.`)
        return false
    }
    payload.registryUniqueRef = id
    return askRegistryLogin({ ...props, initiate: true })
}
