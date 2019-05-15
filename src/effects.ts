import { SceneItem, AnimatorState, Frame } from "scenejs";
import { IObject, isArray, splitUnit, dot } from "@daybrush/utils";
import { EffectState } from "./types";

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
export function zoomIn({ from = 0, to = 1 }: Partial<EffectState>): SceneItem {
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
export function zoomOut({ from = 1, to = 0 }: Partial<EffectState>): SceneItem {
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
export function wipeIn({ from = "-100%", to = "0%", property = "left" }: Partial<EffectState>): SceneItem {
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
export function wipeOut({ from = "0%", to = "100%", property = "left" }: Partial<EffectState>): SceneItem {
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
export function fadeIn({ from = 0, to = 1 }: Partial<EffectState>): SceneItem {
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
export function fadeOut({ from = 1, to = 0 }: Partial<EffectState> = {}): SceneItem {
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
export function blink({ from = 0, to = 1 }: Partial<EffectState> = {}): SceneItem {
    return set("opacity", [from, to, from], arguments[0]);
}


export function shake({
    properties = {
        transform: {
            translateX: [`-5px`, `5px`],
            translateY: [`-5px`, `5px`],
            rotate: [`-5deg`, `5deg`],
        },
    },
    interval = 10,
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
            const {value: startNumber, unit: startUnit} = splitUnit(value[0]);

            unit = startUnit;
            start = startNumber;
            end = splitUnit(value[1]).value;
        } else {
            const {value: valueNumber, unit: valueUnit} = splitUnit(value);

            unit = valueUnit;
            end = Math.abs(valueNumber);
            start = -end;
        }
        item.set(`0%`, ...propertyNames, `${start + end}${unit}`);
        item.set(`100%`, ...propertyNames, `${start + end}${unit}`);
        for (let j = 1; j < interval - 1; ++j) {
            const ratio = Math.random() * (end - start) + start;
            const result = dot(start, end, ratio + 1, 1 - ratio) * (i % 2 ? -1 : 1);

            item.set(`${j / (interval - 1) * 100}%`, ...propertyNames, `${result}${unit}`);
        }
    });
    return item;
}
