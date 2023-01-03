export enum MatchingStrategy {
    STARTS_WITH_PER_TERM = 'starts with per term',
    STARTS_WITH = 'starts with',
    CONTAINS = 'contains'
}

export type MatchBy = (item: any) => any;

export interface MatchingBy {
    firstBy: MatchBy;
    secondaryBy?: MatchBy;
}
