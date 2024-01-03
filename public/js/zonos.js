"use strict";

const log = (message, type, ...additionalInfo) => {
  // if type is error and debug is false, do not log
  if (!window.Zonos.debug) {
    return;
  }
  switch (type) {
    case "warn":
      // eslint-disable-next-line no-console
      console.warn(message, ...additionalInfo);
      break;
    case "info":
      // eslint-disable-next-line no-console
      console.info(message, ...additionalInfo);
      break;
    default:
      // eslint-disable-next-line no-console
      console.groupCollapsed(message, ...additionalInfo);
      // eslint-disable-next-line no-console
      console.trace();
      // eslint-disable-next-line no-console
      console.groupEnd();
      break;
  }
};

const logError = (message, ...rest) => {
  // eslint-disable-next-line no-console
  console.error(message, ...rest);
};

/* eslint-disable no-console */
/** Loading stripe script extracted from stripe.js repository  */
const V3_URL = "https://js.stripe.com/v3";
const V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
const EXISTING_SCRIPT_MESSAGE =
  "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
const zonosStripeFindScript = () => {
  const scripts = document.querySelectorAll(`script[src^="${V3_URL}"]`);
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    if (!script) {
      continue;
    }
    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
let stripePromise$1 = null;
const injectScript = (params) => {
  const queryString =
    params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
  const script = document.createElement("script");
  script.src = `${V3_URL}${queryString}`;
  const headBody = document.head || document.body;
  if (!headBody) {
    logError(
      "Expected document.body not to be null. Stripe.js requires a <body> element."
    );
    return null;
  }
  headBody.appendChild(script);
  return script;
};
const zonosStripeLoadScript = (params) => {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise$1 !== null) {
    return stripePromise$1;
  }
  stripePromise$1 = new Promise((resolve, reject) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      let script = zonosStripeFindScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }
      script === null || script === void 0
        ? void 0
        : script.addEventListener("load", () => {
            if (window.Stripe) {
              resolve(window.Stripe);
            } else {
              reject(new Error("Stripe.js not available"));
            }
          });
      script === null || script === void 0
        ? void 0
        : script.addEventListener("error", () => {
            reject(new Error("Failed to load Stripe.js"));
          });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise$1;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registerWrapper = (stripe, startTime) => {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({ name: "stripe-js", startTime });
};
const initStripe = (maybeStripe, args, startTime) => {
  if (maybeStripe === null) {
    return null;
  }
  const stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
};

// Execute our own script injection after a tick to give users time to do their
// own script injection.
const stripePromise = Promise.resolve().then(() => zonosStripeLoadScript(null));
let loadCalled = false;
stripePromise.catch((err) => {
  if (!loadCalled) {
    // eslint-disable-next-line no-console
    console.warn(err);
  }
});
const zonosLoadStripe = async (...args) => {
  loadCalled = true;
  const startTime = Date.now();
  return stripePromise.then((maybeStripe) =>
    initStripe(maybeStripe, args, startTime)
  );
};

var _a;
// 3 hours
const EXPIRED_QA_TIME = 3 * 60 * 60 * 1000;
// validate the time format (yyyymmddhhmmss) in the qa params if exceeds 1 hour, don't use qa
const isZonosQa = (() => {
  const zonosQaTime = window.location.search.match(/\?.*(&*)zonosQa=(\d+)/);
  if (!zonosQaTime) {
    return false;
  }
  const [, , zonosQaTimeExtracted] = zonosQaTime;
  if (!zonosQaTimeExtracted) {
    return false;
  }
  const zonosQaTimeValue = parseInt(zonosQaTimeExtracted, 10);
  const now = new Date();
  const nowTime = now.getTime();
  const isValid = nowTime - zonosQaTimeValue < EXPIRED_QA_TIME;
  if (isValid) {
    // Zonos class is not available in here yet, so we use console.warn instead of log util
    // eslint-disable-next-line no-console
    console.warn(
      `[ZONOS-WARNING] USING DEBUG DOMAIN, THIS IS ONLY FOR ZONOS DEVELOPER TO DEBUG, PLEASE REMOVE zonosQa=xxx OUT OF URL IF YOU DON'T KNOW WHAT YOU'RE DOING`
    );
  } else {
    // Zonos class is not available in here yet, so we use console.warn instead of log util
    // eslint-disable-next-line no-console
    console.warn(
      `[ZONOS-WARNING] QA DOMAIN IS EXPIRED, USING PRODUCTION DOMAIN NOW`
    );
    // remove the zonosQa param from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete("zonosQa");
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }
  return isValid;
})();
const ZONOS_URL = isZonosQa
  ? "https://debug.js.zonos.com"
  : "https://v1.2.4-alpha.4.js.zonos.com";
const UNPKG_ZONOS_URL = "https://unpkg.com/@zonos/elements@1.2.3";
const INTER_FONT_URL = "https://rsms.me";
const INTER_FONT_REGEX = /^https:\/\/rsms\.me\/inter\/inter\.css(.*)$/;
class Zonos {}
_a = Zonos;
Zonos.doneInit = false;
// if query 'zonosDebug=1' param from url, debug mode is on
Zonos.debug = !!window.location.search.match(/\?.*(&*)zonosDebug=1/);
Zonos.isBigCommerce = false;
Zonos.internationalHideSelector = "";
Zonos.version = `v${"1.2.3"}`;
Zonos.getCurrentTimestamp = () => new Date().getTime();
Zonos.init = async ({
  appearance,
  checkoutSettings,
  currencyConverter,
  helloSettings,
  zonosApiKey,
}) => {
  if (Zonos.doneInit) {
    // do nothing if zonos is already initializeds
    return;
  }
  log(`====== ZONOS DEBUG MODE: on (${_a.version}) ======`);
  if (!zonosApiKey) {
    logError("Missing Zonos API key");
    return;
  }
  _a.zonosApiKey = zonosApiKey;
  log("init zonos");
  // inject zonos cdn
  Zonos.injectZonosCdn();
  // inject css for zonos elements
  Zonos.injectZonosCss();
  // inject fonts for zonos elements
  Zonos.injectFonts();
  // init zonos controller
  Zonos.injectController({
    config: {
      appearance,
      checkoutSettings,
      currencyConverter,
      helloSettings,
    },
    zonosApiKey,
  });
  Zonos.doneInit = true;
};
Zonos.displayCurrency = () => {
  const zonosHello = document.querySelector("zonos-hello");
  if (zonosHello) {
    void zonosHello.displayCurrency();
  }
};
Zonos.showNotification = (notification) => {
  const zonosController = document.querySelector("zonos-controller");
  void (zonosController === null || zonosController === void 0
    ? void 0
    : zonosController.showNotification(notification));
};
Zonos.disablePlaceOrderButtons = ({
  autoEnable = true,
  disable,
  placeOrderButtonSelector,
}) => {
  // if placeOrderAnchor is passed in the config for checkoutSettings, disable the place order button until zonos is initialized
  if (placeOrderButtonSelector) {
    const placeOrderButton = document.querySelectorAll(
      placeOrderButtonSelector
    );
    const disableEvent = (e) => {
      const target = e.target;
      // prevent default and propagation when the item has disabled attribute
      if (target.getAttribute("disabled")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    placeOrderButton.forEach((button) => {
      if (disable) {
        button.setAttribute("disabled", "true");
        // prevent the selector to perform default action when it's disabled
        button.addEventListener("click", disableEvent);
      } else {
        button.removeAttribute("disabled");
        // clean up the event listener
        button.removeEventListener("click", disableEvent);
      }
    });
    // only auto enable if autoEnable is true and we are setting button disable
    if (autoEnable && disable) {
      setTimeout(() => {
        // release it if zonos is not initialized after 5 seconds (this is to prevent the place order button from being disabled forever due to api)
        placeOrderButton.forEach((button) => {
          button.removeAttribute("disabled");
          // clean up the event listener if exists
          button.removeEventListener("click", disableEvent);
        });
      }, 5000);
    }
  }
};
Zonos.injectController = ({ config, zonosApiKey }) => {
  var _b;
  if (document.querySelector("zonos-controller")) {
    return;
  }
  // if placeOrderAnchor is passed in the config for checkoutSettings, disable the place order button until zonos is initialized
  if (
    (_b = config.checkoutSettings) === null || _b === void 0
      ? void 0
      : _b.placeOrderButtonSelector
  ) {
    const placeOrderButtonSelector =
      config.checkoutSettings.placeOrderButtonSelector;
    _a.disablePlaceOrderButtons({
      disable: true,
      placeOrderButtonSelector,
    });
  }
  const zonosController = document.createElement("zonos-controller");
  zonosController.config = config;
  zonosController.zonosApiKey = zonosApiKey;
  zonosController.addEventListener("stripeInitEvent", async (event) => {
    const { detail } = event;
    log("loading Stripe");
    const stripe = await zonosLoadStripe(detail.publishableKey);
    if (!stripe) {
      logError("API seems to be invalid or missing. Failed to load Stripe");
      return;
    }
    window.Zonos.stripe = stripe;
    void zonosController.initCheckoutElement(stripe);
  });
  document.body.appendChild(zonosController);
  // eslint-disable-next-line no-console
  log("Zonos controller injected!");
};
Zonos.injectScript = ({
  fallBackDomain,
  isModule,
  scriptDomain,
  theRestUrl,
}) => {
  const fullScriptUrl = `${scriptDomain}/${theRestUrl}`;
  const findScript = () => {
    const script = document.querySelector(`script[src="${fullScriptUrl}"]`);
    return !!script;
  };
  if (findScript()) {
    // eslint-disable-next-line no-console
    log(
      `Zonos script "${fullScriptUrl}" already exists in the document`,
      "warn"
    );
    return;
  }
  const headOrBody = document.head || document.body;
  // init zonos elements when the zonosKey is valid
  // inject esmodule cdn for zonos elements
  const script = document.createElement("script");
  if (!!isModule) {
    script.type = "module";
  } else {
    script.noModule = true;
  }
  script.src = fullScriptUrl;
  script.onerror = () => {
    // only fallback if the stylesheetDomain is versioned. (https://v1.2.3.something.com || https://v1.something.com)
    const isVersioned = /\/\/v\d+\./g.test(scriptDomain);
    if (!isVersioned) {
      log("No need to fallback since this is not a versioned domain", "warn");
      return;
    }
    if (fallBackDomain) {
      _a.injectScript({
        isModule,
        scriptDomain: fallBackDomain,
        theRestUrl,
      });
    }
    logError(`Failed to load ${script.src}`);
  };
  headOrBody.appendChild(script);
};
Zonos.injectZonosCdn = () => {
  // init zonos elements when the zonosKey is valid
  // inject esmodule cdn for zonos elements
  _a.injectScript({
    fallBackDomain: UNPKG_ZONOS_URL,
    isModule: true,
    scriptDomain: ZONOS_URL,
    theRestUrl: "dist/zonos-elements/zonos-elements.esm.js",
  });
  // inject non module cdn for zonos elements
  _a.injectScript({
    fallBackDomain: UNPKG_ZONOS_URL,
    isModule: false,
    scriptDomain: ZONOS_URL,
    theRestUrl: "dist/zonos-elements/zonos-elements.js",
  });
  // eslint-disable-next-line no-console
  log("Zonos cdn script injected!");
};
Zonos.injectStylesheet = ({ fallBackDomain, stylesheetDomain, theRestUrl }) => {
  const headOrBody = document.head || document.body;
  // inject preconnect css for zonos elements
  const zonosCssPreconnect = document.createElement("link");
  zonosCssPreconnect.rel = "preconnect";
  zonosCssPreconnect.href = `${ZONOS_URL}/`;
  headOrBody.appendChild(zonosCssPreconnect);
  // inject css for zonos elements
  const zonosCss = document.createElement("link");
  zonosCss.rel = "stylesheet";
  zonosCss.href = `${stylesheetDomain}/${theRestUrl}`;
  zonosCss.onerror = () => {
    // only fallback if the stylesheetDomain is versioned. (https://v1.2.3.something.com || https://v1.something.com)
    const isVersioned = /\/\/v\d+\./g.test(stylesheetDomain);
    if (!isVersioned) {
      log("No need to fallback since this is not a versioned domain", "warn");
      return;
    }
    if (fallBackDomain && isVersioned) {
      _a.injectStylesheet({
        stylesheetDomain: fallBackDomain,
        theRestUrl,
      });
    }
    logError(`Failed to load ${zonosCss.href}`);
  };
  headOrBody.appendChild(zonosCss);
};
Zonos.injectZonosCss = () => {
  const findStyleLink = () => {
    return !!document.querySelector(
      `link[rel="stylesheet"][href*="/dist/zonos-elements/zonos-elements.css"]`
    );
  };
  if (findStyleLink()) {
    // eslint-disable-next-line no-console
    log("Zonos style links already injected", "warn");
    return;
  }
  // inject css for zonos elements
  _a.injectStylesheet({
    fallBackDomain: UNPKG_ZONOS_URL,
    stylesheetDomain: ZONOS_URL,
    theRestUrl: "dist/zonos-elements/zonos-elements.css",
  });
  // eslint-disable-next-line no-console
  log("Zonos style css injected!");
};
Zonos.injectFonts = () => {
  const findFont = () => {
    const links = document.querySelectorAll(
      `link[rel="stylesheet"][href^="${INTER_FONT_URL}"]`
    );
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (!link) {
        continue;
      }
      if (INTER_FONT_REGEX.test(link.href)) {
        continue;
      }
      return link;
    }
    return null;
  };
  if (findFont()) {
    // eslint-disable-next-line no-console
    log("Inter font already injected", "warn");
    return;
  }
  const headOrBody = document.head || document.body;
  // inject css for zonos elements
  const fontPreconnect = document.createElement("link");
  fontPreconnect.rel = "preconnect";
  fontPreconnect.href = INTER_FONT_URL;
  headOrBody.appendChild(fontPreconnect);
  // inject css for zonos elements
  const font = document.createElement("link");
  font.rel = "stylesheet";
  font.href = `${INTER_FONT_URL}/inter/inter.css`;
  headOrBody.appendChild(font);
  // eslint-disable-next-line no-console
  log("Zonos font injected!");
};

window.Zonos = Zonos;
