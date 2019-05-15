import { SceneItemState } from "scenejs";

/**
 * interface EffectState extends SceneItemState
 * @typedef
 * @memberof Effects
 * @see SceneItemState
 */
export interface EffectState extends SceneItemState {
    [key: string]: any;
}
