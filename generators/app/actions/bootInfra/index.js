/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

export default async (props) => {

    const { generator, payload, options: { force = false } = {} } = props
    if (!force && !payload.launchLocalInfraDocker) {
        return
    }

    generator.fs.copyTpl(generator.templatePath('lib/app/system/docker/docker-compose.yaml'), generator.destinationPath('lib/app/system/docker/docker-compose.yaml'), payload);
    generator.fs.copy(generator.templatePath('lib/app/system/docker/data'), generator.destinationPath('lib/app/system/docker/data'))
    // generator.fs.copyTpl(generator.templatePath('.system/README.md'), generator.destinationPath('.system/README.md'), payload)
    // generator.fs.copyTpl(generator.templatePath('.system/CHANGELOG.md'), generator.destinationPath('.system/CHANGELOG.md'), payload)
    generator.fs.copy(generator.templatePath('lib/app/system/docker/gitignore'), generator.destinationPath('lib/app/system/docker/.gitignore'));

    switch (payload.distributionType) {
        case 'distributed': {
            // if (!generator.fs.exists(this.destinationPath('${generator.destinationPath()}/.system/data/utils-mongo/replica.key'))) {
            generator.spawnCommand('bash', ['-c', `openssl rand -base64 741 > ${generator.destinationPath()}/lib/app/system/docker/data/utils-mongo/replica.key`])
            generator.spawnCommand('bash', ['-c', `chmod 600 ${generator.destinationPath()}/lib/app/system/docker/data/utils-mongo/replica.key`])
            // }
        } break
        default:
            break
    }

    const launchDocker = payload.launchDocker
    if (launchDocker) {
        generator.spawnCommand('bash', ['-c', `docker compose --project-name ${payload.appId} -f ${generator.destinationPath()}/.system/app/docker/docker-compose.yaml up -d --remove-orphans`])
    }
}
