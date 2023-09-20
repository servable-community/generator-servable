/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "../utils/askForGeneric.js"
import { validateNumber } from "../../validator.js"
import askForGenericPort from "../utils/askForGenericPort.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props

    if (!force && payload.asks.appCache) {
        return
    }

    drawSectionHeader({
        generator,
        title: `APP REDIS CACHE 🚀`,
        subTitle: `Servable can launch with a dedicated cache server in REDIS.`
    })

    if (!force) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'useAppCache',
                message: 'Use app cache?',
                defaultValue: true
            }
        })
    }
    else {
        payload.useAppCache = true
    }

    if (!payload.useAppCache) {
        return
    }

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appCachePort',
            message: 'App cache port?',
            port: { value: 6379, },
            validator: validateNumber,
            // when: payload.useLiveQueryServer
        }
    })

    payload.asks.appCache = true
}
