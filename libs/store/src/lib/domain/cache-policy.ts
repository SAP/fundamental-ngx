export interface CachePolicy {
    strategy: CachePolicyStrategy;
}

export enum CachePolicyStrategy {
    None = 'None',
    LocaleStorage = 'LocaleStorage',
    SessionStorage = 'SessionStorage'
}
