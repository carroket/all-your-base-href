/*============================================================================*\
	   ___   ____  __  __                ___                 __ __        ___
	  / _ | / / /  \ \/ /__  __ ______  / _ )___ ____ ___   / // /______ / _/
	 / __ |/ / /    \  / _ \/ // / __/ / _  / _ `(_-</ -_) / _  / __/ -_) _/
	/_/ |_/_/_/     /_/\___/\_,_/_/   /____/\_,_/___/\__/ /_//_/_/  \__/_/

	All Your Base Href, a Minor Context-Awareness Script
	-----------------------------------------------------------------------
	© 2015 by Carroket, Inc.
	http://www.carroket.com/
	-----------------------------------------------------------------------
	Made by Brian Sexton.
	http://www.briansexton.com/
	-----------------------------------------------------------------------
	MIT License

\*============================================================================*/

(function(document, location, angular, options) {

	var allYourBaseHref = new AllYourBaseHref();

	function AllYourBaseHref() {

		/* If no deployment contexts were specified, provide a sensible default
			for local subdirectory-based multi-site deployment.

			For example: http://foo.local/~username/example.com
		*/

		if (!options || !options.deploymentContexts) {

			this.deploymentContexts = [

				"^https?://[A-Za-z0-9-.].*local(/~[^/]+/[^/]+/).*$"
			];
		}

		else {

			this.deploymentContexts = options.deploymentContexts;
		}

	}

	// If AngularJS is present, register a module and do the things from that.

	if (angular) {

		angular.module("allYourBaseHref", [])

			.run(allYourBaseHref.doTheThings);
	}

	// Otherwise, just do the things.

	else {

		allYourBaseHref.doTheThings();
	}

	// Look, ma! Methods!

	AllYourBaseHref.prototype.doTheThings = function() {

		allYourBaseHref.setBaseHref(allYourBaseHref.getContextHref());
	};

	AllYourBaseHref.prototype.getContextHref = function() {

		var regEx;
		var result;

		for (var i = 0; i < this.deploymentContexts.length; i++) {

			regEx = new RegExp(this.deploymentContexts[i]);

			result = regEx.exec(location.href);

			if (result) {

				return result[1];
			}
		}
	};

	AllYourBaseHref.prototype.setBaseHref = function(href) {

		// Select the base element.

		var element = document.querySelector("head > base");

		// If no base element exists, create one.

		if (!element) {

			element = document.createElement("base");

			// Prepend the newly created base element within the head element.

			if (document.head.childElementCount > 0) {

				document.head.insertBefore(element, document.head.firstChild);
			}

			else {

				document.head.appendChild(element);
			}
		}

		// Drum roll, please!

		element.href = href;
	};

	if (options && options.namespace instanceof Object) {

		options.namespace.allYourBaseHref = allYourBaseHref;
	}

})(window.document, window.location, window.angular);