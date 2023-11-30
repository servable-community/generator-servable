/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import buildPayload from './buildPayload.js'
import post from './api/post.js'


export default async (props) => {
    const { payload, path } = props

    try {
        const apiPayload = await buildPayload({ path, })
        const result = await post({
            payload: apiPayload,
            username: payload.registryUsername,
            password: payload.registryPassword,
        })
        return result
    } catch (e) {
        console.error(e)
        return null
    }
}

