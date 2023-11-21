/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import updateProtocolClasses from "../../../../../actions/updateProtocolClasses/index.js"
import protocolSchemaVersion from "../../../../../prompts/classInformations/lib/protocolSchemaVersion.js"
import pureClass from './index.js'

export default async (props) => {

    const { generator, payload } = props

    const targetRootPath = `${payload.targetProtocolPath}/classes/${payload.className.toLowerCase()}`
    await updateProtocolClasses(props)
    await pureClass({ ...props, targetRootPath })

    const version = await protocolSchemaVersion(payload.targetProtocolPath)
    const targetSchemaPath = `${payload.targetProtocolPath}/schema/${version}/index.json`
    generator.fs.writeJSON(generator.destinationPath(targetSchemaPath), payload.targetSchema)
}
