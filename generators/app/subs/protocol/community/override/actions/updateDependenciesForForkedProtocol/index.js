/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import projectPackageJson from "../../../../../../lib/projectPackageJson.js"

export default async (props) => {
    const { generator, payload, appPath,
        protocolTargetPath, targetProtocol, originPackageJSON } = props

    const packageJson = await projectPackageJson(appPath)
    if (!packageJson) {
        return
    }

    if (originPackageJSON.dependencies) {
        Object.keys(originPackageJSON.dependencies).forEach(key => {
            const value = originPackageJSON.dependencies[key]
            if (!packageJson.dependencies) {
                packageJson.dependencies = {}
            }
            if (packageJson.dependencies[key]) {
                delete packageJson.dependencies[key]
            }
            packageJson.dependencies = {
                ...(packageJson.dependencies ? packageJson.dependencies : {}),
                [key]: value
            }
        })
    }

    if (originPackageJSON.devDependencies) {
        Object.keys(originPackageJSON.devDependencies).forEach(key => {
            const value = originPackageJSON.devDependencies[key]
            if (!packageJson.devDependencies) {
                packageJson.devDependencies = {}
            }
            if (packageJson.dependencies[key]) {
                delete packageJson.dependencies[key]
            }
            packageJson.devDependencies = {
                ...(packageJson.devDependencies ? packageJson.devDependencies : {}),
                [key]: value
            }
        })
    }

    if (originPackageJSON.peerDependencies) {
        Object.keys(originPackageJSON.peerDependencies).forEach(key => {
            const value = originPackageJSON.peerDependencies[key]
            if (!packageJson.peerDependencies) {
                packageJson.peerDependencies = {}
            }
            if (packageJson.peerDependencies[key]) {
                delete packageJson.peerDependencies[key]
            }
            packageJson.peerDependencies = {
                ...(packageJson.peerDependencies ? packageJson.peerDependencies : {}),
                [key]: value
            }
        })
    }

    const packageJsonPath = `${appPath}/package.json`
    generator.fs.writeJSON(generator.destinationPath(packageJsonPath), packageJson)
}
