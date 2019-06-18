
<p align="middle"><img src="https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/logo.png" width="250"/></p>
<h2 align="middle">Scene.js Effects</h2>
<p align="middle"><a href="https://badge.fury.io/js/%40scenejs%2Feffects" target="_blank"><img src="https://badge.fury.io/js/%40scenejs%2Feffects.svg" alt="npm version" height="18"/></a> <img src="https://img.shields.io/badge/language-typescript-blue.svg"/> <a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/></a></p>


<p align="middle">🎬✨ Effect collection library where you can add effects with <a href="https://github.com/daybrush/scenejs" target="_blank"><strong>Scene.js</strong></a></p>

<p align="middle"><a href="https://github.com/daybrush/scenejs"><strong>About Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs-effects/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html#effects"><strong>Features</strong></a> &nbsp;/&nbsp; <a href="https://codepen.io/collection/XwqoGW/"><strong>Examples</strong></a></p>
<br/>

## ⚙ ️Installation
### npm
```bash
$ npm install @scenejs/effects
```
### script
```html
<script src="//daybrush.com/scenejs/release/latest/dist/scene.min.js"></script>
<script src="//daybrush.com/scenejs-effects/release/latest/dist/effects.min.js"></script>
```

## 🛠️ How to use
```ts
import { shake, flip, fadeIn, wipeIn } from "@egjs/effects";

Scene
    .shake()
    .setDuration(1)
    .setSelector(".className")
    .play();

```

## ✨ Effects
* [**kineticFrame**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.kineticFrame): Create a frame that moves the origin in the opposite direction as it moves through the transform. ([CodePen](https://codepen.io/daybrush/pen/NZrVGv))<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/kineticFrame.gif)](https://codepen.io/daybrush/pen/NZrVGv)

* [**typing**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.typing): Make a typing effect that is typed one character at a time like a typewriter. ([CodePen](https://codepen.io/daybrush/pen/ydOVPW))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/typing.gif)](https://daybrush.com/scenejs/features.html#typing)

* [**keyframes**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.keyframer): Make the CSS Keyframes Playable Animator(SceneItem). ([CodePen](https://codepen.io/daybrush/pen/XLjjBE))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/keyframer.gif)](https://codepen.io/daybrush/pen/XLjjBE)
```html
<style>
@keyframes keyframes {
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
}
</style>
```
```js
import { keyframer } from "@scenejs/effects";

keyframer("keyframes", {
    duration: 1,
    iterationCount: "infinite",
    selector: ".rect",
}).play();
```

* [**shake**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shake): Make a shake effect. ([CodePen](https://codepen.io/daybrush/pen/NZNRYv))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/shake.gif)](https://daybrush.com/scenejs/features.html#shake)

* [**shakeX**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shakeX): Make a horizontal shake effect. ([CodePen](https://codepen.io/daybrush/pen/orxzPN))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/shakex.gif)](https://daybrush.com/scenejs/features.html#shakex)

* [**shakeY**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shakeY): Make a vertical shake effect. ([CodePen](https://codepen.io/daybrush/pen/NZNRLa))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/shakey.gif)](https://daybrush.com/scenejs/features.html#shakey)

* [**flip**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flip): You can create a flip effect horizontally, vertically, or diagonally. ([CodePen](https://codepen.io/daybrush/pen/EBKgeM))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/flip.gif)](https://daybrush.com/scenejs/features.html#flip)

* [**flipX**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flipX): You can create an effect that flips vertically around the x-axis. ([CodePen](https://codepen.io/daybrush/pen/NZNRew))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/flipx.gif)](https://daybrush.com/scenejs/features.html#flipx)

* [**flipY**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flipY): You can create an effect that flips horizontally around the y-axis. ([CodePen](https://codepen.io/daybrush/pen/VJaKNe))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/flipy.gif)](https://daybrush.com/scenejs/features.html#flipy)

* [**transition**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.transition): Switch the scene from `item1` to `item2`. ([CodePen](https://codepen.io/daybrush/pen/QXKGam))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/transition.gif)](https://daybrush.com/scenejs/features.html#transition)

* [**fadeIn**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.fadeIn): Make a fade in effect. ([CodePen](https://codepen.io/daybrush/pen/gNrwJm))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/fadein.gif)](https://daybrush.com/scenejs/features.html#fadein)

* [**fadeOut**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.fadeOut): Make a fade out effect. ([CodePen](https://codepen.io/daybrush/pen/pXyEmZ))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/fadeout.gif)](https://daybrush.com/scenejs/features.html#fadeout)

* [**blink**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.blink): Make a blink effect. ([CodePen](https://codepen.io/daybrush/pen/MMyKRP))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/blink.gif)](https://daybrush.com/scenejs/features.html#blink)

* [**wipeIn**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.wipeIn): Make a wipe in effect. ([CodePen](https://codepen.io/daybrush/pen/LKNpjm))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/wipein.gif)](https://daybrush.com/scenejs/features.html#wipein)

* [**wipeOut**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.wipeOut): Make a wipe out effect. ([CodePen](https://codepen.io/daybrush/pen/KjzgOB))<br/>
[![](https://raw.githubusercontent.com/daybrush/scenejs-effects/master/demo/images/wipeout.gif)](https://daybrush.com/scenejs/features.html#wipeout)


## 👏 Contributing

If you have any questions or requests or want to contribute to `scenejs` or other packages, please write the issue or give me a Pull Request freely.

## 🐞 Bug Report

If you find a bug, please report to us opening a new [Issues](https://github.com/daybrush/scenejs-effects/issues) on GitHub.

## 📝 License

```
MIT License

Copyright (c) 2019 Daybrush
```