/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import ownClass from "../../lib/templates/schema/ownClass.js"
import protocolSchemaOwnClasses from "../../prompts/classInformations/lib/protocolSchemaOwnClasses.js"
import protocolSchemaRaw from "../../prompts/classInformations/lib/protocolSchemaRaw.js"

export default async (props) => {
    const { payload, } = props

    const targetClass = ownClass({ className: payload.className })

    const schema = await protocolSchemaRaw(payload.targetProtocolPath)
    const ownClasses = await protocolSchemaOwnClasses(payload.targetProtocolPath) || []
    const classesWithoutTargetClass = ownClasses.filter(a => a.className !== targetClass.className)
    classesWithoutTargetClass.push(targetClass)
    schema.own.classes = classesWithoutTargetClass

    payload.targetSchema = schema
}
