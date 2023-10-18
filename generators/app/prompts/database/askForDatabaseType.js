/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['appDatabaseType']
    if (value && value.length) {
        payload.appDatabaseType = value
        return
    }

    payload.appDatabaseType = ['production']

    if (generator.options['quick']) {
        return
    }

    payload.appDatabaseType = (await generator.prompt({
        type: 'list',
        name: 'appDatabaseType',
        message: 'Which type of database to use?',
        choices: [{
            name: 'Mongo DB (required for standalone distribution)',
            value: 'mongodb',
        }, {
            name: 'PostGresQL',
            value: 'postGresQL',
            checked: true,
        },]
    })).appDatabaseType
}
