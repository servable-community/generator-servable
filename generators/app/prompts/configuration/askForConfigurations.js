/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

export default async (props) => {
    const { generator, payload } = props


    let value = generator.options['configurations']
    if (value && value.length) {
        payload.configurations = value
        return
    }

    payload.configurations = ['production']

    if (generator.options['quick']) {
        return
    }

    payload.configurations = (await generator.prompt({
        type: 'list',
        name: 'configurations',
        message: 'Which configurations to use?',
        choices: [
            {
                name: 'Production (mandatory)',
                value: 'production',
                checked: true,
            }, {
                name: 'Staging (experimental)',
                value: 'staging',
            },
            // (new inquirer.Separator())
        ]
    })).configurations

}
