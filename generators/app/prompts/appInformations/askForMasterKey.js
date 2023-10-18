/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import valdiateNonEmpty from "../../lib/valdiateNonEmpty.js"

/**
 * Ask for extension id ("name" in package.json)
 * */


export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['appMasterKey']
    if (value) {
        payload.appId = value
        return
    }

    value = payload.appId
    if (!value && payload.appName) {
        value = payload.appName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }

    if (value && generator.options['quick']) {
        payload.appId = value
        return
    }

    payload.appId = (await generator.prompt({
        type: 'input',
        name: 'appMasterKey',
        message: 'What\'s the master key?',
        default: value || '',
        validate: valdiateNonEmpty
    })).appMasterKey
}
