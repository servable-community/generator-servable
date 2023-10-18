/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForGenericPort from "../utils/askForGenericPort.js"

import askForDatabaseType from "./askForDatabaseType.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import validateNumber from "../../lib/validateNumber.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.database) {
        return
    }

    drawSectionHeader({
        generator,
        title: `APP DATABASE 💿`,
        subTitle: `Servable handles both mongodb and PostGreSQL databases.`
    })

    await askForDatabaseType(props)
    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appDatabasePort',
            message: 'App database port?',
            port: { value: 27017, },
            validator: validateNumber
        }
    })

    payload.databaseURI = `mongodb://root:DATABASE_PASSWORD_TO_CHANGE@localhost:${payload.appDatabasePort}/app?authSource=admin&readPreference=primary&ssl=false`
    payload.promptGroupsPassed.database = true
}
