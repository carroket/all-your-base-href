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

All Your Base Href supports local subdirectory-based multi-site deployment to contexts such as http://foo.local/~username/example.com/ by default. If you are doing local development using a **.local** domain, a user directory, and a project directory, the default deployment context may suit your needs.

```javascript
"^https?://[A-Za-z0-9-.].*local(/~[^/]+/[^/]+/).*$"
```

If you wish to *override* the default deployment context, simply pass an array of deployment-context patterns into the function expression from the last line of **all-your-base-href.js**.

Find this:

```javascript
})(window.document, window.location, window.angular);
```

Then change that to something like this:
```javascript
})(window.document, window.location, window.angular, ["^http://foo.local:1337(/app/)$"]);
```

The deployment-context parameter should be an array even if you are only specifying one pattern, so don't forget those brackets.

Note the parentheses in each of the above deployment-context patterns. Those indicate subpatterns and they determine which part of each pattern match is used as its corresponding base href value.

For example, let's take another look at the default pattern:

```javascript
"^https?://[A-Za-z0-9-.].*local(/~[^/]+/[^/]+/).*$"
```

The window.location.href value for a page running at or below http://foo.local/~username/example.com/ would match that pattern, making the subpattern match "**/~username/example.com/**", which would then be used for the base href value like so:

```html
<base href="/~username/example.com/">
```

## Notes

All Your Base Href determines the current deployment context by comparing window.location.href with each successive deployment-context pattern via RexExp.prototype.exec(), so:
* Patterns will be tested in the order in which they appear in the array.
* You can use standard regular expressions as you would when working directly with JavaScript's RegExp class.

If a base element already exists, All Your Base Href will use it in place. If a base element does not already exist, one will be created and *prepended* to the document head.

If the current deployment context does not match one you have specified or the default pattern as appropriate, any base href value will be left alone and no base element will be created.

## Would it be better to let a build tool or templating engine handle this?

Those are good options to consider, but All Your Base Href can be used even if you aren't using any build tools or a templating system.

## Who made this?
All Your Base Href was made in Sacramento, California by [Brian Sexton](http://www.briansexton.com/), the clever and dashing overlord of nobody at [Carroket, Inc.](http://www.carroket.com/)
