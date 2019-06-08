import { SceneItemState } from "scenejs";

/**
 * interface EffectState extends SceneItemState
 * @typedef
 * @memberof effects
 * @see SceneItemState
 */
export interface EffectState extends SceneItemState {
    [key: string]: any;
}
