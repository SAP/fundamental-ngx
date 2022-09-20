export const SkeletonStateGlobalKeyword = 'global';

export type LocalSkeletonState = boolean | typeof SkeletonStateGlobalKeyword;

export type SkeletonCallbackFn = (skeletonState: boolean) => void;

export interface SkeletonObserverConfig {
    /**
     * Whether to apply modifier classes. True by default.
     */
    apply?: boolean;
    /**
     * Custom skeleton classes.
     * When provided all other fields has no power!
     */
    modifiers?: string[];
    /**
     * Whether to apply animation. True by default.
     */
    animation?: boolean;
    /**
     * Whether skeleton should be created without pseudo-elements.
     * Useful for inputs, etc. where we cannot use ::before & ::after pseudo elements.
     * Cannot be used together with text flag!
     */
    native?: boolean;
}

export interface SkeletonModuleConfig {
    defaultSkeletonState?: boolean;
}
