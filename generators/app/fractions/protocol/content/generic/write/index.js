/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"

import writeProtocolIndex from "../../index/write/index.js"
import writeForTriggers from "../../../../shared/triggers/write/index.js"
// import writeClassContent from "../../../../class/content/generic/write/index.withprotocol.js"

export default async (props) => {

    const { generator, payload, targetRootPath } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    payload.protocolDescription = payload.protocolDescription ? payload.protocolDescription : ''
    payload.author = payload.author ? payload.author : ''

    const destinator = v => `${targetRootPath}/${v}`

    generator.fs.copy(`${__dirname}/template/**/*`, destinator(''))


    await writeProtocolIndex({ ...props, destinator })
    await writeForTriggers({ ...props })

    // if (payload.protocolSampleClassShouldAdd) {
    //     await writeClassContent({
    //         ...props,
    //         targetProtocolPath: targetRootPath,
    //         className: payload.protocolSampleClassName,
    //         upgradeProtocolSchemaVersion: true
    //     })
    // }
}
