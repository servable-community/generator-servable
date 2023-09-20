/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "../utils/askForGeneric.js"
import { validateNumber } from "../../validator.js"
import askForGenericPort from "../utils/askForGenericPort.js"


import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props

    if (!force && payload.asks.liveQueryServer) {
        return
    }

    drawSectionHeader({
        generator,
        title: `LIVE QUERY SERVER ⚡️`,
        subTitle: `A distinct live query server can drastically improve the app's performance for live queries.`
    })

    if (!force) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'useLiveQueryServer',
                message: 'Use Live Query server?',
                defaultValue: true
            }
        })
    }
    else {
        payload.useLiveQueryServer = true
    }

    if (!payload.useLiveQueryServer) {
        return
    }

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appLiveQueryServerPort',
            message: 'Livequery cache port?',
            port: { value: 1392, },
            validator: validateNumber,
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appLiveQueryCachePort',
            message: 'Livequery cache port?',
            port: { value: 6380, },
            validator: validateNumber,
        }
    })

    // payload.appLiveQueryServerPort = 1392
    // payload.appLiveQueryCachePort = 6380

    payload.asks.liveQueryServer = true
}
