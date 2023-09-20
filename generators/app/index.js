/*---------------------------------------------------------
 * Copyright (C) Anak. All rights reserved.
 *--------------------------------------------------------*/

import Generator from "yeoman-generator"
import path from "path"
import generators from "./subs/index.js"

import options from "./options.js"
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import welcome from "./prompts/welcome/index.js"
import registerInquirers from "./registerInquirers.js"
const __dirname = dirname(fileURLToPath(import.meta.url))

export default class extends Generator {
    constructor(args, opts) {
        super(args, opts)
        registerInquirers(this)

        this.description = 'Generates Servable components.'
        // const stored = this.config.getAll()
        this.argument('destination', {
            type: String,
            required: false,
            description: `\n    The folder to create the extension in, absolute or relative to the current working directory.\n    Use '.' for the current folder. If not provided, defaults to a folder with the extension display name.\n  `
        })

        Object.keys(options).forEach(key => {
            this.option(key, options[key])
        })

        this.payload = { asks: {} }
        this.payload.installDependencies = false
        this.currentGenerator = undefined
        this.abort = false
    }

    async initializing() {
        this.originalDestinationPath = this.destinationPath()
        const destination = this.options['destination']
        if (destination) {
            const folderPath = path.resolve(this.destinationPath(), destination)
            this.destinationRoot(folderPath)
        }
    }

    async prompting() {
        await welcome({
            generator: this,
            payload: this.payload,
            generators
        })

        this.currentGenerator = generators.find(g => g.id === this.payload.type)
        if (!this.currentGenerator) {
            this.abort = true
            return
        }

        try {
            await this.currentGenerator.prompting({ generator: this, payload: this.payload })
        } catch (e) {
            this.abort = true
        }
    }

    configuring() {
        // // creating new variables
        // const { name } = this.options;
        // const title = `ms-${name.toLowerCase()}`; // will output as "ms-example"

        // // combining user data
        // this.answers = {
        //   ...this.config.getAll(), // getting saved config data
        //   ...this.answers,
        //   name,
        //   title,
        // };
        const gkey = this.payload.type
        let struct = this.config.get(gkey) ? this.config.get(gkey) : {}

        // saving to config file
        // this._updateConfig()
    }

    async writing() {
        if (this.abort) {
            return
        }

        this._updateDestination()
        this._updateSource()



        this.log()
        this.log(`Writing in ${this.destinationPath()}`)

        await this.currentGenerator.writing({
            generator: this,
            payload: this.payload,
            updateDestination: this._updateDestination.bind(this),
            updateSource: this._updateSource.bind(this),
        })
    }

    install() {
        if (this.abort) {
            this.env.options.skipInstall = true
            return
        }

        if (this.payload.installDependencies) {
            this.env.options.nodePackageManager = this.payload.pkgManager
        } else {
            this.env.options.skipInstall = true
        }
    }

    async end() {
        if (this.abort) {
            return
        }

        this._updateConfig()

        if (this.currentGenerator.end) {
            await this.currentGenerator.end({ generator: this, payload: this.payload })
        }
    }
    _updateConfig() {
        const gkey = this.payload.type
        let struct = this.config.get(gkey) ? this.config.get(gkey) : {}
        Object.keys(this.payload).forEach(key => {
            if (key === 'asks') {
                return
            }
            struct[key] = this.payload[key]
        })
        this.config.set(gkey, {
            ...struct,
            metadata: {
                ...(struct.metadata ? struct.metadata : {}),
                version: this.currentGenerator.version,
                updatedAt: (new Date())
            }
        })
        const n = this.payload.doubleDestination
            ? `${this.payload.doubleDestination}/.yo-rc.json`
            : this.destinationPath('.yo-rc.json')
        // _.set(this.config._store, path);

        this.config.path = n
        // console.log(this.config.path)
    }
    // _updateConfig() {
    //     const key = this.payload.type
    //     // let struct = this.config.get(key) ? this.config.get(key) : {}
    //     Object.keys(this.payload).forEach(key => {
    //         if (key === 'asks') {
    //             return
    //         }
    //         this.config.set(key, this.payload[key])
    //     })
    //     this.config.path = this.payload.doubleDestination
    //         ? `${this.payload.doubleDestination}/.yo-rc.json`
    //         : this.destinationPath('.yo-rc.json')
    // }
    _updateSource(destination) {
        if (destination) {
            this.sourceRoot(destination)
            return
        }

        const source = path.join(__dirname, './subs/' + this.currentGenerator.path + '/template')
        this.sourceRoot(source)
    }

    _updateDestination(destination) {
        if (destination) {
            this.destinationRoot(destination)
            return
        }

        const desiredWriteDestinationPath = this.payload.desiredWriteDestinationPath
        const desiredWriteDestinationPathAbsolute = this.payload.desiredWriteDestinationPathAbsolute
        if (desiredWriteDestinationPathAbsolute) {
            this.destinationRoot(desiredWriteDestinationPathAbsolute)
        }
        else if (desiredWriteDestinationPath) {
            const folderPath = path.resolve(this.destinationPath(), desiredWriteDestinationPath)
            this.destinationRoot(folderPath)
        } else if (!this.options['destination'] && !this.currentGenerator.update && this.payload.appName) {
            this.destinationRoot(this.destinationPath(this.payload.appName))
        }
        this.env.cwd = this.destinationPath()
    }
}
