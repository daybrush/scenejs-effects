import { SceneItemState } from "scenejs";

export interface EffectState extends SceneItemState {
    [key: string]: any;
}
