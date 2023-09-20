/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import inquirerPromptAutocomplete from 'inquirer-autocomplete-prompt'
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'
import inquirerCheckboxPlus from 'inquirer-checkbox-plus-prompt'
import inquirerParseJsonFile from 'inquirer-parse-json-file'

export default (generator) => {
    generator.env.adapter.promptModule.registerPrompt('autocomplete', inquirerPromptAutocomplete)
    generator.env.adapter.promptModule.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
    generator.env.adapter.promptModule.registerPrompt('checkbox-plus', inquirerCheckboxPlus)
    generator.env.adapter.promptModule.registerPrompt('json-file', inquirerParseJsonFile)
}
