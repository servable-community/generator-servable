/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */
export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.asks.gitInit) {
        return
    }

    let gitInit = generator.options['gitInit']
    if (typeof gitInit === 'boolean') {
        payload.gitInit = Boolean(gitInit)
        return
    }
    if (generator.options['quick']) {
        payload.gitInit = true
        return
    }
    payload.gitInit = (await generator.prompt({
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize a git repository?',
        default: true
    })).gitInit

    payload.asks.gitInit = true
}
