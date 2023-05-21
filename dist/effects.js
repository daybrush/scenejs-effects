/*
Copyright (c) Daybrush
name: @scenejs/effects
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-effects.git
version: 1.0.2
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('scenejs')) :
    typeof define === 'function' && define.amd ? define(['exports', 'scenejs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Scene = global.Scene || {}, global.Scene));
})(this, (function (exports, scenejs) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */


    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.11.0
    */
    /**
    * @namespace
    * @name Consts
    */
    /**
    * get string "rgb"
    * @memberof Color
    * @example
    import {RGB} from "@daybrush/utils";

    console.log(RGB); // "rgb"
    */
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */
    var STRING = "string";
    var OPEN_CLOSED_CHARACTERS = [{
      open: "(",
      close: ")"
    }, {
      open: "\"",
      close: "\""
    }, {
      open: "'",
      close: "'"
    }, {
      open: "\\\"",
      close: "\\\""
    }, {
      open: "\\'",
      close: "\\'"
    }];

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
      return r;
    }
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
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */
    function isString(value) {
      return typeof value === STRING;
    }
    function isEqualSeparator(character, separator) {
      var isCharacterSpace = character === "" || character == " ";
      var isSeparatorSpace = separator === "" || separator == " ";
      return isSeparatorSpace && isCharacterSpace || character === separator;
    }
    function findOpen(openCharacter, texts, index, length, openCloseCharacters) {
      var isIgnore = findIgnore(openCharacter, texts, index);
      if (!isIgnore) {
        return findClose(openCharacter, texts, index + 1, length, openCloseCharacters);
      }
      return index;
    }
    function findIgnore(character, texts, index) {
      if (!character.ignore) {
        return null;
      }
      var otherText = texts.slice(Math.max(index - 3, 0), index + 3).join("");
      return new RegExp(character.ignore).exec(otherText);
    }
    function findClose(closeCharacter, texts, index, length, openCloseCharacters) {
      var _loop_1 = function (i) {
        var character = texts[i].trim();
        if (character === closeCharacter.close && !findIgnore(closeCharacter, texts, i)) {
          return {
            value: i
          };
        }
        var nextIndex = i;
        // re open
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
        }
        if (nextIndex === -1) {
          return out_i_1 = i, "break";
        }
        i = nextIndex;
        out_i_1 = i;
      };
      var out_i_1;
      for (var i = index; i < length; ++i) {
        var state_1 = _loop_1(i);
        i = out_i_1;
        if (typeof state_1 === "object") return state_1.value;
        if (state_1 === "break") break;
      }
      return -1;
    }
    function splitText(text, splitOptions) {
      var _a = isString(splitOptions) ? {
          separator: splitOptions
        } : splitOptions,
        _b = _a.separator,
        separator = _b === void 0 ? "," : _b,
        isSeparateFirst = _a.isSeparateFirst,
        isSeparateOnlyOpenClose = _a.isSeparateOnlyOpenClose,
        _c = _a.isSeparateOpenClose,
        isSeparateOpenClose = _c === void 0 ? isSeparateOnlyOpenClose : _c,
        _d = _a.openCloseCharacters,
        openCloseCharacters = _d === void 0 ? OPEN_CLOSED_CHARACTERS : _d;
      var openClosedText = openCloseCharacters.map(function (_a) {
        var open = _a.open,
          close = _a.close;
        if (open === close) {
          return open;
        }
        return open + "|" + close;
      }).join("|");
      var regexText = "(\\s*" + separator + "\\s*|" + openClosedText + "|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(function (chr) {
        return chr && chr !== "undefined";
      });
      var length = texts.length;
      var values = [];
      var tempValues = [];
      function resetTemp() {
        if (tempValues.length) {
          values.push(tempValues.join(""));
          tempValues = [];
          return true;
        }
        return false;
      }
      var _loop_2 = function (i) {
        var character = texts[i].trim();
        var nextIndex = i;
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        var closeCharacter = find(openCloseCharacters, function (_a) {
          var close = _a.close;
          return close === character;
        });
        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
          if (nextIndex !== -1 && isSeparateOpenClose) {
            if (resetTemp() && isSeparateFirst) {
              return out_i_2 = i, "break";
            }
            values.push(texts.slice(i, nextIndex + 1).join(""));
            i = nextIndex;
            if (isSeparateFirst) {
              return out_i_2 = i, "break";
            }
            return out_i_2 = i, "continue";
          }
        } else if (closeCharacter && !findIgnore(closeCharacter, texts, i)) {
          var nextOpenCloseCharacters = __spreadArrays(openCloseCharacters);
          nextOpenCloseCharacters.splice(openCloseCharacters.indexOf(closeCharacter), 1);
          return {
            value: splitText(text, {
              separator: separator,
              isSeparateFirst: isSeparateFirst,
              isSeparateOnlyOpenClose: isSeparateOnlyOpenClose,
              isSeparateOpenClose: isSeparateOpenClose,
              openCloseCharacters: nextOpenCloseCharacters
            })
          };
        } else if (isEqualSeparator(character, separator) && !isSeparateOnlyOpenClose) {
          resetTemp();
          if (isSeparateFirst) {
            return out_i_2 = i, "break";
          }
          return out_i_2 = i, "continue";
        }
        if (nextIndex === -1) {
          nextIndex = length - 1;
        }
        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
        out_i_2 = i;
      };
      var out_i_2;
      for (var i = 0; i < length; ++i) {
        var state_2 = _loop_2(i);
        i = out_i_2;
        if (typeof state_2 === "object") return state_2.value;
        if (state_2 === "break") break;
      }
      if (tempValues.length) {
        values.push(tempValues.join(""));
      }
      return values;
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */
    function splitComma(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText(text, ",");
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
    * transforms something in an array into an array.
    * @memberof Utils
    * @param - Array form
    * @return an array
    * @example
    import {toArray} from "@daybrush/utils";

    const arr1 = toArray(document.querySelectorAll(".a")); // Element[]
    const arr2 = toArray(document.querySelectorAll<HTMLElement>(".a")); // HTMLElement[]
    */
    function toArray(value) {
      return [].slice.call(value);
    }
    /**
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */
    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }
      var length = arr.length;
      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }
      return defaultIndex;
    }
    /**
    * Returns the value of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `find` was called upon.
    * @param - A function to execute on each value in the array,
    * @param - Returns defalutValue if not found by the function.
    * @example
    import { find } from "@daybrush/utils";

    find([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // {a: 2}
    */
    function find(arr, callback, defalutValue) {
      var index = findIndex(arr, callback);
      return index > -1 ? arr[index] : defalutValue;
    }

    /*
    Copyright (c) 2019 Daybrush
    name: keyframer
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/keyframer.git
    version: 0.1.1
    */

    var hasCSSRule = typeof CSSRule !== "undefined";
    var KEYFRAMES_RULE = hasCSSRule ? CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE : 7;
    var KEYFRAME_RULE = hasCSSRule ? CSSRule.KEYFRAME_RULE || CSSRule.WEBKIT_KEYFRAME_RULE : 8;
    /**
     * Make the CSS Keyframes the keyframes object.
     * @memberof Keyframer
     * @param - The name of the keyframes(`CSSKeyframes​Rule`) in the stylesheet(`CSSStyleSheet`).
     * @returns the keyframes object
     * @example
    // @keyframes keyframes {
    //     0% {
    //         opacity: 1;
    //         transform: translate(0px, 0px) rotate(0deg);
    //     }
    //     50% {
    //         opacity: 0;
    //         transform: translate(50px, 0px) rotate(0deg);
    //     }
    //     100% {
    //         opacity: 1;
    //         transform: translate(100px, 0px) rotate(50deg);
    //     }
    // }

    import { getKeyframes } from "keyframer";

    // {
    //     "0%": "opacity: 1; transform: translate(0px, 0px) rotate(0deg)",
    //     "50%": "opacity: 0; transform: translate(50px, 0px) rotate(0deg)",
    //     "100%": "opacity: 1; transform: translate(100px, 0px) rotate(50deg)",
    // }
    const obj = getKeyframes("keyframes");
     */
    function getKeyframes(name) {
        var styleSheets = toArray(document.styleSheets);
        var sheets = styleSheets.filter(function (sheet) {
            try {
                var length_1 = sheet.cssRules.length;
                return length_1 > 0;
            }
            catch (e) {
                return false;
            }
        });
        var sheetsLength = sheets.length;
        var _loop_1 = function (i) {
            var sheet = sheets[i];
            var keyframesRules = toArray(sheet.cssRules);
            var keyframesRule = keyframesRules.filter(function (rule) {
                return rule.name === name && rule.type === KEYFRAMES_RULE;
            })[0];
            if (keyframesRule) {
                var keyframeRules = toArray(keyframesRule.cssRules);
                var obj_1 = {};
                keyframeRules.forEach(function (rule) {
                    if (rule.type === KEYFRAME_RULE) {
                        var keyText = rule.keyText;
                        var cssText_1 = rule.style.cssText;
                        splitComma(keyText).forEach(function (time) {
                            obj_1[time] = cssText_1;
                        });
                    }
                });
                return { value: obj_1 };
            }
        };
        for (var i = 0; i < sheetsLength; ++i) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return {};
    }

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
            item.set("".concat(i / (length - 1) * 100, "%"), property, values[i]);
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
        var _b = _a === void 0 ? {} : _a, _c = _b.from, from = _c === void 0 ? 0 : _c, _d = _b.to, to = _d === void 0 ? 1 : _d;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.from, from = _c === void 0 ? 1 : _c, _d = _b.to, to = _d === void 0 ? 0 : _d;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.from, from = _c === void 0 ? "-100%" : _c, _d = _b.to, to = _d === void 0 ? "0%" : _d, _e = _b.property, property = _e === void 0 ? "left" : _e;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.from, from = _c === void 0 ? "0%" : _c, _d = _b.to, to = _d === void 0 ? "100%" : _d, _e = _b.property, property = _e === void 0 ? "left" : _e;
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
        item1.set((_a = {},
            _a[transitionTime] = transitionItem,
            _a));
        transitionItem.setDirection("reverse");
        item2.set({
            0: transitionItem,
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
        var _b = _a === void 0 ? {} : _a, _c = _b.from, from = _c === void 0 ? 0 : _c, _d = _b.to, to = _d === void 0 ? 1 : _d;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.from, from = _c === void 0 ? 1 : _c, _d = _b.to, to = _d === void 0 ? 0 : _d;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.from, from = _c === void 0 ? 0 : _c, _d = _b.to, to = _d === void 0 ? 1 : _d;
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
        var _c = _a === void 0 ? {} : _a, _d = _c.x, x = _d === void 0 ? 1 : _d, _e = _c.y, y = _e === void 0 ? 1 : _e, _f = _c.backside, backside = _f === void 0 ? false : _f;
        var item = new scenejs.SceneItem({}, arguments[0]);
        var property = "";
        var startValue = "";
        var endValue = "";
        var ratio = (x && y) || x ? x : y;
        var startDeg = (backside ? (ratio > 0 ? 180 : -180) : 0);
        var endDeg = startDeg + ratio * 180;
        if (x && y) {
            var axis = [x > 0 ? 1 : -1, y > 0 ? 1 : -1, 0, ""].join(",");
            property = "rotate3d";
            startValue = axis + startDeg + "deg";
            endValue = axis + endDeg + "deg";
        }
        else {
            if (x) {
                property = "rotateX";
            }
            else if (y) {
                property = "rotateY";
            }
            else {
                return item;
            }
            startValue = startDeg + "deg";
            endValue = endDeg + "deg";
        }
        item.set({
            transform: (_b = {},
                _b[property] = [startValue, endValue],
                _b),
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
        var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 1 : _c, _d = _b.backside, backside = _d === void 0 ? false : _d;
        var item = flip({ y: 0, x: x, backside: backside });
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
        var _b = _a === void 0 ? {} : _a, _c = _b.y, y = _c === void 0 ? 1 : _c, _d = _b.backside, backside = _d === void 0 ? false : _d;
        var item = flip({ x: 0, y: y, backside: backside });
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
        var _b = _a === void 0 ? {} : _a, _c = _b.properties, properties = _c === void 0 ? {
            transform: {
                translateX: ["-10px", "10px"],
                translateY: ["-10px", "10px"],
                rotate: ["-10deg", "10deg"],
            },
        } : _c, _d = _b.frequency, frequency = _d === void 0 ? 10 : _d;
        var item = new scenejs.SceneItem({}, arguments[0]);
        var frame = new scenejs.Frame(properties);
        var names = frame.getNames();
        names.forEach(function (propertyNames, i) {
            var value = frame.get.apply(frame, propertyNames);
            var start = 0;
            var end = 0;
            var unit = "";
            if (isArray(value)) {
                var _a = splitUnit(value[0]), startNumber = _a.value, startUnit = _a.unit;
                unit = startUnit;
                start = startNumber;
                end = splitUnit(value[1]).value;
            }
            else {
                var _b = splitUnit(value), valueNumber = _b.value, valueUnit = _b.unit;
                unit = valueUnit;
                end = Math.abs(valueNumber);
                start = -end;
            }
            item.set.apply(item, __spreadArray(__spreadArray(["0%"], propertyNames, false), ["".concat((start + end) / 2).concat(unit)], false));
            item.set.apply(item, __spreadArray(__spreadArray(["100%"], propertyNames, false), ["".concat((start + end) / 2).concat(unit)], false));
            for (var j = 1; j <= frequency; ++j) {
                var ratio = Math.random() * (end - start) + start;
                item.set.apply(item, __spreadArray(__spreadArray(["".concat(j / (frequency + 1) * 100, "%")], propertyNames, false), ["".concat(ratio).concat(unit)], false));
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
        var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? ["-5px", "5px"] : _c, _d = _b.frequency, frequency = _d === void 0 ? 10 : _d;
        var item = shake({
            properties: {
                transform: {
                    translateX: x,
                },
            },
            frequency: frequency,
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
        var _b = _a === void 0 ? {} : _a, _c = _b.y, y = _c === void 0 ? ["-5px", "5px"] : _c, _d = _b.frequency, frequency = _d === void 0 ? 10 : _d;
        var item = shake({
            properties: {
                transform: {
                    translateY: y,
                },
            },
            frequency: frequency,
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
        return new scenejs.SceneItem(getKeyframes(name), options);
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
        var _b = _a === void 0 ? {} : _a, _c = _b.leftProperty, leftProperty = _c === void 0 ? ["transform", "translateX"] : _c, _d = _b.topProperty, topProperty = _d === void 0 ? ["transform", "translateY"] : _d, _e = _b.left, left = _e === void 0 ? "0px" : _e, _f = _b.top, top = _f === void 0 ? "0px" : _f;
        var frame = new scenejs.Frame();
        frame.set.apply(frame, __spreadArray(__spreadArray([], [].concat(leftProperty), false), [left], false));
        frame.set.apply(frame, __spreadArray(__spreadArray([], [].concat(topProperty), false), [top], false));
        frame.set("transform-origin", "calc(50% - ".concat(left, ") calc(50% - ").concat(top, ")"));
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
        var _b = _a === void 0 ? {} : _a, _c = _b.property, property = _c === void 0 ? ["html"] : _c, _d = _b.text, text = _d === void 0 ? "" : _d, _e = _b.start, start = _e === void 0 ? 0 : _e, _f = _b.end, end = _f === void 0 ? text.length : _f, _g = _b.prefix, prefix = _g === void 0 ? "" : _g, _h = _b.suffix, suffix = _h === void 0 ? "" : _h;
        var properties = [].concat(property);
        var item = new scenejs.SceneItem();
        var length = Math.abs(end - start) + 1;
        if (start < end) {
            for (var i = start; i <= end; ++i) {
                item.set.apply(item, __spreadArray(__spreadArray(["".concat((i - start) / length * 100, "%")], properties, false), ["".concat(prefix).concat(text.substring(start, i)).concat(suffix)], false));
            }
        }
        else {
            for (var i = end; i <= start; ++i) {
                item.set.apply(item, __spreadArray(__spreadArray(["".concat((i - end) / length * 100, "%")], properties, false), ["".concat(prefix, "text.substring(end, start + end - i)").concat(suffix)], false));
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

}));
//# sourceMappingURL=effects.js.map
