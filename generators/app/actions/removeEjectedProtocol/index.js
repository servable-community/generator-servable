/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import fs from 'fs';

export default async (props) => {
    const { generator, payload, } = props
    const sourcePath = payload.targetProtocolAbsolute
    // generator.fs.delete(sourcePath)
    return fs.promises.rm(sourcePath, { recursive: true, force: true })
}
