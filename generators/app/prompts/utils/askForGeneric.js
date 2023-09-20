/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
import { validateNonEmpty } from "../../validator.js"

export default async ({
    generator,
    payload,
    optionId,
    options: {
        name = 'N/A',
        message = 'N/A',
        type = 'input',
        validator = validateNonEmpty,
        defaultValue = '' } }) => {
    const options = (await import("../../options.js")).default
    let _message = message
    if (optionId) {
        const option = options[optionId]
        _message = _message ? _message : option.description
    }

    const value = generator.options[name]
    if (value) {
        payload[name] = value
        return
    }

    if (value && generator.options['quick']) {
        return
    }

    payload[name] = (await generator.prompt({
        type,
        name,
        message: _message,
        default: value ? value : defaultValue,
        validate: validator
    }))[name]
}
