/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import { validateAppId } from "../../validator.js"

/**
 * Ask for extension id ("name" in package.json)
 * */

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['appId']
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
        name: 'appId',
        message: 'What\'s the app ID?',
        default: value || '',
        validate: validateAppId
    })).appId
}
