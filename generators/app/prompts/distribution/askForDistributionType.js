/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['appDistributionType']
    if (['standalone', 'distributed'].includes(value)) {
        payload.appDistributionType = value
        return
    }

    payload.appDistributionType = 'standalone'

    if (generator.options['quick']) {
        return
    }

    payload.appDistributionType = (await generator.prompt({
        type: 'list',
        name: 'appDistributionType',
        message: 'Which distribution to use?',
        choices: [{
            name: 'Standalone',
            value: 'standalone',
            checked: true,
        }, {
            name: 'Distributed (requires a separate replicated mongo database deployment)',
            value: 'distributed',
        },]
    })).appDistributionType
}
