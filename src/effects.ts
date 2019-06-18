import { SceneItem, AnimatorState, Frame, SceneItemOptions } from "scenejs";
import { IObject, isArray, splitUnit } from "@daybrush/utils";
import { EffectState } from "./types";
import { getKeyframes } from "keyframer";

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
function set(property: string | string[], values: any[], options: Partial<AnimatorState>): SceneItem {
    const item = new SceneItem({}, options);
    const length = values.length;

    for (let i = 0; i < length; ++i) {
        item.set(`${i / (length - 1) * 100}%`, property, values[i]);
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
export function zoomIn({ from = 0, to = 1 }: Partial<EffectState> = {}): SceneItem {
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
export function zoomOut({ from = 1, to = 0 }: Partial<EffectState> = {}): SceneItem {
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
export function wipeIn({ from = "-100%", to = "0%", property = "left" }: Partial<EffectState> = {}): SceneItem {
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
export function wipeOut({ from = "0%", to = "100%", property = "left" }: Partial<EffectState> = {}): SceneItem {
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
export function transition(
    item1: SceneItem,
    item2: SceneItem,
    transitionObject: SceneItem | IObject<any>,
): void {
    const transitionItem = new SceneItem();

    transitionItem.append(transitionObject);

    const duration = transitionItem.getDuration();
    const transitionTime = Math.max(item1.getDuration() - duration, 0);
    item1.set({
        [transitionTime]: transitionItem,
    });
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
export function fadeIn({ from = 0, to = 1 }: Partial<EffectState> = {}): SceneItem {
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
export function fadeOut({ from = 1, to = 0 }: Partial<EffectState> = {}): SceneItem {
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
export function blink({ from = 0, to = 1 }: Partial<EffectState> = {}): SceneItem {
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
export function flip({
    x = 1,
    y = 1,
    backside = false,
}: Partial<EffectState> = {}) {
    const item = new SceneItem({}, arguments[0]);
    let property = "";
    let startValue = "";
    let endValue = "";
    const ratio = (x && y) || x ? x : y;
    const startDeg = (backside ? (ratio > 0 ? 180 : -180) : 0);
    const endDeg = startDeg + ratio * 180;

    if (x && y) {
        const axis = [x > 0 ? 1 : -1, y > 0 ? 1 : -1, 0, ""].join(",");

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
        transform: {
            [property]: [startValue, endValue],
        },
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
export function flipX({
    x = 1,
    backside = false,
}: Partial<EffectState> = {}): SceneItem {
    const item = flip({ y: 0, x, backside });

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
export function flipY({
    y = 1,
    backside = false,
}: Partial<EffectState> = {}): SceneItem {
    const item = flip({ x: 0, y, backside });

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
export function shake({
    properties = {
        transform: {
            translateX: [`-10px`, `10px`],
            translateY: [`-10px`, `10px`],
            rotate: [`-10deg`, `10deg`],
        },
    },
    frequency = 10,
}: Partial<EffectState> = {}): SceneItem {
    const item = new SceneItem({}, arguments[0]);
    const frame = new Frame(properties);
    const names = frame.getNames();

    names.forEach((propertyNames, i) => {
        const value = frame.get(...propertyNames);
        let start: number = 0;
        let end: number = 0;
        let unit: string = "";

        if (isArray(value)) {
            const { value: startNumber, unit: startUnit } = splitUnit(value[0]);

            unit = startUnit;
            start = startNumber;
            end = splitUnit(value[1]).value;
        } else {
            const { value: valueNumber, unit: valueUnit } = splitUnit(value);

            unit = valueUnit;
            end = Math.abs(valueNumber);
            start = -end;
        }
        item.set(`0%`, ...propertyNames, `${(start + end) / 2}${unit}`);
        item.set(`100%`, ...propertyNames, `${(start + end) / 2}${unit}`);

        for (let j = 1; j <= frequency; ++j) {
            const ratio = Math.random() * (end - start) + start;
            item.set(`${j / (frequency + 1) * 100}%`, ...propertyNames, `${ratio}${unit}`);
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
export function shakeX({
    x = ["-5px", "5px"],
    frequency = 10,
}: Partial<EffectState> = {}) {
    const item = shake({
        properties: {
            transform: {
                translateX: x,
            },
        },
        frequency,
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
export function shakeY({
    y = ["-5px", "5px"],
    frequency = 10,
}: Partial<EffectState> = {}) {
    const item = shake({
        properties: {
            transform: {
                translateY: y,
            },
        },
        frequency,
    });
    item.setOptions(arguments[0]);

    return item;
}
/**
 * @memberof effects
 */
export function keyframes(name: string, options: Partial<SceneItemOptions>): SceneItem {
    return new SceneItem(getKeyframes(name), options);
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
export function typing({
    property = ["html"],
    text = "",
    start = 0,
    end = text.length,
    prefix = "",
    suffix = "",
}: Partial<EffectState> = {}): SceneItem {
    const properties = [].concat(property);
    const item = new SceneItem();
    const length = Math.abs(end - start) + 1;

    if (start < end) {
        for (let i = start; i <= end; ++i) {
            item.set(`${(i - start) / length * 100}%`, ...properties, `${prefix}${text.substring(start, i)}${suffix}`);
        }
    } else {
        for (let i = end; i <= start; ++i) {
            item.set(
                `${(i - end) / length * 100}%`,
                ...properties,
                `${prefix}text.substring(end, start + end - i)${suffix}`,
            );
        }
    }
    item.setOptions(arguments[0]);

    return item;
}
