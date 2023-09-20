export default [
    {
        "id": "pageable",
        "name": "Pageable",
        "version": "0.0.1",
        "description": "Adds pageing capacity to a Servable app",
        "packages": [
            {
                "id": "@yelounak/pageable-parse-server",
                "description": "",
                "type": "main",
                "components": ["server"],
                "url": "https://github.com/yelounak/pageable-parse-server.git"
            },
            {
                "id": "@yelounak/pageable-parse-classes",
                "description": "",
                "type": "classes",
                "components": ["server"]
            },
        ],
        "author": {
            "name": "Aboubacar Doucoure",
            "email": "yelounak@gmail.com",
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
            "url": "https://github.com/yelounak/generator-servable.git"
        },
        "bugs": {
            "url": "https://github.com/yelounak/generator-servable/issues"
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
                //     '@yelounak/publishable-parse-server': '*'
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
                "id": "@yelounak/emailable",
                "description": "",
                "type": "main",
                "components": ["server"],
                "url": "https://github.com/yelounak/emailable-parse-server.git"
            }
        ],
        "author": {
            "name": "Aboubacar Doucoure",
            "email": "yelounak@gmail.com",
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
            "url": "https://github.com/yelounak/generator-servable.git"
        },
        "bugs": {
            "url": "https://github.com/yelounak/generator-servable/issues"
        },
        "main": "./generators/app/index.js",
        "homepage": "http://servable.app",
        "license": "MIT",
        "engines": {
            "node": ">=14.15.0"
        },
        "email": "yelounak@gmail.com",
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
                "id": "@yelounak/slugable",
                "description": "",
                "type": "main"
            }
        ],
        "author": "Aboubacar Doucoure",
        "email": "yelounak@gmail.com",
        "description": "Adds slug capacity to a Servable app",
        "icon": "https://cdn3d.iconscout.com/3d/free/preview/free-toffee-4356774-3618919.png?f=avif&h=1400",
    }
]
