/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['bootstrapClass']

    if (typeof value === 'boolean') {
        payload.addClassClass = Boolean(value)
        return
    }

    if (generator.options['quick']) {
        payload.addClassClass = true
        return
    }

    payload.addClassClass = (await generator.prompt({
        type: 'confirm',
        name: 'bootstrapClass',
        message: 'Bootstrap classes?',
        default: true
    })).bootstrapClass
}
