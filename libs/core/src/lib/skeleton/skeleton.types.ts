export const SkeletonStateGlobalKeyword = 'global';

export type LocalSkeletonState = boolean | typeof SkeletonStateGlobalKeyword;

export interface SkeletonConsumerConfig {
    modifiers: string[];
}

export interface SkeletonModuleConfig {
    defaultSkeletonState?: boolean;
}
