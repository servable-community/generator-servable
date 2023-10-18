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
        default: 'parse',
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
    'useLocalS3': {
        type: Boolean,
        default: true,
        description: `Use a local bucket storage (recommended)`
    },
    'useAppProtocol': {
        type: Boolean,
        description: `Add class to app protocol`
    },
    'targetProtocol': {
        type: String,
        description: `Target protocol`
    },
}
