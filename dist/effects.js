/*
Copyright (c) 2019 Daybrush
name: @scenejs/effects
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-effects.git
version: 0.0.5
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('scenejs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'scenejs'], factory) :
  (global = global || self, factory(global.Scene = global.Scene || {}, global.Scene));
}(this, function (exports, scenejs) { 'use strict';

  /*
  Copyright (c) 2018 Daybrush
  @name: @daybrush/utils
  license: MIT
  author: Daybrush
  repository: https://github.com/daybrush/utils
  @version 0.8.0
  */
  /**
  * Check the type that the value is isArray.
  * @memberof Utils
  * @param {string} value - Value to check the type
  * @return {} true if the type is correct, false otherwise
  * @example
  import {isArray} from "@daybrush/utils";

  console.log(isArray([])); // true
  console.log(isArray({})); // false
  console.log(isArray(undefined)); // false
  console.log(isArray(null)); // false
  */


  function isArray(value) {
    return Array.isArray(value);
  }
  /**
  * divide text by number and unit.
  * @memberof Utils
  * @param {string} text - text to divide
  * @return {} divided texts
  * @example
  import {splitUnit} from "@daybrush/utils";

  console.log(splitUnit("10px"));
  // {prefix: "", value: 10, unit: "px"}
  console.log(splitUnit("-10px"));
  // {prefix: "", value: -10, unit: "px"}
  console.log(splitUnit("a10%"));
  // {prefix: "a", value: 10, unit: "%"}
  */


  function splitUnit(text) {
    var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

    if (!matches) {
      return {
        prefix: "",
        unit: "",
        value: NaN
      };
    }

    var prefix = matches[1];
    var value = matches[2];
    var unit = matches[3];
    return {
      prefix: prefix,
      unit: unit,
      value: parseFloat(value)
    };
  }

  /**
   * @namespace Effects
   */

  /**
   * Use the property to create an effect.
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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
   * @memberof Effects
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

      if (isArray(value)) {
        var _a = splitUnit(value[0]),
            startNumber = _a.value,
            startUnit = _a.unit;

        unit = startUnit;
        start = startNumber;
        end = splitUnit(value[1]).value;
      } else {
        var _b = splitUnit(value),
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
   * @memberof Effects
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
   * @memberof Effects
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

  exports.blink = blink;
  exports.fadeIn = fadeIn;
  exports.fadeOut = fadeOut;
  exports.flip = flip;
  exports.flipX = flipX;
  exports.flipY = flipY;
  exports.shake = shake;
  exports.shakeX = shakeX;
  exports.shakeY = shakeY;
  exports.transition = transition;
  exports.wipeIn = wipeIn;
  exports.wipeOut = wipeOut;
  exports.zoomIn = zoomIn;
  exports.zoomOut = zoomOut;

}));
//# sourceMappingURL=effects.js.map
