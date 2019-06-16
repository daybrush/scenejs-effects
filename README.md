
<p align="middle"><img src="https://daybrush.com/scenejs/images/clapperboard.png" width="250"/></p>
<h2 align="middle">Scene.js Effects</h2>
<p align="middle"><a href="https://badge.fury.io/js/%40scenejs%2Feffects" target="_blank"><img src="https://badge.fury.io/js/%40scenejs%2Feffects.svg" alt="npm version" height="18"/></a> <img src="https://img.shields.io/badge/language-typescript-blue.svg"/> <a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/></a></p>


<p align="middle">🎬 Effect collection library where you can add effects with <a href="https://github.com/daybrush/scenejs" target="_blank"><strong>Scene.js</strong></a></p>

<p align="middle"><a href="https://github.com/daybrush/scenejs"><strong>Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs-effects/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html#effects"><strong>Features</strong></a> &nbsp;/&nbsp; <a href="https://codepen.io/collection/XwqoGW/"><strong>Examples</strong></a></p>
<br/>

## Installation
### npm
```bash
$ npm install @scenejs/effects
```
### script
```html
<script src="//daybrush.com/scenejs/release/latest/dist/scene.min.js"></script>
<script src="//daybrush.com/scenejs-effects/release/latest/dist/effects.min.js"></script>
```

## How to use
```ts
import { shake, flip, fadeIn, wipeIn } from "@egjs/effects";

Scene
    .shake()
    .setDuration(1)
    .setSelector(".className")
    .play();

```

## Effects

* [**shake**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shake): Make a shake effect. ([CodePen](https://codepen.io/daybrush/pen/NZNRYv))<br/>
[![](./demo/images/shake.gif)](https://daybrush.com/scenejs/features.html#shake)

* [**shakeX**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shakeX): Make a horizontal shake effect. ([CodePen](https://codepen.io/daybrush/pen/orxzPN))<br/>
[![](./demo/images/shakex.gif)](https://daybrush.com/scenejs/features.html#shakex)

* [**shakeY**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.shakeY): Make a vertical shake effect. ([CodePen](https://codepen.io/daybrush/pen/NZNRLa))<br/>
[![](./demo/images/shakey.gif)](https://daybrush.com/scenejs/features.html#shakey)

* [**flip**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flip): You can create a flip effect horizontally, vertically, or diagonally. ([CodePen](https://codepen.io/daybrush/pen/EBKgeM))<br/>
[![](./demo/images/flip.gif)](https://daybrush.com/scenejs/features.html#flip)

* [**flipX**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flipX): You can create an effect that flips vertically around the x-axis. ([CodePen](https://codepen.io/daybrush/pen/NZNRew))<br/>
[![](./demo/images/flipx.gif)](https://daybrush.com/scenejs/features.html#flipx)

* [**flipY**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.flipY): You can create an effect that flips horizontally around the y-axis. ([CodePen](https://codepen.io/daybrush/pen/VJaKNe))<br/>
[![](./demo/images/flipY.gif)](https://daybrush.com/scenejs/features.html#flipy)

* [**fadeIn**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.fadeIn): Make a fade in effect. ([CodePen](https://codepen.io/daybrush/pen/gNrwJm))<br/>
[![](./demo/images/fadein.gif)](https://daybrush.com/scenejs/features.html#fadein)

* [**fadeOut**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.fadeOut): Make a fade out effect. ([CodePen](https://codepen.io/daybrush/pen/pXyEmZ))<br/>
[![](./demo/images/fadeout.gif)](https://daybrush.com/scenejs/features.html#fadeout)

* [**blink**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.blink): Make a blink effect. ([CodePen](https://codepen.io/daybrush/pen/MMyKRP))<br/>
[![](./demo/images/blink.gif)](https://daybrush.com/scenejs/features.html#blink)

* [**wipeIn**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.wipeIn): Make a wipe in effect. ([CodePen](https://codepen.io/daybrush/pen/LKNpjm))<br/>
[![](./demo/images/wipein.gif)](https://daybrush.com/scenejs/features.html#wipein)

* [**wipeOut**](http://daybrush.com/scenejs-effects/release/latest/doc/effects.html#.wipeOut): Make a wipe out effect. ([CodePen](https://codepen.io/daybrush/pen/KjzgOB))<br/>
[![](./demo/images/wipeout.gif)](https://daybrush.com/scenejs/features.html#wipeout)


## License

```
MIT License

Copyright (c) 2019 Daybrush
```