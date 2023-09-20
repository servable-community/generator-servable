/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['distributionType']
    if (['standalone', 'distributed'].includes(value)) {
        payload.distributionType = value
        return
    }

    payload.distributionType = 'standalone'

    if (generator.options['quick']) {
        return
    }

    payload.distributionType = (await generator.prompt({
        type: 'list',
        name: 'distributionType',
        message: 'Which distribution to use?',
        choices: [{
            name: 'Standalone',
            value: 'standalone',
            checked: true,
        }, {
            name: 'Distributed (requires a separate replicated mongo database deployment)',
            value: 'distributed',
        },]
    })).distributionType
}
