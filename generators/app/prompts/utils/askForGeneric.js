/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import validateNonEmpty from "../../lib/valdiateNonEmpty.js"


export default async (props) => {
    const {
        generator,
        payload,
        options: {
            name,
            message,
            type = 'input',
            validator = validateNonEmpty,
            defaultValue } } = props

    const options = (await import("../../options.js")).default
    let _message = message
    let _defaultValue = defaultValue
    let _type = type
    const isQuick = generator.options['quick']
    if (name) {
        const option = options[name]
        if (option) {
            _message = _message ? _message : option.description
            _type = option.type
            _defaultValue = (_defaultValue === null || _defaultValue === undefined)
                ? option.default
                : _defaultValue
        }
    }

    // const value = generator.options[name]
    const value = payload[name]
    if (!(value === null || value === undefined)) {
        return
    }

    if (isQuick && !(value === null || value === undefined)) {
        return
    }

    if (isQuick && !(_defaultValue === null || _defaultValue === undefined)) {
        payload[name] = _defaultValue
        return
    }

    payload[name] = (await generator.prompt({
        ...props.options,
        type,
        name,
        message: _message,
        default: value ? value : _defaultValue,
        validate: validator
    }))[name]


}
