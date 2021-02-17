export interface FetchPolicy {
    strategy: FetchPolicyStrategy;
}

export enum FetchPolicyStrategy {
    NetworkOnly,
    LocalOnly
}
