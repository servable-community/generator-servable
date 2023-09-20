/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "./askForGeneric.js"

export default async props => {
    const { parameter, protocol } = props
    if (!parameter || !parameter.prompt) {
        return
    }
    const {
        id,
        prompt: {
            type,
            // name,
            message,
            defaultValue,
            validator } } = parameter

    if (validator) {

    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type,
            name: id,
            message: `[${protocol.name}] → ${message}`,
            defaultValue
        }
    })
}
