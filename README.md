<h1 align="center">
  <img src="https://cl.ly/22c0392f37c2/newsky.png" alt="Newsky" />
</h1>

<h2 align="center">
  <img src="https://cl.ly/b7e6ec845ebe/md-subtitle.png" alt="Newsky Tagline" />
</h2>


<p align="center">
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fnypinstripes%2Fnewsky&via=nypinstripes&text=newsky%20A%20-%20news%20keyword%20search%20experiment%20&hashtags=news%20%23react%20%23interview" rel="noopener noreferrer">
    <img src="https://cl.ly/ba452d5610b9/tweet-shields.svg" alt="Tweet Newsky" />
  </a>
  <img src="https://cl.ly/480d790a560b/prs-welcome.svg" alt="Open Newsky" />
  <a href="/docs/code-of-conduct.md" rel="noopener noreferrer">
    <img src="https://cl.ly/8654c8edbc1b/conduct.svg" alt="Code of Conduct" />
  </a>
</p>

<h2></h2>

1. [Setting up Newsky](#setting-up-newsky)
1. [Application Architecture](#application-architecture)
1. [Pages & Previews](#pages-&-previews)
1. [Todos](#todos)


<a name="setting-up-newsky"></a>
## Setting up Newsky

### Prerequisites

You will need the following things properly installed on your computer.
* [Homebrew](https://github.com/Homebrew/brew)
&nbsp;(or compatible Node installing package manager, mac-ports?)

* [Node.js](http://nodejs.org/) (with Yarn or NPM)

#### Step 1: Check your node version & upgrade if needed.

```bash
$ node -v
v8.0.0 # if you see this or higher, you're good!
```

If not:

```bash
$ brew update
$ brew upgrade node
```

#### Step 2: Clone the "MyTodos" (todo-app-giant) repo & cd into the directory.

```bash
$ git clone git@github.com:nypinstripes/todo-app-giant.git
$ cd stash-search
```

#### Step 3: Install App Dependencies with yarn or npm.
The app was initialized & built using [Yarn](https://yarnpkg.com/en/), however it has been tested & confirmed to work with npm.

```bash
$ yarn install
```

or

```bash
$ npm install
```

#### Step 4: Build & Start the App (in Production Mode)
Individual build (dev/prod), test & server start commands can be found in the `scripts` hash in <a href="/package.json" rel="noopenner noreferrer">package.json</a>.

```bash
$ yarn launch
```

or

```bash
$ npm start
```

#### Step 5: Running Tests
There are a few ways to run the MyTodos test suite. Presently, only tests for renderring routes & persistant layout elements.

* `yarn/npm test` to execute the test suite in single run mode & generate Jest snapshots.
* `yarn/npm test:update` to execute the test suite in single run mode & update Jest snapshots that have changed.
* `yarn/npm test:watch` to execute the test suite in constant watch mode & update Jest snapshots as they're changed.
* `yarn/npm test:coverage` to view code coverage (lcov) & render performance reports using the built-in react tool (formerly Istanbul).

<h2></h2>

<a name="application-architecture"></a>
## Application Architecture

#### Web Backend

##### NodeJS
The runtime environment (rte) is <a href="https://nodejs.org" rel="noopener noreferrer">NodeJS</a> and was written on v11.2.0, however it should be able to run without issue on any NodeJS version higher than 8.0.0.

##### Express
The webserver is <a href="https://expressjs.com/" rel="noopener noreferrer">ExpressJS</a> as it continues to be the more popular of the choices for running web backends on Node, Hapi would be a suitable alternative.

##### Pug
The server-side markup is renderred using the PUG templating engine, which has a high degree of reliability with build tools like <a href="http://webpackjs.org" rel="noopener noreferrer">Webpack</a>.

##### UAParser
As a simple alternative to polyfilling with a library like modernizr, there's also a JS library I used called UAParserJS, which detects & extracts loads of useful info about the client machine upon the first request. With this info we can look at things like the client's user-agent to determine if their browser is among the ones that are supported.

The list of supported browsers can be found in the server helper utils file under <a href="/server/utils/helper-utils.js" rel="noopener noreferrer">agents</a>.

In addition to helper functions, <a href="https://github.com/faisalman/ua-parser-js" rel="noopener noreferrer">UAParserJS</a> also offers fine-grain access to:

```
ua,
browser: { name, version },
engine: { name, version },
os: { name, version },
device: { model, type, vendor },
cpu: { architecture }
```

### Build & Transpiler Tools

- [Webpack 4](https://webpack.js.org)

- [Babel 7](https://babeljs.io)

### Frontend Application

##### React/Redux

###### Component Architecture

<p align="left">
  <img src="https://cl.ly/2e4409815e11/components.jpg" alt="jsx structures" />
</p>

##### Sass (SCSS syntax)

###### The 7-1 Pattern

- [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [Aesthetic Sass 1: Architecture and Style Organization](https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization)

<p align="left">
  <img src="https://cl.ly/6f803b5ef8fc/%255B79158488d070f6426e433c2ae5dc225a%255D_stash-sass.jpg" alt="scss structures" />
</p>

_App Styles_

Folder           | Description
---------------- | -----------
`/base/..`       | Styles applicable globally, throughout the app, like browser resets/normalize files.
`/common/..`     | Styles for visual elements with specific classes, but do not have components attached to them (e.g., `.overlays`, `.animations`). Files should be separated by their purpose.
`/components/..` | Styles applicable to individual components (these files are appended near the end and are overridden only by vendor styles).
`/layout/..`     | Styles for standard elements that are *persistent* throughout the experience & on every page. Files should be separated by elements.
`/vendor/..`     | Styles for elements that are particular to 3rd party plugin libraries and secondary browser type & version support. These styles load last and have the highest precedence.

_Shared Sass Helpers_ `/shared/data` `/shared/scss`

Folder           | Description
---------------- | -----------
`_breakpoints`   | Definition of app wide media query breakpoint rules, logic & utility.
`_colors`        | All colors should be html named colors which can be found at [Color Names](https://htmlcolorcodes.com/color-names/) or predefined named variables sourced from the [sip](https://sipapp.io/) or [swatches](https://swatchesapp.io) OSX apps, or similar interface (based on Chirag Mehta's famous "name that color" tool), or from formal design guides except those inherent to browsers [W3 Color Names](http://www.w3schools.com/colors/colors_names.asp), which will not appear in this list. Please keep them alpha sorted, use all lower-case dasherized variable names.
`_functions`     | Sass helper functions - Things like custom short hand utilities for fonts, colors, borders etc.
`_mixins`        | Sass mixins

###### Vendor Libraries

- [Bourbon Sass](https://www.bourbon.io/docs/latest/)

- [Breakpoint Sass](http://breakpoint-sass.com/)

###### Naming Colors Resources

- [Swatches](https://swatchesapp.io)

- [Sip](https://sipapp.io/)

- [Colblindor](https://www.color-blindness.com/color-name-hue/)

- [Name That Color](http://chir.ag/projects/name-that-color/#6195ED)

##### Testing with Jest

<p align="left">
  <img src="https://cl.ly/a7ddd4a92103/tests.png" alt="jest structures" />
</p>

_Snapshots are generated using the jest testing library, at present there are only basic Route/Layout load & render tests in the suite._

<h2></h2>

<a name="pages-&-previews"></a>
## Pages & Previews

### Newsky Search

<p align="center">
  <img width="100%" valign="top" src="https://cl.ly/33963e12d396/newsky-preview.gif" alt="preview" />
</p>

<br />
<h2></h2>
<br />

#### 404

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/ab35f982af9c/not-found-large.png" alt="404" />
</p>

<br />
<h2></h2>
<br />

#### Landing

<p align="left">
  <img width="27%" valign="top" src="https://cl.ly/04f758663742/landing-mobile.png" />
  <img width="72%" valign="top" src="https://cl.ly/438d300db18b/landing-large.png" />
</p>

<br />
<h2></h2>
<br />

#### Search Results

<h4><strong>Note:</strong> Searches submit as you type, there's a 6 second debounce delay as not to make too many network requests.</h4>

<br />

<p align="left">
  <img width="27%" valign="top" src="https://cl.ly/6c75de89bcd2/results-mobile.png" />
  <img width="72%" valign="top" src="https://cl.ly/bbb55a37a39f/results-large.png" />
</p>

<br />

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/48528c15fe29/%255Be74efcb3751b7a884efb571fb274f1ab%255D_results-large-2.png" />
</p>

<br />

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/5b6234f33c88/results-xlarge.png" />
</p>

<br />

<p align="left">
  <img width="27%" valign="top" src="https://cl.ly/8b1746e9c05c/%255B7f18e73cfcf895df089e7153d782c651%255D_no-results-mobile.png" />
  <img width="72%" valign="top" src="https://cl.ly/36dd88474d09/no-results-large.png" />
</p>

<br />
<h2></h2>
<br />

#### Article Detail Overlay

<p align="left">
  <img width="27%" valign="top" src="https://cl.ly/fd13256809b1/overlay-mobile.png" />
  <img width="72%" valign="top" src="https://cl.ly/0867739e45db/overlay-large.png" />
</p>

<br />
<h2></h2>
<br />

#### Unsupported Browsers

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/69a0661cf0f3/unsupported-large.png" alt="unsupported" />
</p>

<br />
<h2></h2>
<br />

##### (Filler) Docs Pages

###### (Open) License

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/1d438016b415/license.png" alt="license" />
</p>

<br />
<h2></h2>
<br />

###### (faux) Privacy

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/5a10590eacb1/privacy.png" alt="privacy" />
</p>

<br />
<h2></h2>
<br />

###### (faux) Terms/Conditions

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/c2d7f4ab1bf1/%255B783915f3585d71d716ded01e86157352%255D_terms.png" alt="terms" />
</p>

<br />
<h2></h2>
<br />

<a name="todos"></a>
## TODOs

- [ ] On List/Grid views, remove custom pagination & add Infinite (Fetch &) Scroll, with [React-Virtualized](https://bvaughn.github.io/react-virtualized/#/components/Collection).
- [ ] Complete adding `< Prev` & `Next >` navigation controls on Article detail (ArticleOverlay) view.
- [ ] Improve truncation display method for ListItem view descriptions.
- [ ] Make navigating between articles in Article detail (ArticleOverlay) views "perma-linkable" & update url on navigating.
- [ ] Add sort & page # to results url history.
- [ ] Reduce search network requests.
- [ ] Add tap, touch & swipe controls for mobile devices.
- [ ] Add more tests & increase coverage & reliability.
- [ ] Performance (loading, updating & painting) audit, with network optimized media sizes.
- [ ] More inline Documentation!!
- [ ] Perform more x-browser/device/OS UI/UX sanity/QA checking (currently only verified with Chrome).
- [ ] Make use of some of the deeper webpack optimization features like Tree-Shaking, CommonsChunking.
- [ ] Attempt lazy component loading with System.import();
