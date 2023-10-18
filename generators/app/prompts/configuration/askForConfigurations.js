/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

export default async (props) => {
    const { generator, payload } = props


    let value = generator.options['appConfigurations']
    if (value && value.length) {
        payload.appConfigurations = value
        return
    }

    payload.appConfigurations = ['production']

    if (generator.options['quick']) {
        return
    }

    payload.appConfigurations = (await generator.prompt({
        type: 'list',
        name: 'appConfigurations',
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
    })).appConfigurations

}
