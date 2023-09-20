/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
/**
 * */

export default async (props) => {
    const { generator, payload } = props
    let value = generator.options['pkgManager']
    if (value === 'npm' || value === 'yarn' || value === 'pnpm') {
        payload.pkgManager = value
        return
    }

    payload.pkgManager = 'npm'
    if (generator.options['quick']) {
        return
    }

    payload.pkgManager = (await generator.prompt({
        type: 'list',
        name: 'pkgManager',
        message: 'Which package manager to use?',
        choices: [{
            name: 'npm',
            value: 'npm'
        }, {
            name: 'yarn',
            value: 'yarn'
        }, {
            name: 'pnpm',
            value: 'pnpm'
        }]
    })).pkgManager
}
