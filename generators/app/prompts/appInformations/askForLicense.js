/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['license']
    if (value) {
        payload.license = value
        return
    }

    payload.license = 'standalone'

    if (generator.options['quick']) {
        return
    }

    payload.license = (await generator.prompt({
        type: "list",
        name: "license",
        message: "License",
        // store: true,
        choices: [
            "Apache 2.0",
            "MIT",
            "Mozilla Public License 2.0",
            "BSD 2-Clause (FreeBSD) License",
            "BSD 3-Clause (FreeBSD) License",
            "Internet Systems Consortium (ISC) License",
            "GNU AGPL 3.0",
            // (new inquirer.Separator()),
        ]
    })).license
}
