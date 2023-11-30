/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGenericBulk from "../../../../../prompts/utils/askForGenericBulk.js"
import login from "../lib/login.js"

export default async (props) => {
    const { generator, payload, initiate = true } = props
    await askForGenericBulk({
        ...props, items: [
            {
                name: 'registryUsername',
            },
            {
                name: 'registryPassword',
                type: 'password'
            },
        ]
    })

    if (!initiate) {
        return
    }

    const result = await login({
        username: payload.registryUsername,
        password: payload.registryPassword
    })

    if (!result) {
        generator.log(`Could not connect to the Servable registry. Please try again later`)
        return false
    }

    const { sessionToken } = result
    payload.sessionToken = sessionToken
    return true
}



