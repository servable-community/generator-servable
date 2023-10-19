/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import validateNumber from "../../lib/validateNumber.js"
import askForGeneric from "../utils/askForGeneric.js"
import askForGenericPort from "../utils/askForGenericPort.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.localMinio) {
        return
    }

    drawSectionHeader({
        generator,
        title: `Bucket storage 📂`,
        subTitle: `Servable uses a bucket storage for files.`
    })

    if (!force) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'appUseLocalS3',
            }
        })
    }
    else {
        payload.appUseLocalS3 = true
    }

    if (!payload.appUseLocalS3) {
        return
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appMinioUser',
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appMinioPassword',
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appMinioEndpoint',
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appMinioBucket',
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appS3ApiPort',
            port: { value: 9000, },
            validator: validateNumber,
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appS3UIPort',
            port: { value: 9001, },
            validator: validateNumber,
        }
    })

    // payload.appS3ApiPort = 9000
    // payload.appS3UIPort = 9001

    payload.promptGroupsPassed.localMinio = true
}
