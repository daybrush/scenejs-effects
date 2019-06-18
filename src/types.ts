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
/**
 * @typedef
 * @memberof effects
 */
export interface KineticType {
    leftProperty: string | string[];
    topProperty: string | string[];
    left: string | number;
    top: string | number;
}
