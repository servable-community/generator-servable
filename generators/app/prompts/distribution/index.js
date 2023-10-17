/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForDistributionType from "./askForDistributionType.js"
import askForGenericPort from "../utils/askForGenericPort.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import validateNumber from "../../lib/validateNumber.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.asks.distribution) {
        return
    }

    drawSectionHeader({
        generator,
        title: `DISTRIBUTION ⠕`,
        subTitle: `Servable can use an arbiter.`
    })

    await askForDistributionType(props)
    switch (payload.distributionType) {
        default: {
            payload.utilsDatabaseURI =
                `mongodb://root:DATABASE_PASSWORD_TO_CHANGE@localhost:${payload.appDatabasePort}/utils?authSource=admin&readPreference=primary&ssl=false`
            payload.asks.distribution = true
            return
        }
        case 'distributed': break
    }

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appUtilsDatabasePort',
            message: 'App utils database port?',
            port: { value: 27018, },
            validator: validateNumber
        }
    })

    payload.utilsDatabaseURI = `mongodb://root:DATABASE_PASSWORD_TO_CHANGE@localhost:${payload.appUtilsDatabasePort}/utils?replicaSet=rs0&authSource=admin&readPreference=primary&ssl=false&directConnection=true`
    payload.asks.distribution = true
}
