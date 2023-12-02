/*---------------------------------------------------------
 * Copyright (C) Servable Community. All rights reserved.
 *--------------------------------------------------------*/

import inquirerPromptAutocomplete from 'inquirer-autocomplete-prompt'
import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'
// import inquirerCheckboxPlus from 'inquirer-checkbox-plus-prompt'
import inquirerParseJsonFile from 'inquirer-parse-json-file'

export default (generator) => {
    const promptModule = generator.env.adapter.promptModule ? generator.env.adapter.promptModule :
        generator.env.adapter.actualAdapter.promptModule
    promptModule.registerPrompt('autocomplete', inquirerPromptAutocomplete)
    promptModule.registerPrompt('file-tree-selection', inquirerFileTreeSelection)
    // generator.env.adapter.promptModule.registerPrompt('checkbox-plus', inquirerCheckboxPlus)
    promptModule.registerPrompt('json-file', inquirerParseJsonFile)
    // generator.env.adapter.promptModule.registerPrompt('password', inquirerPassword)
}
