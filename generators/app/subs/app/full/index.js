/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import askForLocalMinioPrompts from "../../../prompts/localMinio/index.js"
import askForDashboard from "../../../prompts/dashboard/index.js"
import askForLiveQueryServer from "../../../prompts/liveQueryServer/index.js"
import askForAppCache from "../../../prompts/appCache/index.js"
import askForAppInfos from "../../../prompts/appInformations/index.js"
import askForDistribution from "../../../prompts/distribution/index.js"
import askForConfiguration from "../../../prompts/configuration/index.js"
import askForPackageManager from "../../../prompts/packageManager/index.js"
import askForDatabase from "../../../prompts/database/index.js"
import askForLicense from "../../../prompts/license/index.js"
import askForGit from "../../../prompts/transverse/askForGit.js"
import gitInit from "../../../actions/bootGit/index.js"
import openProject from "../../../actions/openProject/index.js"
import projectUpdated from "../../../actions/projectUpdated/index.js"
import drawEnd from "../../../lib/draw/drawEnd.js"
import bootApp from "../../../actions/bootApp/index.js"
import bootPackageManager from "../../../actions/bootPackageManager/index.js"
// import askForBootLocalInfraDocker from "../../../prompts/transverse/askForBootLocalInfraDocker.js"
// import askForLocalInfraDocker from "../../../prompts/localInfraDocker/index.js"
import bootInfra from "../../../actions/bootInfra/index.js"

export default {
    id: 'appfull',
    path: 'app/full',
    aliases: ['app', 'full'],
    name: 'Create an app 🚀',
    version: '0.1.0',
    prompting: async (props) => {
        await askForAppInfos(props)
        await askForLicense(props)
        await askForDatabase(props)
        await askForAppCache(props)
        await askForLiveQueryServer(props)
        await askForLocalMinioPrompts(props)
        await askForDashboard(props)
        await askForDistribution(props)
        await askForConfiguration(props)
        await askForPackageManager(props)
        await askForGit(props)
        // await askForBootLocalInfraDocker(props)
        // await askForLocalInfraDocker(props)
    },
    writing: async (props) => {
        await bootApp(props)
        await bootPackageManager(props)
        await bootInfra(props)
    },
    end: async (props) => {
        const { generator, payload } = props

        if (generator.update) {
            await projectUpdated(props)
            return
        }

        await gitInit(props)
        drawEnd({
            generator,
            title: `Your project ${payload.appName} has been created!`,
            subTitle: `For more information, also visit https://servable.app and follow us @servable.`
        })

        await openProject(props)
    }
}
