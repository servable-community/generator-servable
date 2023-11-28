/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import protocolIndex from "../../../../../../lib/protocolIndex.js"

export default async (props) => {
    const { generator, payload, targetPath, origin, originPackageJSON } = props

    let index = await protocolIndex(targetPath)
    if (!index) {
        return
    }
    index =
    {
        ...index,
        dependencies: originPackageJSON.dependencies,
        devDependencies: originPackageJSON.devDependencies,
        peerDependencies: originPackageJSON.peerDependencies,
        metadata: {
            fork: {
                ...origin
            }
        }
    }

    generator.fs.writeJSON(`${targetPath}/index.json`, index)
}
