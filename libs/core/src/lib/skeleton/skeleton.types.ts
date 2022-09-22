export const SkeletonStateGlobalKeyword = 'global';

export type LocalSkeletonState = boolean | typeof SkeletonStateGlobalKeyword;

export type SkeletonCallbackFn = (skeletonState: boolean) => void;

export interface SkeletonObserverConfig {
    /**
     * Whether to apply animation. True by default.
     */
    animation?: boolean;
}

export interface SkeletonModuleConfig {
    defaultSkeletonState?: boolean;
}
