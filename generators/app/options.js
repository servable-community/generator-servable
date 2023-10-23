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
        default: 'skip',
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
        default: 'standalone',
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
        default: 'production',
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
        default: 'mongodb',
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
    'license': {
        type: String,
        default: 'standalone',
        description: `License`
    },
    'className': {
        type: String,
        description: 'Class name',
    },
    'classDescription': {
        type: String,
        default: 'Class description',
        description: 'Class description',
    },
    'classBootstrapFiles': {
        type: String,
        default: true,
        description: 'Bootstrap class files',
    },
    'useAppProtocol': {
        type: Boolean,
        description: `Add class to app protocol`
    },
    'targetProtocolPath': {
        type: String,
        description: `Absolute path to target protocol`
    },
    'targetProtocol': {
        type: String,
        description: `Name of the target protocol`
    },
    'githubUsername': {
        type: String,
        default: 'servable-community',
        description: 'Github username'
    },
    'protocolName': {
        type: String,
        default: 'No name',
        description: 'Protocol name'
    },
    'protocolId': {
        type: String,
        default: 'no-name',
        description: 'Protocol ID'
    },
    'protocolDescription': {
        type: String,
        default: 'A servable protocol',
        description: 'Protocol description'
    },
    'targetClassPath': {
        type: String,
        description: 'The path of the class to add a protocol to'
    },
    'communityProtocolIdToImport': {
        type: String,
        description: 'Community protocol ID to import'
    },
    'protocolHowTo': {
        type: String,
        description: 'Protocol how to'
    },
    'protocolDefaultSlug': {
        type: String,
        description: 'Protocol default slug'
    },
    'protocolServableEngineVersion': {
        type: String,
        default: 'latest',
        description: 'Protocol default servable engine'
    },
    'protocolIconUrl': {
        type: String,
        description: 'Protocol icon url'
    },
    'protocolHomepageUrl': {
        type: String,
        description: 'Protocol homepage url'
    },
    'protocolTemplateParameters': {
        type: String,
        description: 'Protocol template parameters'
    },
    'protocolTemplateParametersDefinition': {
        type: String,
        description: 'Protocol template parameters definition'
    },
    'authorName': {
        type: String,
        description: 'Author name'
    },
    'authorEmail': {
        type: String,
        description: 'Author email'
    },
    'authorUrl': {
        type: String,
        description: 'Author homepage url'
    },
    'authorGithubUrl': {
        type: String,
        description: 'Author github'
    },
}
