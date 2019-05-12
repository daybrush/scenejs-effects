/*
Copyright (c) 2019 Daybrush
name: @scenejs/effects
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-effects.git
version: 0.0.2
*/
import { SceneItem } from 'scenejs';

/**
 * @namespace effects
 */

/**
 * Use the property to create an effect.
 * @memberof effects
 * @private
 * @param - property to set effect
 * @param - values of 100%
 * @example
// import {set, blink} from "@scenejs/effects";
// set("opacity", [0, 1, 0], {duration: 2});
Scene.set("opacity", [0, 1, 0], {duration: 2});

// Same
Scene.blink({duration: 2});

// Same
new SceneItem({
    "0%": {
        opacity: 0,
    },
    "50%": {
        opacity: 1,
    }
    "100%": {
        opacity: 0,
    }
}, {
    duration: 2,
});
 */

function set(property, values, options) {
  var item = new SceneItem({}, options);
  var length = values.length;

  for (var i = 0; i < length; ++i) {
    item.set(i / (length - 1) * 100 + "%", property, values[i]);
  }

  return item;
}
/**
 * Make a zoom in effect.
 * @memberof effects
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 0] start zoom
 * @param {number}[options.to = 1] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {set, zoomIn} from "@scenejs/effects";
// zoomIn({duration: 2});
Scene.zoomIn({duration: 2});
// Same
new SceneItem({
    "0%": {
        "transform": "scale(0)",
    },
    "100%": {
        "transform": "scale(1)",
    }
}, {
    duration: 2,
});
 */


function zoomIn(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c;
  return set(["transform", "scale"], [from, to], arguments[0]);
}
/**
 * Make a zoom out effect.
 * @memberof effects
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 1] start zoom
 * @param {number}[options.to = 0] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {zoomOut} from "@scenejs/effects";
// zoomOut({duration: 2});
Scene.zoomOut({duration: 2});
// Same
new SceneItem({
    "0%": {
        "transform": "scale(1)",
    },
    "100%": {
        "transform": "scale(0)",
    }
}, {
    duration: 2,
});
 */

function zoomOut(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 1 : _b,
      _c = _a.to,
      to = _c === void 0 ? 0 : _c;
  return set(["transform", "scale"], [from, to], arguments[0]);
}
/**
 * Make a wipe in effect.
 * @memberof effects
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "-100%"] start position
 * @param {number|string}[options.to = "0%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {wipeIn} from "@scenejs/effects";
// wipeIn({property: "left", duration: 2});
Scene.wipeIn({property: "left", duration: 2});
// Same
new SceneItem({
    "0%": {
        "left": "-100%",
    },
    "100%": {
        "left": "0%",
    }
}, {
    duration: 2,
});
 */

function wipeIn(_a) {
  var _b = _a.from,
      from = _b === void 0 ? "-100%" : _b,
      _c = _a.to,
      to = _c === void 0 ? "0%" : _c,
      _d = _a.property,
      property = _d === void 0 ? "left" : _d;
  return set(property, [from, to], arguments[0]);
}
/**
 * Make a wipe out effect.
 * @memberof effects
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "0%"] start position
 * @param {number|string}[options.to = "100%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {wipeOut} from "@scenejs/effects";
// wipeOut({property: "left", duration: 2});
Scene.wipeOut({property: "left", duration: 2});
// Same
new SceneItem({
    "0%": {
        "left": "0%",
    },
    "100%": {
        "left": "100%",
    }
}, {
    duration: 2,
});
 */

function wipeOut(_a) {
  var _b = _a.from,
      from = _b === void 0 ? "0%" : _b,
      _c = _a.to,
      to = _c === void 0 ? "100%" : _c,
      _d = _a.property,
      property = _d === void 0 ? "left" : _d;
  return set(property, [from, to], arguments[0]);
}
/**
 * Use the property to create an effect.
 * @memberof effects
 * @param {Scene.SceneItem} item1 - Item that end effect
 * @param {Scene.SceneItem} item2 - Item that start effect
 * @param {AnimatorOptions} options
 * @param {object} options.from The starting properties of item1 and end properties of item2
 * @param {object} options.to The starting properties of item2 and end properties of item1
 * @param {number} options.duration animation's duration
 * @param {number} [options.time] start time of item1 <br/> <strong>default: item1.getDuration() - duration</strong>
 * @example
// import {transition} from "@scenejs/effects";
transition(item1, item2, {
    from: {
        opacity: 1,
    },
    to: {
        opacity: 0,
    },
    duration: 0.1,
});

// Same
item1.set({
    [item1.getDuration() - 0.1]: {
        opacity: 1,
    },
    [item1.getDuration()]: {
        opacity: 0,
    }
});
item2.set({
    0: {
        opacity: 0,
    },
    0.1: {
        opacity: 1,
    }
});
 */

function transition(item1, item2, transitionObject) {
  var _a;

  var transitionItem = new SceneItem();
  transitionItem.append(transitionObject);
  var duration = transitionItem.getDuration();
  var transitionTime = Math.max(item1.getDuration() - duration, 0);
  item1.set((_a = {}, _a[transitionTime] = transitionItem, _a));
  transitionItem.setDirection("reverse");
  item2.set({
    0: transitionItem
  });
}
/**
 * Make a fade in effect.
 * @memberof effects
 * @param {AnimatorState} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {fadeIn} from "@scenejs/effects";
// fadeIn({duration: 2});
Scene.fadeIn({duration: 2});
// Same
new SceneItem({
    "0%": {
        opacity: 0,
    },
    "100%": {
        opacity: 1,
    }
}, {
    duration: 2,
});
 */

function fadeIn(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c;
  return set("opacity", [from, to], arguments[0]);
}
/**
 * Make a fade out effect.
 * @memberof effects
 * @param {AnimatorState} options
 * @param {number} [options.from = 1] start opacity
 * @param {number}[options.to = 0] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {fadeOut} from "@scenejs/effects";
// fadeOut({duration: 2});
Scene.fadeOut({duration: 2});
// Same
new SceneItem({
    "0%": {
        opacity: 1,
    },
    "100%": {
        opacity: 0,
    }
}, {
    duration: 2,
});
 */

function fadeOut(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 1 : _b,
      _c = _a.to,
      to = _c === void 0 ? 0 : _c;
  return set("opacity", [from, to], arguments[0]);
}
/**
 * Make a blinking effect.
 * @memberof effects
 * @param {AnimatorState} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {blink} from "@scenejs/effects";
// blink({duration: 2});
Scene.blink({duration: 2});
// Same
new SceneItem({
    "0%": {
        opacity: 0,
    },
    "50%": {
        opacity: 1,
    },
    "100%": {
        opacity: 0,
    }
}, {
    duration: 2,
});
 */

function blink(_a) {
  var _b = _a.from,
      from = _b === void 0 ? 0 : _b,
      _c = _a.to,
      to = _c === void 0 ? 1 : _c;
  return set("opacity", [from, to, from], arguments[0]);
}
function shake(_a) {
  var _b = _a.horizontal,
      _c = _a.vertical,
      _d = _a.rotate;
}

export { blink, fadeIn, fadeOut, shake, transition, wipeIn, wipeOut, zoomIn, zoomOut };
//# sourceMappingURL=effects.esm.js.map
