/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForAppDescription from "./askForAppDescription.js"
import askForAppName from "./askForAppName.js"
import askForAppId from "./askForAppId.js"
import askForGeneric from "../utils/askForGeneric.js"

import askForGenericPort from "../utils/askForGenericPort.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import validateNumber from "../../lib/validateNumber.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.asks.appInformations) {
        return
    }

    drawSectionHeader({
        generator,
        title: `APP INFORMATIONS 🚀`,
        subTitle: `Servable required general informations.`
    })

    await askForAppName(props)
    await askForAppId(props)
    await askForAppDescription(props)
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'masterKey',
            message: 'Master key?',
            defaultValue: 'MASTER_KEY_TO_CHANGE'
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'javascriptKey',
            message: 'Javascript key?',
            defaultValue: 'JAVASCRIPT_KEY_TO_CHANGE'
        }
    })
    // await askForGeneric({
    //     ...props, options: {
    //         ...props.options,
    //         name: 'restApiKey',
    //         message: 'Rest Api Key?',
    //         defaultValue: 'REST_API_KEY_TO_CHANGE'
    //     }
    // })
    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appPort',
            message: 'App port?',
            port: { value: 1337 },
            validator: validateNumber
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appEndpoint',
            message: 'App endpoint?',
            defaultValue: 'parse'
        }
    })

    payload.maxUploadSize = '20mb'
    payload.authorName = ""
    payload.authorEmail = ""
    payload.authorUrl = ""
    payload.restApiKey = 'REST_API_KEY_TO_CHANGE'
    payload.asks.appInformations = true
}
