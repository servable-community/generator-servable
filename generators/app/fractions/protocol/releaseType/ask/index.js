/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGeneric from "../../../../prompts/utils/askForGeneric.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.promptGroupsPassed.releaseType) {
        return
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            type: 'list',
            name: 'releaseType',
            choices: [{
                name: 'Github actions',
                value: 'github'
            },
            {
                name: 'Gitlab CI',
                value: 'gitlab'
            },
            {
                name: 'None',
                value: 'none'
            },]
        }
    })

    payload.promptGroupsPassed.releaseType = true
}
