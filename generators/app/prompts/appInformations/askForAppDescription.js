/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
/**
 * Ask for extension description
 */
export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['appDescription'];
    if (value) {
        payload.description = value
        return
    }
    if (generator.options['quick']) {
        payload.description = ''
        return
    }
    payload.appDescription = (await generator.prompt({
        type: 'input',
        name: 'appDescription',
        message: 'What\'s the description of your app?',
        default: ''
    })).appDescription
}
