export const SkeletonStateGlobalKeyword = 'global';

export type LocalSkeletonState = boolean | typeof SkeletonStateGlobalKeyword;

export type SkeletonCallbackFn = (skeletonState: boolean) => void;

export interface SkeletonObserverConfig {
    /** Whether skeleton should be a circle shape. */
    circle?: boolean;

    /** Whether the skeleton is animated. */
    animation?: boolean;

    /** Width of the skeleton. */
    width?: string;

    /** Height of the skeleton. */
    height?: string;
}

export interface SkeletonModuleConfig {
    defaultSkeletonState?: boolean;
}
