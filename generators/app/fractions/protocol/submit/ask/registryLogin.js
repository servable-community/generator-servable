/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import getValueFromStore from "../../../../lib/store/get.js"
import saveValueToStore from "../../../../lib/store/save.js"
import askForGenericBulk from "../../../../prompts/utils/askForGenericBulk.js"

export default async (props) => {
    const { generator, payload } = props

    const domain = "registry.servablecommunity.com"

    const username = await getValueFromStore({
        key: 'username',
        domain
    })
    const password = await getValueFromStore({
        key: 'username',
        domain
    })

    generator.log('domain', domain)
    generator.log('username', username,)

    if (username && password) {
        payload.registryUsername = username
        payload.registryPassword = password
    }

    const hasValues = await askForGenericBulk({
        ...props, items: [
            {
                name: 'registryUsername',
                default: username
            },
            {
                name: 'registryPassword',
                type: 'password',
                default: password
            },
        ]
    })

    if (!hasValues) {
        return false
    }

    await saveValueToStore({
        key: 'username',
        domain,
        value: payload.registryUsername
    })

    await saveValueToStore({
        key: 'password',
        domain,
        value: payload.registryPassword
    })

    return true

}



