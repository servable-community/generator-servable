export default [
    {
        "id": "pageable",
        "name": "Pageable",
        "version": "0.0.1",
        "description": "Adds pageing capacity to a Servable app",
        "packages": [
            {
                "id": "@servable-community/pageable-parse-server",
                "description": "",
                "type": "main",
                "components": ["server"],
                "url": "https://github.com/servable-community/pageable-parse-server.git"
            },
            {
                "id": "@servable-community/pageable-parse-classes",
                "description": "",
                "type": "classes",
                "components": ["server"]
            },
        ],
        "author": {
            "name": "Servable Community",
            "email": "servableapp@gmail.com",
            "url": "https://anak.io/doucoure"
        },
        "keywords": [
            "node",
            "protocols",
            "servable",
            "yeoman-generator"
        ],
        "repository": {
            "type": "git",
            "url": "https://github.com/servable-community/generator-servable.git"
        },
        "bugs": {
            "url": "https://github.com/servable-community/generator-servable/issues"
        },
        "main": "./generators/app/index.js",
        "homepage": "http://servable.app",
        "license": "MIT",
        "engines": {
            "node": ">=14.15.0"
        },
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
        "declaration": {
            "template": {
                "id": "pageable",
                "name": "pageable",
                "slug": "pg",
                // module: {
                //     '@servable-community/publishable-parse-server': '*'
                // },
                // version: '*',
                "params": {
                    "apiKey": "<%= apiKey %>",
                    "liveClasses": ["publishable"],
                    "schema": {
                        "restrictSecurity": true
                    }
                }
            },
            "parameters": [
                {
                    "id": "apiKey",
                    "prompt": {
                        "type": "input",
                        "name": "API Key",
                        "message": "API Key",
                        "default": "",
                        "validator": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
            ]
        },

    },
    {
        "id": "emailable",
        "name": "Emailable",
        "version": "0.0.1",
        "description": "Adds email capacity to a Servable app",
        "packages": [
            {
                "id": "@servable-community/emailable",
                "description": "",
                "type": "main",
                "components": ["server"],
                "url": "https://github.com/servable-community/emailable-parse-server.git"
            }
        ],
        "author": {
            "name": "Servable Community",
            "email": "servableapp@gmail.com",
            "url": "https://anak.io/doucoure"
        },
        "keywords": [
            "node",
            "protocols",
            "servable",
            "yeoman-generator"
        ],
        "repository": {
            "type": "git",
            "url": "https://github.com/servable-community/generator-servable.git"
        },
        "bugs": {
            "url": "https://github.com/servable-community/generator-servable/issues"
        },
        "main": "./generators/app/index.js",
        "homepage": "http://servable.app",
        "license": "MIT",
        "engines": {
            "node": ">=14.15.0"
        },
        "email": "servableapp@gmail.com",
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
        "declaration": {
            "template": {
                "id": 'emailable',
                "name": 'emailable',
                "slug": 'em',
                "params": {
                    "apiKey": "<%= apiKey %>",
                    "frontWebUrl": "<%= frontWebUrl %>",
                    "env": process.env.NODE_ENV,
                    "appName": process.env.SERVABLE_APP_NAME,
                    "restrictSend": "<%= restrictSend %>",
                    "restrictTo": "<%= restrictTo %>",
                    "restrictToRegex": "<%= restrictToRegex %>",
                    "schema": {
                        "exclude": false
                    }
                }
            },
            "parameters": [
                {
                    "id": "apiKey",
                    "prompt": {
                        "type": "input",
                        "name": "API Key",
                        "message": "API Key",
                        "default": "",
                        "validator": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "frontWebUrl",
                    "prompt": {
                        "type": "input",
                        "message": "Front Web Url",
                        "default": "",
                        "validator": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "restrictSend",
                    "prompt": {
                        "type": "input",
                        "message": "Restrict send",
                        "default": "",
                        "validator": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "restrictTo",
                    "prompt": {
                        "type": "input",
                        "message": "Restrict to",
                        "default": "",
                        "validator": {
                            "type": "",
                            "params": {}
                        }
                    }
                },
                {
                    "id": "restrictToRegex",
                    "prompt": {
                        "type": "input",
                        "message": "Restrict to Regex",
                        "default": "",
                        "validator": {
                            "type": "",
                            "params": {}
                        }
                    }
                }
            ]
        },
    },
    {
        "id": "slugable",
        "name": "Slugable",
        "packages": [
            {
                "id": "@servable-community/slugable",
                "description": "",
                "type": "main"
            }
        ],
        "author": "Servable Community",
        "email": "servableapp@gmail.com",
        "description": "Adds slug capacity to a Servable app",
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
    }
]
