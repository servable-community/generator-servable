/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

// import localInfra from "./infrastructure/local/docker/index.js"
import generateApp from "./app/new/index.js"
import generateClass from "./class/new/index.js"
import generateProtocolLocal from "./protocol/local/new/index.js"
import generateProtocol from "./protocol/new/index.js"
import documentProtocol from "./protocol/document/index.js"
import submitProtocol from "./protocol/submit/index.js"
import ejectProtocol from "./protocol/local/eject/index.js"
import useCommunityProtocol from "./protocol/community/use/index.js"
// import forkProtocol from "./protocol/community/fork/index.js"
// import overrideProtocol from "./protocol/override/index.js"
// import validateProtocol from "./protocol/validate/index.js"

// import printSchema from "./schema/print/index.js"
// import injectProtocol from "./protocol/inject/index.js"
export default [
    generateApp,
    // localInfra,
    // (new inquirer.Separator()),
    generateClass,
    // (new inquirer.Separator()),

    generateProtocolLocal,
    documentProtocol,
    ejectProtocol,
    // injectProtocol,
    // validateProtocol,
    generateProtocol,
    useCommunityProtocol,
    submitProtocol,

    // forkProtocol,

    // overrideProtocol,
    // submitProtocol,
    // printSchema
]
