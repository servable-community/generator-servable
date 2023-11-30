/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import buildPayload from './buildPayload.js'
import post from './api/post.js'


export default async (props) => {
    const { payload, path, mode, uniqueRef } = props

    try {
        const apiPayload = await buildPayload({ path, })
        const result = await post({
            payload: apiPayload,
            username: payload.registryUsername,
            password: payload.registryPassword,
            mode,
            uniqueRef,
            // sessionToken: payload.sessionToken,
        })
        return result
    } catch (e) {
        console.error(e)
    }

    return null
}

