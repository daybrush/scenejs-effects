/*
Copyright (c) Daybrush
name: @scenejs/effects
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-effects.git
version: 1.0.0
*/
'use strict';

var scenejs = require('scenejs');
var utils = require('@daybrush/utils');
var keyframer$1 = require('keyframer');

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
// Scene.set("opacity", [0, 1, 0], {duration: 2});
set("opacity", [0, 1, 0], {duration: 2});

// Same
// Scene.blink({duration: 2});
blink({ duration: 2});

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
  var item = new scenejs.SceneItem({}, options);
  var length = values.length;

  for (var i = 0; i < length; ++i) {
    item.set(i / (length - 1) * 100 + "%", property, values[i]);
  }

  return item;
}
/**
 * Make a zoom in effect.
 * @memberof effects
 * @param options
 * @param {number} [options.from = 0] start zoom
 * @param {number}[options.to = 1] end zoom
 * @param {number} options.duration animation's duration
 * @example
import { zoomIn } from "@scenejs/effects";

// Scene.zoomIn({duration: 2});
zoomIn({duration: 2});

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
  var _b = _a === void 0 ? {} : _a,
      _c = _b.from,
      from = _c === void 0 ? 0 : _c,
      _d = _b.to,
      to = _d === void 0 ? 1 : _d;

  return set(["transform", "scale"], [from, to], arguments[0]);
}
/**
 * Make a zoom out effect.
 * @memberof effects
 * @param options
 * @param {number} [options.from = 1] start zoom
 * @param {number}[options.to = 0] end zoom
 * @param {number} options.duration animation's duration
 * @example
import { zoomOut } from "@scenejs/effects";
// Scene.zoomOut({ duration: 2 });
zoomOut({ duration: 2 });

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
  var _b = _a === void 0 ? {} : _a,
      _c = _b.from,
      from = _c === void 0 ? 1 : _c,
      _d = _b.to,
      to = _d === void 0 ? 0 : _d;

  return set(["transform", "scale"], [from, to], arguments[0]);
}
/**
 * Make a wipe in effect.
 * @memberof effects
 * @param options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "-100%"] start position
 * @param {number|string}[options.to = "0%"] end position
 * @param {number} options.duration animation's duration
 * @example
import { wipeIn } from "@scenejs/effects";

// Scene.wipeIn({ property: "left", duration: 2 });
wipeIn({ property: "left", duration: 2 });
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
  var _b = _a === void 0 ? {} : _a,
      _c = _b.from,
      from = _c === void 0 ? "-100%" : _c,
      _d = _b.to,
      to = _d === void 0 ? "0%" : _d,
      _e = _b.property,
      property = _e === void 0 ? "left" : _e;

  return set(property, [from, to], arguments[0]);
}
/**
 * Make a wipe out effect.
 * @memberof effects
 * @param options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "0%"] start position
 * @param {number|string}[options.to = "100%"] end position
 * @param {number} options.duration animation's duration
 * @example
import { wipeOut } from "@scenejs/effects";
// Scene.wipeOut({property: "left", duration: 2});
wipeOut({property: "left", duration: 2});
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
  var _b = _a === void 0 ? {} : _a,
      _c = _b.from,
      from = _c === void 0 ? "0%" : _c,
      _d = _b.to,
      to = _d === void 0 ? "100%" : _d,
      _e = _b.property,
      property = _e === void 0 ? "left" : _e;

  return set(property, [from, to], arguments[0]);
}
/**
 * Switch the scene from `item1` to `item2`.
 * @memberof effects
 * @param - Item that end effect
 * @param - Item that start effect
 * @param -  `transitionItem` or `transitionObject` to switch from `item1` to `item2`
 * @example
import Scene from "scenejs";
import {transition, zoomIn, fadeOut} from "@scenejs/effects";

var transitionScene = new Scene({
  "[data-transition] .target": {},
  "[data-transition] .target2": {},
}, {
  delay: 0.1,
  easing: "ease-in-out",
  selector: true,
});
Scene.transition(
  transitionScene.getItem("[data-transition] .target"),
  transitionScene.getItem("[data-transition] .target2"),
  {
    0:  [
      fadeOut({ duration: 1 }),
      zoomIn({ from: 1, to: 2, duration: 1 }),
      "opacity: 1; transform: rotate(0deg)",
    ],
    1: "opacity: 0; transform: rotate(40deg)",
  }
);
transitionScene.play();
 */

function transition(item1, item2, transitionObject) {
  var _a;

  var transitionItem = new scenejs.SceneItem();
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
 * @param options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
import { fadeIn } from "@scenejs/effects";
// Scene.fadeIn({duration: 2});
fadeIn({duration: 2});
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
  var _b = _a === void 0 ? {} : _a,
      _c = _b.from,
      from = _c === void 0 ? 0 : _c,
      _d = _b.to,
      to = _d === void 0 ? 1 : _d;

  return set("opacity", [from, to], arguments[0]);
}
/**
 * Make a fade out effect.
 * @memberof effects
 * @param options
 * @param {number} [options.from = 1] start opacity
 * @param {number}[options.to = 0] end opacity
 * @param {number} options.duration animation's duration
 * @example
import { fadeOut } from "@scenejs/effects";
// Scene.fadeOut({duration: 2});
fadeOut({duration: 2});
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
  var _b = _a === void 0 ? {} : _a,
      _c = _b.from,
      from = _c === void 0 ? 1 : _c,
      _d = _b.to,
      to = _d === void 0 ? 0 : _d;

  return set("opacity", [from, to], arguments[0]);
}
/**
 * Make a blinking effect.
 * @memberof effects
 * @param options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
import {blink} from "@scenejs/effects";
// Scene.blink({duration: 2});
blink({duration: 2});
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
  var _b = _a === void 0 ? {} : _a,
      _c = _b.from,
      from = _c === void 0 ? 0 : _c,
      _d = _b.to,
      to = _d === void 0 ? 1 : _d;

  return set("opacity", [from, to, from], arguments[0]);
}
/**
 * You can create a flip effect horizontally, vertically, or diagonally.
 * @memberof effects
 * @param options
 * @param {number} [options.x=1] - Indicates the direction and amount to be moved by the x-axis.
 * @param {number} [options.y=1] - Indicates the direction and amount to be moved by the y-axis.
 * @param {boolean} [options.backside=false] - Indicates whether to start from the back.
 * @example
import { flip } from "@scenejs/effects";

// flip({ x: 1, y: 1, backside: false })
flip()
  .setDuration(1)
  .setSelector("[data-flip] .target")
  .play();
flip({ backside: true })
  .setDuration(1)
  .setSelector("[data-flip] .target2")
  .play();
 */

function flip(_a) {
  var _b;

  var _c = _a === void 0 ? {} : _a,
      _d = _c.x,
      x = _d === void 0 ? 1 : _d,
      _e = _c.y,
      y = _e === void 0 ? 1 : _e,
      _f = _c.backside,
      backside = _f === void 0 ? false : _f;

  var item = new scenejs.SceneItem({}, arguments[0]);
  var property = "";
  var startValue = "";
  var endValue = "";
  var ratio = x && y || x ? x : y;
  var startDeg = backside ? ratio > 0 ? 180 : -180 : 0;
  var endDeg = startDeg + ratio * 180;

  if (x && y) {
    var axis = [x > 0 ? 1 : -1, y > 0 ? 1 : -1, 0, ""].join(",");
    property = "rotate3d";
    startValue = axis + startDeg + "deg";
    endValue = axis + endDeg + "deg";
  } else {
    if (x) {
      property = "rotateX";
    } else if (y) {
      property = "rotateY";
    } else {
      return item;
    }

    startValue = startDeg + "deg";
    endValue = endDeg + "deg";
  }

  item.set({
    transform: (_b = {}, _b[property] = [startValue, endValue], _b)
  });
  return item;
}
/**
 * You can create an effect that flips vertically around the x-axis.
 * @memberof effects
 * @param options
 * @param {number} [options.x=1] - Indicates the direction and amount of movement.
 * @param {boolean} [options.backside=false] - Indicates whether to start from the back.
 * @example
import { flip, flipX } from "@scenejs/effects";

// flip({ x: 1, y: 0, backside: false })
// flipX({ x: 1, backside: false })
flipX()
  .setDuration(1)
  .setSelector("[data-flipx] .target")
  .play();
flipX({ backside: true })
  .setDuration(1)
  .setSelector("[data-flipx] .target2")
  .play();
 */

function flipX(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.x,
      x = _c === void 0 ? 1 : _c,
      _d = _b.backside,
      backside = _d === void 0 ? false : _d;

  var item = flip({
    y: 0,
    x: x,
    backside: backside
  });
  item.setOptions(arguments[0]);
  return item;
}
/**
 * You can create an effect that flips horizontally around the y-axis.
 * @memberof effects
 * @param options
 * @param {number} [options.y=1] - Indicates the direction and amount of movement.
 * @param {boolean} [options.backside=false] - Indicates whether to start from the back.
 * @example
import { flip, flipY } from "@scenejs/effects";

// flip({ x: 0, y: 1, backside: false })
// flipY({ y: 1, backside: false })
flipY()
  .setDuration(1)
  .setSelector("[data-flipy] .target")
  .play();
flipY({ backside: true })
  .setDuration(1)
  .setSelector("[data-flipy] .target2")
  .play();
 */

function flipY(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.y,
      y = _c === void 0 ? 1 : _c,
      _d = _b.backside,
      backside = _d === void 0 ? false : _d;

  var item = flip({
    x: 0,
    y: y,
    backside: backside
  });
  item.setOptions(arguments[0]);
  return item;
}
/**
 * Make a shake effect.
 * @memberof effects
 * @param options
 * @param {object|string} [options.properties="transform: translateX(5px) translateY (5px) rotate(5deg)"] - The range of properties to be moved.
 * @param {number} [options.frequency=10] - frequency of shakes
 * @example
import { shake } from "@scenejs/effects";

shake()
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shake] .target")
  .play();

shake({
    properties: {
      transform: {
        // translateX: ["-5px", "5px"]
        translateX: "5px",
        translateY: ["-5px", "5px"],
        rotate: "5deg",
        // set range
        scale: [0.8, 1],
      },
    },
    frequency: 10,
  })
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shake] .target2")
  .play();
 */

function shake(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.properties,
      properties = _c === void 0 ? {
    transform: {
      translateX: ["-10px", "10px"],
      translateY: ["-10px", "10px"],
      rotate: ["-10deg", "10deg"]
    }
  } : _c,
      _d = _b.frequency,
      frequency = _d === void 0 ? 10 : _d;

  var item = new scenejs.SceneItem({}, arguments[0]);
  var frame = new scenejs.Frame(properties);
  var names = frame.getNames();
  names.forEach(function (propertyNames, i) {
    var value = frame.get.apply(frame, propertyNames);
    var start = 0;
    var end = 0;
    var unit = "";

    if (utils.isArray(value)) {
      var _a = utils.splitUnit(value[0]),
          startNumber = _a.value,
          startUnit = _a.unit;

      unit = startUnit;
      start = startNumber;
      end = utils.splitUnit(value[1]).value;
    } else {
      var _b = utils.splitUnit(value),
          valueNumber = _b.value,
          valueUnit = _b.unit;

      unit = valueUnit;
      end = Math.abs(valueNumber);
      start = -end;
    }

    item.set.apply(item, ["0%"].concat(propertyNames, ["" + (start + end) / 2 + unit]));
    item.set.apply(item, ["100%"].concat(propertyNames, ["" + (start + end) / 2 + unit]));

    for (var j = 1; j <= frequency; ++j) {
      var ratio = Math.random() * (end - start) + start;
      item.set.apply(item, [j / (frequency + 1) * 100 + "%"].concat(propertyNames, ["" + ratio + unit]));
    }
  });
  return item;
}
/**
 * Make a horizontal shake effect.
 * @memberof effects
 * @param options
 * @param {string|string[]} [options.x=["-5px", "5px"]] - range of x's movement
 * @param {number} [options.frequency=10] - frequency of shakes
 * @example
import { shake, shakeX } from "@scenejs/effects";

// shakeX({ x: ["-5px", "5px"], frequency: 10 })
shakeX()
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shakex] .target")
  .play();

shake({
    properties: {
      transform: {
        // translateX: ["-5px", "5px"]
        translateX: "5px",
      },
    },
    frequency: 10,
  })
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shakex] .target2")
  .play();
 */

function shakeX(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.x,
      x = _c === void 0 ? ["-5px", "5px"] : _c,
      _d = _b.frequency,
      frequency = _d === void 0 ? 10 : _d;

  var item = shake({
    properties: {
      transform: {
        translateX: x
      }
    },
    frequency: frequency
  });
  item.setOptions(arguments[0]);
  return item;
}
/**
 * Make a vertical shake effect.
 * @memberof effects
 * @param options
 * @param {string|string[]} [options.y=["-5px", "5px"]] - range of y's movement
 * @param {number} [options.frequency=10] - frequency of shakes
 * @example
import { shake, shakeY } from "@scenejs/effects";

// shakeY({ y: ["-5px", "5px"], frequency: 10 })
shakeY()
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shakey] .target")
  .play();

shake({
    properties: {
      transform: {
        // translateY: ["-5px", "5px"]
        translateY: "5px",
      },
    },
    frequency: 10,
  })
  .setDuration(0.2)
  .setIterationCount("infinite")
  .setSelector("[data-shakey] .target2")
  .play();
 */

function shakeY(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.y,
      y = _c === void 0 ? ["-5px", "5px"] : _c,
      _d = _b.frequency,
      frequency = _d === void 0 ? 10 : _d;

  var item = shake({
    properties: {
      transform: {
        translateY: y
      }
    },
    frequency: frequency
  });
  item.setOptions(arguments[0]);
  return item;
}
/**
 * Make the CSS Keyframes Playable Animator(SceneItem).
 * @see {@link https://github.com/daybrush/keyframer}
 * @param - The name of the keyframes(`CSSKeyframes​Rule`) in the stylesheet(`CSSStyleSheet`).
 * @param - SceneItem's options
 * @memberof effects
 * @example
`@keyframes keyframes {
    0%, 7.69% {
      border-width:35px;
      transform: translate(-50%, -50%) scale(0);
    }
    84.61% {
      border-width: 0px;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      border-width: 0px;
      transform: translate(-50%, -50%) scale(1);
    }
}`

import { keyframer } from "@scenejs/effects";

keyframer("keyframes", {
    duration: 1,
    iterationCount: "infinite",
    selector: ".rect",
}).play();
 */

function keyframer(name, options) {
  return new scenejs.SceneItem(keyframer$1.getKeyframes(name), options);
}
/**
 * Create a frame that moves the origin in the opposite direction as it moves through the transform.
 * @memberof effects
 * @param options
 * @param {string|string[]} [options.leftProperty=["transform", "translateX"]] - Property name corresponding to left
 * @param {string|string[]} [options.topProperty=["transform", "translateY"]] - Property name corresponding to top
 * @param {string|number} [options.left="0px"] - Numbers to move horizontally
 * @param {string|number} [options.top="0px"] - Numbers to move vertically
 * @example
import { SceneItem } from "scenejs";
import { kineticFrame } from "@scenejs/effects";

new SceneItem({
    0: kineticFrame({ left: "0px", top: "0px" }).set({ transform: "rotate(0deg)"}),
    1: kineticFrame({ left: "50px", top: "0px" }).set({ transform: "rotate(90deg)"}),
    2: kineticFrame({ left: "50px", top: "50px" }).set({ transform: "rotate(180deg)"}),
    3: kineticFrame({ left: "0px", top: "50px" }).set({ transform: "rotate(270deg)"}),
    4: kineticFrame({ left: "0px", top: "0px" }).set({ transform: "rotate(360deg)"}),
}).setSelector(".target").play();
 */

function kineticFrame(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.leftProperty,
      leftProperty = _c === void 0 ? ["transform", "translateX"] : _c,
      _d = _b.topProperty,
      topProperty = _d === void 0 ? ["transform", "translateY"] : _d,
      _e = _b.left,
      left = _e === void 0 ? "0px" : _e,
      _f = _b.top,
      top = _f === void 0 ? "0px" : _f;

  var frame = new scenejs.Frame();
  frame.set.apply(frame, [].concat(leftProperty).concat([left]));
  frame.set.apply(frame, [].concat(topProperty).concat([top]));
  frame.set("transform-origin", "calc(50% - " + left + ") calc(50% - " + top + ")");
  return frame;
}
/**
 * Make a typing effect that is typed one character at a time like a typewriter.
 * The `html` property only works with javascript animations.
 * The `content` property of CSS animations works only on desktop Chrome.
 * @memberof effects
 * @param options
 * @param {string|string[]} [options.property=["html"]] - Property to apply the typing animation
 * @param {string} [options.text=""] - Text to type
 * @param {number} [options.start=0] - Index to start typing
 * @param {number} [options.end=0] - Index to end typing
 * @param {number} [options.prefix=""] - The prefix string to be attached before text
 * @param {number} [options.suffix=""] - The suffix string to be attached after text

 * @example
import { typing } from "@scenejs/effects";

typing({ text: "Make a typing effect with Scene.js."})
  .setDuration(7)
  .setSelector(".target")
  .play();
 */

function typing(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.property,
      property = _c === void 0 ? ["html"] : _c,
      _d = _b.text,
      text = _d === void 0 ? "" : _d,
      _e = _b.start,
      start = _e === void 0 ? 0 : _e,
      _f = _b.end,
      end = _f === void 0 ? text.length : _f,
      _g = _b.prefix,
      prefix = _g === void 0 ? "" : _g,
      _h = _b.suffix,
      suffix = _h === void 0 ? "" : _h;

  var properties = [].concat(property);
  var item = new scenejs.SceneItem();
  var length = Math.abs(end - start) + 1;

  if (start < end) {
    for (var i = start; i <= end; ++i) {
      item.set.apply(item, [(i - start) / length * 100 + "%"].concat(properties, ["" + prefix + text.substring(start, i) + suffix]));
    }
  } else {
    for (var i = end; i <= start; ++i) {
      item.set.apply(item, [(i - end) / length * 100 + "%"].concat(properties, [prefix + "text.substring(end, start + end - i)" + suffix]));
    }
  }

  item.setOptions(arguments[0]);
  return item;
}

exports.blink = blink;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.flip = flip;
exports.flipX = flipX;
exports.flipY = flipY;
exports.keyframer = keyframer;
exports.kineticFrame = kineticFrame;
exports.shake = shake;
exports.shakeX = shakeX;
exports.shakeY = shakeY;
exports.transition = transition;
exports.typing = typing;
exports.wipeIn = wipeIn;
exports.wipeOut = wipeOut;
exports.zoomIn = zoomIn;
exports.zoomOut = zoomOut;
//# sourceMappingURL=effects.cjs.js.map
