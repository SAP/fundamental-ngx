import { Composite } from './composite';

export type IdentityKey = string | number;

/**
 * Base Entity follows the DDD definition of Entity
 */
export abstract class BaseEntity<EntityProps = {}> extends Composite<EntityProps> {
    constructor(dto: EntityProps) {
        super(dto);
    }

    /**
     * Getter and setter to specify unique entity identity
     */
    abstract get identity(): IdentityKey;
    abstract set identity(value);

    /**
     * Check if Entity has proper instance
     * @param entity
     */
    static isEntity(entity: unknown): entity is BaseEntity<any> {
        return entity instanceof BaseEntity;
    }

    /**
     *  Check if two entities are the same Entity. Checks using ID field.
     * @param object Entity
     */
    public equals(object: BaseEntity<EntityProps>): boolean {
        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!BaseEntity.isEntity(object)) {
            return false;
        }

        return this.identity === object.identity;
    }
}

export type EntityDTOType<Entity> = Entity extends BaseEntity<infer DTO> ? DTO : never;
