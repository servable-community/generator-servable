/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import updateProtocolClasses from "../../../../../actions/updateProtocolClasses/index.js"
import protocolSchemaVersion from "../../../../../prompts/classInformations/lib/protocolSchemaVersion.js"
import pureClass from './index.js'

export default async (props) => {

    const { generator, payload, targetProtocolPath, className, upgradeProtocolSchemaVersion = false } = props
    generator.log('index.withprotocol', targetProtocolPath, className, upgradeProtocolSchemaVersion)
    const targetRootPath = `${targetProtocolPath}/classes/${className.toLowerCase()}`
    const schema = await updateProtocolClasses({ className, targetProtocolPath })
    await pureClass({ ...props, targetRootPath })

    if (upgradeProtocolSchemaVersion) {
        const version = await protocolSchemaVersion(targetProtocolPath)
        if (version) {
            const targetSchemaPath = `${targetProtocolPath}/schema/${version}/index.json`
            generator.fs.writeJSON(generator.destinationPath(targetSchemaPath), schema)
        }
    }
}
