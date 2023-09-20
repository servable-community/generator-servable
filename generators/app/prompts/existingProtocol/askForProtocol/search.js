/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/
/**
* @param {import('yeoman-generator')} generator
* @param {Object} payload
*/

import fuzzy from 'fuzzy';
import * as dotenv from 'dotenv';
dotenv.config()

import data from './data.js';

export default async (answers, input = '') => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const options = {
                pre: '<'
                , post: '>'
                , extract: (el) => {
                    return el.id
                }
            };
            const i = fuzzy.filter(input, data, options).map((el) => {
                return el.original
            })
            resolve(i)
        }, Math.random() * 470 + 30);
    });
}
