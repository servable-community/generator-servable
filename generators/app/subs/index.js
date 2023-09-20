/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

// import localInfra from "./infrastructure/local/docker/index.js"
import generateApp from "./app/full/index.js"
import generateClass from "./class/new/index.js"
import generateProtocol from "./protocol/new/index.js"
import ejectProtocol from "./protocol/eject/index.js"
import addProtocol from "./protocol/add/index.js"
import forkProtocol from "./protocol/fork/index.js"
// import overrideProtocol from "./protocol/override/index.js"
import validateProtocol from "./protocol/validate/index.js"

import printSchema from "./schema/print/index.js"
import injectProtocol from "./protocol/inject/index.js"
export default [
    generateApp,
    // localInfra,
    // (new inquirer.Separator()),
    generateClass,
    // (new inquirer.Separator()),
    generateProtocol,
    validateProtocol,
    addProtocol,
    ejectProtocol,
    injectProtocol,
    forkProtocol,
    // overrideProtocol,
    // submitProtocol,
    printSchema
]
