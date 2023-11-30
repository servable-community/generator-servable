/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { documentProtocol, extractProtocol, ManifestEnums } from 'servable-engine'
import protocolIndex from '../../lib/protocolIndex.js'

export default async (props) => {
    const { path, } = props
    // console.log(cccomputeSchema)

    const index = await protocolIndex(path)

    const manifest = await extractProtocol({
        path,
        dataTemplateType: ManifestEnums.DataTemplateType.Protocol
    })

    const documentation = await documentProtocol({ path, write: false })

    // generator.log('payload', { manifest, documentation, index })
    return { manifest, documentation, index }
}

