export type IdentityKey = string | number;

export abstract class Entity {
    id: IdentityKey;
}
