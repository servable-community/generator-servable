/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import path from "path";
import askForGeneric from "../utils/askForGeneric.js";

export default async (props) => {
    const { generator, payload } = props

    let defaultValue = generator.options['destination'] ? path.basename(generator.destinationPath()) : '';
    // if (!defaultValue) {
    //     defaultValue = randomName()
    // }

    await askForGeneric({
        ...props, options: {
            ...props.options,
            name: 'appName',
            defaultValue
        }
    })
}
