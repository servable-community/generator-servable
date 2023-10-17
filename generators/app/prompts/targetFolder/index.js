/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
// import getServablePackage from "./lib/getServablePackage.js"
import drawSectionHeader from "../../lib/draw/drawSectionHeader.js"

export default async (props) => {
    const { generator, payload,
    } = props

    drawSectionHeader({
        generator,
        title: `CHOOSE FOLDER 🚀`,
        subTitle: `Choose the folder in your filesystem.`
    })

    const res = (await generator.prompt({
        type: "file-tree-selection",
        name: "target",
        message: "Choose the folder in your filesystem",
        onlyShowDir: true,
        enableGoUpperDirectory: true,
        // root: `..`,
        // onlyShowValid: true,
        hideRoot: false,
    })).target

    payload.targetFolder = res
}
