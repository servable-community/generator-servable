/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"
import validateNumber from "../../lib/validateNumber.js"
import askForGeneric from "../utils/askForGeneric.js"
import askForGenericPort from "../utils/askForGenericPort.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.asks.localMinio) {
        return
    }

    drawSectionHeader({
        generator,
        title: `BUCKET STORAGE 📂`,
        subTitle: `Servable uses a bucket storage for files.`
    })

    if (!force) {
        await askForGeneric({
            ...props, options: {
                ...props.options,
                type: 'confirm',
                name: 'useLocalS3',
                message: 'Use a local bucket storage? (recommended)',
                defaultValue: true
            }
        })
    }
    else {
        payload.useLocalS3 = true
    }

    if (!payload.useLocalS3) {
        return
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'minioUser',
            message: 'Minio username?',
            defaultValue: 'MINIO_USERNAME_TO_CHANGE'
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'minioPassword',
            message: 'Minio password?',
            defaultValue: 'MINIO_PASSWORD_TO_CHANGE'
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'minioEndpoint',
            message: 'Minio endpoint?',
            defaultValue: 'http://localhost:9000'
        }
    })
    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'minioBucket',
            message: 'Minio bucket?',
            defaultValue: 'primary'
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appS3ApiPort',
            message: 'S3 App port?',
            port: { value: 9000, },
            validator: validateNumber,
        }
    })

    await askForGenericPort({
        ...props, options: {
            ...props.options,
            type: 'number',
            name: 'appS3UIPort',
            message: 'S3 App UI port?',
            port: { value: 9001, },
            validator: validateNumber,
        }
    })

    // payload.appS3ApiPort = 9000
    // payload.appS3UIPort = 9001

    payload.asks.localMinio = true
}
