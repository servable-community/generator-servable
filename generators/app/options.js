/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import extensionGenerators from "./subs/index.js"

export default {
    'quick': {
        type: Boolean,
        alias: 'q',
        description: 'Quick mode, skip all optional prompts and use defaults'
    },
    'open': {
        type: Boolean,
        alias: 'o',
        description: 'Open the generated project in Visual Studio Code'
    },
    'generatorType': {
        type: String,
        alias: 't',
        description: extensionGenerators.filter(a => a.id).slice(0, 6).map(e => e.aliases[0]).join(', ') + '...'
    },
    'appMasterKey': {
        type: String,
        alias: 'm',
        default: 'MASTER_KEY_TO_CHANGE',
        description: 'App master key'
    },
    'appJavascriptKey': {
        type: String,
        alias: 'j',
        default: 'JAVASCRIPT_KEY_TO_CHANGE',
        description: 'App javascript key'
    },
    'appName': {
        type: String,
        alias: 'n',
        default: 'No name',
        description: 'App name'
    },
    'appId': {
        type: String,
        alias: 'i',
        default: 'no-name',
        description: 'App ID'
    },
    'appDescription': {
        type: String,
        alias: 'd',
        default: 'A servable app',
        description: 'App description'
    },
    'appEndpoint': {
        type: String,
        alias: 'e',
        default: 'servable',
        description: 'App endpoint'
    },
    'appDistributionType': {
        type: String,
        alias: 'd',
        description: `App distribution type`
    },
    'appUseCache': {
        type: Boolean,
        default: true,
        description: `Use app cache`
    },
    'appUseDashboard': {
        type: Boolean,
        default: true,
        description: `Use a Servable Dashboard (recommended)`
    },
    'appDashboardMainPassword': {
        type: String,
        default: 'PASSWORD_TO_CHANGE',
        description: `Dashboard password`
    },
    'appDashboardPort': {
        type: Number,
        default: '4040',
        description: `Dashboard port`
    },
    'appDashboardMainUsername': {
        type: String,
        default: 'admin',
        description: `Dashboard username`
    },
    'appCachePort': {
        type: String,
        description: `App cache port`
    },
    'appConfigurations': {
        type: String,
        description: `App configuration`
    },
    'appDatabasePort': {
        type: Number,
        default: 27019,
        description: `App database port`
    },
    'appPort': {
        type: Number,
        default: 1337,
        description: `App port`
    },
    'appDatabaseType': {
        type: String,
        description: `App database type`
    },
    'appUtilsDatabasePort': {
        type: Number,
        description: `App utils database port`
    },
    'appLiveQueryCachePort': {
        type: Number,
        description: `Livequery cache port`
    },
    'appUseLocalS3': {
        type: Boolean,
        default: true,
        description: `Use a local bucket storage (recommended)`
    },
    'appMinioUser': {
        type: String,
        default: 'MINIO_USERNAME_TO_CHANGE',
        description: `Minio username`
    },
    'appMinioPassword': {
        type: String,
        default: 'MINIO_PASSWORD_TO_CHANGE',
        description: `Minio password`
    },
    'appMinioEndpoint': {
        type: String,
        default: 'http://localhost:9000',
        description: `Minio endpoint`
    },
    'appMinioBucket': {
        type: String,
        default: 'primary',
        description: `Minio bucket`
    },
    'appS3ApiPort': {
        type: Number,
        default: 9000,
        description: `S3 App port`
    },
    'appS3UIPort': {
        type: Number,
        default: 9001,
        description: `S3 App UI port`
    },
    'gitInit': {
        type: Boolean,
        alias: 'g',
        default: true,
        description: `Initialize a git repository`
    },
    'pkgManager': {
        type: String,
        alias: 'p',
        default: 'yarn',
        description: `Package manager ('npm', 'yarn' or 'pnpm')`
    },
    'bootstrapClass': {
        type: Boolean,
        description: `Bootstrap class`
    },
    'license': {
        type: String,
        default: 'standalone',
        description: `License`
    },
    'target': {
        type: String,
        description: `Target`
    },
    'className': {
        type: String,
        description: `className`
    },

    'useAppProtocol': {
        type: Boolean,
        description: `Add class to app protocol`
    },
    'targetProtocol': {
        type: String,
        description: `Target protocol`
    },
    'githubUsername': {
        type: String,
        default: 'servable-community',
        description: 'Github username'
    },
    'protocolName': {
        type: String,
        alias: 'n',
        default: 'No name',
        description: 'Protocol name'
    },
    'protocolId': {
        type: String,
        alias: 'i',
        default: 'no-name',
        description: 'Protocol ID'
    },
    'protocolDescription': {
        type: String,
        alias: 'd',
        default: 'A servable app',
        description: 'Protocol description'
    },
}
