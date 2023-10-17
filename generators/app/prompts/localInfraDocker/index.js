/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import askForAppInfos from "../appInformations/index.js"
import askForLocalMinioPrompts from "../localMinio/index.js"
import askForDashboard from "../dashboard/index.js"
import askForLiveQueryServer from "../liveQueryServer/index.js"
import askForAppCache from "../appCache/index.js"
import askForDistribution from "../distribution/index.js"
import askForConfiguration from "../configuration/index.js"
import askForPackageManager from "../packageManager/index.js"
import askForDatabase from "../database/index.js"
import askForLaunchDocker from "../transverse/askForLaunchDocker.js"

export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && !payload.launchLocalInfraDocker) {
        return
    }

    await askForAppInfos(props)
    await askForDatabase(props)
    await askForAppCache(props)
    await askForLiveQueryServer(props)
    await askForLocalMinioPrompts(props)
    await askForDashboard(props)
    await askForDistribution(props)
    await askForConfiguration(props)
    await askForPackageManager(props)

    generator.log(`\n`)
    await askForLaunchDocker(props)
}
