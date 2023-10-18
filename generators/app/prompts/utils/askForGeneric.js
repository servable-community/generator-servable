/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import validateNonEmpty from "../../lib/valdiateNonEmpty.js"


export default async ({
    generator,
    payload,
    options: {
        force = false,
        name = 'N/A',
        message = 'N/A',
        type = 'input',
        validator = validateNonEmpty,
        defaultValue = '' } }) => {

    if (!force && payload.asks[name]) {
        return
    }

    const options = (await import("../../options.js")).default
    let _message = message
    let _quickValue = null
    let _type = type
    const isQuick = generator.options['quick']
    if (name) {
        const option = options[name]
        if (option) {
            _message = _message ? _message : option.description
            _type = option.type
            _quickValue = option.quickValue
        }
    }

    const value = generator.options[name]
    if (value) {
        payload[name] = value
        return
    }

    if (isQuick && value) {
        return
    }

    if (isQuick && !value && (_quickValue || defaultValue)) {
        payload[name] = defaultValue ? defaultValue : _quickValue
        return
    }

    payload[name] = (await generator.prompt({
        type,
        name,
        message: _message,
        default: value ? value : defaultValue,
        validate: validator
    }))[name]

    payload.asks[name] = true
}
