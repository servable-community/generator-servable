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
    'masterKey': {
        type: String,
        alias: 'm',
        quickValue: 'MASTER_KEY_TO_CHANGE',
        description: 'What\'s the master key?'
    },
    'javascriptKey': {
        type: String,
        alias: 'j',
        quickValue: 'JAVASCRIPT_KEY_TO_CHANGE',
        description: 'What\'s the javascript key?'
    },
    'pkgManager': {
        type: String,
        alias: 'p',
        description: `Which package manager to use? 'npm', 'yarn' or 'pnpm'`
    },
    'appName': {
        type: String,
        alias: 'n',
        quickValue: 'No name',
        description: 'What is the app name?'
    },
    'appId': {
        type: String,
        alias: 'i',
        quickValue: 'no-name',
        description: 'What\'s the app ID?'
    },
    'appDescription': {
        type: String,
        alias: 'd',
        quickValue: 'A servable app',
        description: 'Description of the servable app'
    },
    'appEndpoint': {
        type: String,
        alias: 'e',
        quickValue: 'parse',
        description: 'App endpoint?'
    },
    'gitInit': {
        type: Boolean,
        alias: 'g',
        description: `Initialize a git repository`
    },
    'distributionType': {
        type: String,
        alias: 'd',
        description: `Distribution type`
    },
    'useAppCache': {
        type: Boolean,
        description: `Use app cache`
    },
    'useDashboard': {
        type: Boolean,
        description: `Use a Servable Dashboard? (recommended)`
    },
    'bootstrapClass': {
        type: Boolean,
        description: `Bootstrap class`
    },
    'appCachePort': {
        type: String,
        description: `App cache port?`
    },
    'license': {
        type: String,
        quickValue: 'standalone',
        description: `License`
    },
    'target': {
        type: String,
        description: `target`
    },
    'className': {
        type: String,
        description: `className`
    },
    'configurations': {
        type: String,
        description: `Which configurations to use?`
    },
    'appDatabasePort': {
        type: Number,
        description: `App database port`
    },
    'appPort': {
        type: Number,
        quickValue: 1337,
        description: `App port`
    },
    'databaseType': {
        type: String,
        description: `Which type of database to use?`
    },
    'appUtilsDatabasePort': {
        type: Number,
        description: `App utils database port?`
    },
    'appLiveQueryCachePort': {
        type: Number,
        description: `Livequery cache port?`
    },
    'useLocalS3': {
        type: Boolean,
        description: `Use a local bucket storage? (recommended)`
    },
    'useAppProtocol': {
        type: Boolean,
        description: `Add class to app protocol?`
    },
    'targetProtocol': {
        type: String,
        description: `Target protocol?`
    },
}
