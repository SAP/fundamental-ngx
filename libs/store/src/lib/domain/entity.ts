export type IdentityKey = string | number;

export abstract class BaseEntity {
    id: IdentityKey;
}
