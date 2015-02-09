# All Your Base Href

**A Minor Context-Awareness Script**

## Overview

All Your Base Href eliminates the need to manually change base href values when moving between deployment contexts for which different base href values are required.

For example, if you are using [AngularJS](http://angularjs.org/) to develop a single-page application and trying to convince the [ngRoute](https://docs.angularjs.org/api/ngRoute) module and the [$location](https://docs.angularjs.org/guide/$location) service to use clean, hash-free URLs, you may discover that you need to specify different base href values for your local development environment and your production server like so:

```html
<!-- http://foo.local/~username/example.com/ -->
<base href="/~username/example.com/">
```

```html
<!-- http://example.com/ -->
<base href="/">
```
With All Your Base Href, you can configure as many deployment contexts as you need then have your base href values set automatically at runtime.

You can use All Your Base Href with or without AngularJS.

## Usage

### Deployment

First, place **all-your-base-href.js** somewhere sensible like an AngularJS modules directory then load it in your HTML like so:

```html
<script src="path/to/all-your-base-href.js"></script>
```

Next, if you are using AngularJS, tell your app module to use All Your Base Href like so:

```javascript
angular.module("yourAppModule", ["allYourBaseHref", "ngRoute"])
```

That's it! There is no user interface, so you don't need to add any other markup and there are no templates, style sheets, images, or other assets to deploy.

### Configuration

All Your Base Href supports initialization-time configuration via an options object containing either or both of the following properties:
* **deploymentContexts** (Array)
* **namespace** (Object)

To use an options object, simply pass it into the function expression as a fourth parameter in the call at the end of **all-your-base-href.js** or **all-your-base-href.min.js**.

Find this:

```javascript
})(window.document, window.location, window.angular);
```

Then change that to something like this:
```javascript
})(window.document, window.location, window.angular, { /* Option properties go here. */ });
```

#### Deployment Contexts

All Your Base Href supports local subdirectory-based multi-site deployment to contexts such as http://foo.local/~username/example.com/ by default. If you are doing local development using a **.local** domain, a user directory, and a project directory, the default deployment context may suit your needs.

```javascript
"^https?://[A-Za-z0-9-.].*local(/~[^/]+/[^/]+/).*$"
```

If you wish to *override* the default deployment context, simply specify an array of deployment-context patterns via the **deploymentContexts** property of the options object.

```javascript
})(window.document, window.location, window.angular, { deploymentContexts: ["^http://foo.local:1337(/app/)$"] });
```

The config **deploymentContexts** property should be an array even if you are only specifying one pattern, so don't forget those square brackets.

Note the parentheses in each of the above deployment-context patterns. Those indicate subpatterns and they determine which part of each pattern match is used as its corresponding base href value.

For example, let's take another look at the default pattern:

```javascript
"^https?://[A-Za-z0-9-.].*local(/~[^/]+/[^/]+/).*$"
```

The window.location.href value for a page running at or below http://foo.local/~username/example.com/ would match that pattern, making the subpattern match "**/~username/example.com/**", which would then be used for the base href value like so:

```html
<base href="/~username/example.com/">
```

#### Namespace

By default, All Your Base Href is encapsulated, but if you wish, it can expose a reference to itself to an object you specify via the **namespace** property of the options object.

For example, if you want a global reference to enable easy testing or tinkering from a JavaScript console, you might do something like this:

```javascript
})(window.document, window.location, window.angular, { namespace: window });
```

In that case, you would be able to access All Your Base Href via **window.allYourBaseHref**.

You may wish to consider using a custom object to hold references to any components, thereby minimizing top-level clutter. For example, you might do something like this:

```javascript
})(window.document, window.location, window.angular, { namespace: window.components = window.components || {} });
```

In that case, you would be able to access All Your Base Href via **window.components.allYourBaseHref**.

## Notes

All Your Base Href determines the current deployment context by comparing window.location.href with each successive deployment-context pattern via RexExp.prototype.exec(), so:
* Patterns will be tested in the order in which they appear in the array.
* You can use standard regular expressions as you would when working directly with JavaScript's RegExp class.

If a base element already exists, All Your Base Href will use it in place. If a base element does not already exist, one will be created and *prepended* to the document head.

If the current deployment context does not match one you have specified or the default pattern as appropriate, any base href value will be left alone and no base element will be created.

## Would it be better to let a build tool or templating engine handle this?

Those are good options to consider, but All Your Base Href can be used even if you aren't using any build tools or a templating system.

## Who made this?
All Your Base Href was made in Sacramento, California by [Brian Sexton](http://briansexton.com/), the clever and dashing overlord of nobody at [Carroket, Inc.](http://carroket.com/)
