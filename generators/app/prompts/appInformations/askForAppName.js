/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

import path from "path";

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['appName']
    if (value) {
        payload.appName = value;
        return
    }
    const nameFromFolder = generator.options['destination'] ? path.basename(generator.destinationPath()) : '';
    if (generator.options['quick'] && nameFromFolder) {
        payload.appName = nameFromFolder;
        return
    }

    value = (await generator.prompt({
        type: 'input',
        name: 'appName',
        message: 'What is the app name?',
        default: nameFromFolder
    })).appName

    payload.appName = value
}
