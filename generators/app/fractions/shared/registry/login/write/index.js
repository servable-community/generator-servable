/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/
import { fileURLToPath } from "url"
import { dirname } from "path"

export default async (props) => {

    const { generator, payload, } = props
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)


}

