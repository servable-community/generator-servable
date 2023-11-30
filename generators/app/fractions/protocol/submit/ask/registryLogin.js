/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForGenericBulk from "../../../../prompts/utils/askForGenericBulk.js"

export default async (props) => {
    const { generator, payload } = props
    return askForGenericBulk({
        ...props, items: [
            {
                name: 'registryUsername',
            },
            {
                name: 'registryPassword',
                type: 'password'
            },
        ]
    })
}



