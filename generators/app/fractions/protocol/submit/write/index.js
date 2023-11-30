/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"
import submitProtocol from "../lib/submitProtocol/index.js"
import updateProtocol from "../lib/updateProtocol/index.js"

export default async (props) => {

    const { generator, payload, } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const path = payload.targetProtocolPath

    switch (payload.registrySubmitMode) {
        case 'update': {

        } break
        case 'create': {

        } break
    }

    const submitted = await submitProtocol({
        path,
        generator,
        payload,
        mode: payload.registrySubmitMode,
        uniqueRef: payload.registryUniqueRef
    })
    if (!submitted) {
        return false
    }

    return updateProtocol(props)
}

