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
            name: 'launchDocker',
            message: 'Launch Docker after installation?',
            defaultValue: false
        }
    })
}
