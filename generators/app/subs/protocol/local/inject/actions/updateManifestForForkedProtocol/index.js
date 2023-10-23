/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolManifest from "../../../../../../lib/protocolManifest.js"

export default async (props) => {
    const { generator, payload, targetPath, origin, originPackageJSON } = props

    let manifest = await protocolManifest(targetPath)
    if (!manifest) {
        return
    }
    manifest =
    {
        ...manifest,
        dependencies: originPackageJSON.dependencies,
        devDependencies: originPackageJSON.devDependencies,
        peerDependencies: originPackageJSON.peerDependencies,
        metadata: {
            fork: {
                ...origin
            }
        }
    }

    generator.fs.writeJSON(`${targetPath}/manifest.json`, manifest)
}
