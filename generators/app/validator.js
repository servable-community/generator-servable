/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

const nameRegex = /^[a-z0-9][a-z0-9\-]*$/i

export const validatePublisher = publisher => {
    if (!publisher) {
        return "Missing publisher name"
    }
    if (!nameRegex.test(publisher)) {
        return "Invalid publisher name"
    }
    return true
}

export const validateAppId = id => {
    if (!id) {
        return "Missing extension identifier"
    }

    if (!nameRegex.test(id)) {
        return "Invalid extension identifier"
    }

    return true
}

export const validateNonEmpty = name => {
    return name && name.length > 0
}

export const validateNumber = name => {
    return true
}
