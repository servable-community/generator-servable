/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

/**
 * Ask for extension id ("name" in package.json)
 * */


export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['masterKey']
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
        name: 'masterKey',
        message: 'What\'s the master key?',
        default: value || '',
        validate: validator.validateNonEmpty
    })).masterKey
}
