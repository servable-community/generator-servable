# Servable Generator

> [!WARNING]
> Servable is still experimental and its api may change in the future.

![logo](/static/img/icon.png)

[![npm Package](https://img.shields.io/npm/v/generator-servable.svg?style=flat-square)](https://www.npmjs.org/package/generator-servable)
[![NPM Downloads](https://img.shields.io/npm/dm/generator-servable.svg)](https://npmjs.org/package/generator-servable)
[![Build Status](https://github.com/servable-community/generator-servable/actions/workflows/release.yml/badge.svg)](https://github.com/servable-community/generator-servable/actions/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


We have written a Yeoman generator to help get you started. We plan to add templates for most extension/customization types into this.

## Install

### Install yeoman
```bash
npm install -g yo
```
or

```bash
yarn global add yo
```

### Install the Generator

```bash
npm install -g generator-servable
```
or

```bash
yarn global add generator-servable
```

## Usage

### Run yo servable
The Yeoman generator will walk you through the steps required to create your app or protocol prompting for the required information.

To launch the generator simply type:

```bash
yo servable
```

![The command generator](/static/img/s1.png)

### Generator Output

These templates will:

* Create a base folder structure
* Template out a rough `package.json`
* Import any assets required for your app

### Command line

```
Usage:
  yo servable:app [<destination>] [options]

Generates Servable components.

Options:
  -h,   --help                      # Print the generator's options and usage
        --skip-cache                # Do not remember prompt answers                                 Default: false
        --skip-install              # Do not automatically install dependencies                      Default: false
        --force-install             # Fail on install dependencies error                             Default: false
        --ask-answered              # Show prompts for already configured options                    Default: false
  -q,   --quick                     # Quick mode, skip all optional prompts and use defaults
  -o,   --open                      # Open the generated project in Visual Studio Code
  -t,   --generatorType             # app, class, newprotocol, ejectprotocol, protocol, protocol...
  -m,   --appMasterKey              # App master key                                                 Default: MASTER_KEY_TO_CHANGE
  -j,   --appJavascriptKey          # App javascript key                                             Default: JAVASCRIPT_KEY_TO_CHANGE
  -n,   --appName                   # App name                                                       Default: No name
  -i,   --appId                     # App ID                                                         Default: no-name
  -d,   --appDescription            # App description                                                Default: A servable app
  -e,   --appEndpoint               # App endpoint                                                   Default: parse
  -d,   --appDistributionType       # App distribution type
        --appUseCache               # Use app cache                                                  Default: true
        --appUseDashboard           # Use a Servable Dashboard (recommended)                         Default: true
        --appDashboardMainPassword  # Dashboard password                                             Default: PASSWORD_TO_CHANGE
        --appDashboardPort          # Dashboard port                                                 Default: 4040
        --appDashboardMainUsername  # Dashboard username                                             Default: admin
        --appCachePort              # App cache port
        --appConfigurations         # App configuration
        --appDatabasePort           # App database port                                              Default: 27019
        --appPort                   # App port                                                       Default: 1337
        --appDatabaseType           # App database type
        --appUtilsDatabasePort      # App utils database port
        --appLiveQueryCachePort     # Livequery cache port
        --appUseLocalS3             # Use a local bucket storage (recommended)                       Default: true
        --appMinioUser              # Minio username                                                 Default: MINIO_USERNAME_TO_CHANGE
        --appMinioPassword          # Minio password                                                 Default: MINIO_PASSWORD_TO_CHANGE
        --appMinioEndpoint          # Minio endpoint                                                 Default: http://localhost:9000
        --appMinioBucket            # Minio bucket                                                   Default: primary
        --appS3ApiPort              # S3 App port                                                    Default: 9000
        --appS3UIPort               # S3 App UI port                                                 Default: 9001
  -g,   --gitInit                   # Initialize a git repository                                    Default: true
  -p,   --pkgManager                # Package manager ('npm', 'yarn' or 'pnpm')                      Default: yarn
        --license                   # License                                                        Default: standalone
        --target                    # Target
        --className                 # className
        --useAppProtocol            # Add class to app protocol
        --targetProtocol            # Target protocol
        --githubUsername            # Github username                                                Default: servable-community

Arguments:
  destination  #
    The folder to create the extension in, absolute or relative to the current working directory.
    Use '.' for the current folder. If not provided, defaults to a folder with the extension display name.
    Type: String  Required: false

Example usages:
  yo servable                       # Launch the servable yeoman prompt.
  yo servable . -a              # Generate a Servable app at the current folder
```


**Servable** is a Node JS framework built on top of Express JS and Parse Server and tailored for protocols. It provides a concise, easy to use and scalable template to get the best of Parse Server and protocols.

Servable at its core is a server template that uses the generator-servable to orchestrate the different protocols used in an application. Servable streamlines the server development by separating every "groupable" logic to be a protocol, so that it is organically extracted from the base code and possibly migrated into its own package. By doing so, Servable enforces a clear separation of concerns pattern out of the box.

Main features:
- Quick start and Plug & Play Node JS framework
- Tailored for protocols
- Schema based classes and auto-migration
- Templates for classes
- Templates for custom protocols


Just like a docker image is made to be platform agnostic, a protocol is designed to be independant from the current environment it's being used in. A protocol might depend on other protocols, but it does not need to know which application it is used for, or call any of its API.

The Servable object acts as a central orchestrator. It holds references to objects every protocol can access (for example the current express app, the Parse Server instance, etc). It can also be used to register special methods provided by protocols and that might be used by other protocols, without knowing the source protocol of the method. For example, an emailable protocol if declared in a ServableApp object will register its implementation of a **sendWithTemplate** method in Servable.Emailing. This API will be used by other protocols to send emails by following its specific specification.

## Why Servable?
At @anak we created the protocols in our Node JS + Parse server project. What was an experience to ease the backend development quickly became a good practice that helped us keep a clean codebase. They worked so well we decided to streamline their integration with the code base for future projects. We were inspired by the powerful ways NextJs improved the React experience by providing an efficient template on top of it. Yet we did not want to hide the Parse Server framework behind ours as we truly love Parse. Servable allows to tap into all the existing and upcoming Parse features and yet it dramatically simplifies the development process. A well designed Servable project will comprise almost nothing more than the actual classes and business logic of the platform, other repetitive functions and logics will use existing protocols implemented by the community or entreprise-private protocols.

## Should you use Servable?
Servable is likely a good fit for you if
- You want to group the development of your server by capacity
- You want to reuse a capacity (protocol) over different models without copying it over and over
- You want to make that capacity available throughout your organization or publish it on the web
- You are building a new platform from scratch but you don't want reinvent the wheel for the usual suspects: social interactions, versionning, data consistency over deletion

## Examples of protocols
### Followable
- Gives an object (followed) the capacity to be followed by another object (follower)
- keeps the number of followers up to date on the followed object
- creates and maintains join tables with the status of the follow relationship

[Read more](../protocolsLibrary/followable/)

### Emailable
- Gives a ServableApp the capacity to use transactional emails via a simple API that is registered via the Servable.Mailing object
- Keeps a list of email templates
- Can be used with Sendgrid as of now

[Read more](../protocolsLibrary/emailable/)

**...you love Parse Server**
There is no reason not to use Servable if you have previously used a Parse Server.

**...you care about productivity and developer experience**
Servable provides a predetermined template that sets a clear developer's guideline

## Servable in your stack
Servable comes bundled with Parse Server that sets up a working set of tables that handle users, sessions and installation. You can use it to bootstrap your platform or as a microservice that you can access through REST or GraphQL without using the _User, Session and installation tables.


## License

MIT © [servable-community](https://github.com/servable-community)



## License

[MIT](LICENSE)
