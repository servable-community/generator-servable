/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/


import askForPackageManager from "./askForPackageManager.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"


export default async (props) => {
    const { generator, payload, options: { force = false } = {} } = props
    if (!force && payload.asks.packageManager) {
        return
    }

    drawSectionHeader({
        generator,
        title: `PACKAGE MANAGER 🧳`,
        subTitle: `Package manager for the project.`
    })

    await askForPackageManager(props)
    payload.asks.packageManager = true
}
