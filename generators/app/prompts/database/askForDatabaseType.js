/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['databaseType']
    if (value && value.length) {
        payload.databaseType = value
        return
    }

    payload.databaseType = ['production']

    if (generator.options['quick']) {
        return
    }

    payload.configurations = (await generator.prompt({
        type: 'list',
        name: 'databaseType',
        message: 'Which type of database to use?',
        choices: [{
            name: 'Mongo DB (required for standalone distribution)',
            value: 'mongodb',
        }, {
            name: 'PostGresQL',
            value: 'postGresQL',
            checked: true,
        },]
    })).databaseType
}
