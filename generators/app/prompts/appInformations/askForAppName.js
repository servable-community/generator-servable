/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import path from "path";
import randomName from "../../lib/randomName.js";
import askForGeneric from "../utils/askForGeneric.js";

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['appName']
    if (value) {
        payload.appName = value;
        return
    }
    let defaultValue = generator.options['destination'] ? path.basename(generator.destinationPath()) : '';
    if (!defaultValue) {
        defaultValue = randomName()
    }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appName',
            defaultValue
        }
    })
}
