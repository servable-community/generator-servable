/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import updateNotifier from 'update-notifier'
import packageJson from '../../../../package.json' assert { type: 'json' }

export default async (props) => {
    const { generator, payload, generators } = props

    const notifier = updateNotifier({
        pkg: packageJson,
        updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
    })

    notifier.notify()
    console.log(notifier.update)
    /*
    {
        latest: '1.0.1',
        current: '1.0.0',
        type: 'patch', // Possible values: latest, major, minor, patch, prerelease, build
        name: 'pageres'
    }
    */
}