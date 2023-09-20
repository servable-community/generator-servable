/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

import * as dotenv from 'dotenv'
import search from './search.js'
import getById from './getById.js'
dotenv.config()

export default async (props) => {
    const { generator, payload } = props
    const u = process.env.PROTOCOL_API_URI

    const id = (await generator.prompt({
        type: 'autocomplete',
        name: 'existingProtocol',
        suggestOnly: false,
        message: 'Existing protocol?',
        searchText: 'Searching...',
        emptyText: 'Nothing found!',
        // default: 'Banana',
        source: search,
        pageSize: 4,
        validate(val) {
            return val ? true : 'Type something!'
        },
        transformer: (name,) => {
            if (!name) {
                return name
            }

            return name
        }
    },)).existingProtocol

    const item = await getById({ id })
    payload.existingProtocol = item
}
