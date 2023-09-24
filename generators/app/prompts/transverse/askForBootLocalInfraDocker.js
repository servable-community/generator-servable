/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/


import askForGeneric from "../utils/askForGeneric.js"

export default async (props) => {
    const { generator, payload } = props
    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: 'confirm',
            name: 'launchLocalInfraDocker',
            message: 'Add a local docker infrastructure?',
            defaultValue: false
        }
    })
}