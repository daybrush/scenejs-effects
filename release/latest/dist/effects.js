/*
Copyright (c) 2019 Daybrush
name: @scenejs/effects
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-effects.git
version: 0.0.2
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('scenejs'), require('@daybrush/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', 'scenejs', '@daybrush/utils'], factory) :
  (global = global || self, factory(global.Scene = global.Scene || {}, global.Scene, global.utils));
}(this, function (exports, scenejs, utils) { 'use strict';

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
   * @memberof Effects
   * @param options
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
   * @memberof Effects
   * @param options
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
   * @memberof Effects
   * @param options
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
   * @memberof Effects
   * @param options
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
    var _b = _a === void 0 ? {} : _a,
        _c = _b.from,
        from = _c === void 0 ? 0 : _c,
        _d = _b.to,
        to = _d === void 0 ? 1 : _d;

    return set("opacity", [from, to, from], arguments[0]);
  }
  function flip(_a) {
    var _b;

    var _c = _a === void 0 ? {} : _a,
        _d = _c.x,
        x = _d === void 0 ? 1 : _d,
        _e = _c.y,
        y = _e === void 0 ? 0 : _e,
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
  function flipX(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.x,
        x = _c === void 0 ? 1 : _c,
        _d = _b.backside,
        backside = _d === void 0 ? false : _d;

    var item = flip({
      x: x,
      backside: backside
    });
    item.setOptions(arguments[0]);
    return item;
  }
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
  function shake(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.properties,
        properties = _c === void 0 ? {
      transform: {
        translateX: ["-5px", "5px"],
        translateY: ["-5px", "5px"],
        rotate: ["-5deg", "5deg"]
      }
    } : _c,
        _d = _b.interval,
        interval = _d === void 0 ? 10 : _d;

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

      item.set.apply(item, ["0%"].concat(propertyNames, ["" + (start + end) + unit]));
      item.set.apply(item, ["100%"].concat(propertyNames, ["" + (start + end) + unit]));

      for (var j = 1; j < interval - 1; ++j) {
        var ratio = Math.random() * (end - start) + start;
        var result = utils.dot(start, end, ratio + 1, 1 - ratio) * (i % 2 ? -1 : 1);
        item.set.apply(item, [j / (interval - 1) * 100 + "%"].concat(propertyNames, ["" + result + unit]));
      }
    });
    return item;
  }

  exports.blink = blink;
  exports.fadeIn = fadeIn;
  exports.fadeOut = fadeOut;
  exports.flip = flip;
  exports.flipX = flipX;
  exports.flipY = flipY;
  exports.shake = shake;
  exports.transition = transition;
  exports.wipeIn = wipeIn;
  exports.wipeOut = wipeOut;
  exports.zoomIn = zoomIn;
  exports.zoomOut = zoomOut;

}));
//# sourceMappingURL=effects.js.map
