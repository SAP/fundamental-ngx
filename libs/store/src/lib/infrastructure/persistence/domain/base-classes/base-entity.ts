import { Composite } from './composite';

/**
 * BaseEntityDTO that extends passed Entity DTO
 * */
export interface BaseEntityDTO {
    id?: number;
    // createdAt?: string;
    // updatedAt?: string;
}

/**
 * Base Entity follows the DDD definition of Entity
 */
export abstract class BaseEntity<EntityProps> extends Composite<EntityProps> {
     constructor(dto: EntityProps) {
        super();
        this._dto = dto;
        this.value = dto;
    }

    _dto: EntityProps;
     value: EntityProps;

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
    public equals(object?: BaseEntity<EntityProps>): boolean {
        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!BaseEntity.isEntity(object)) {
            return false;
        }

        // return this.id ? this.id.equals(object.id) : false;
        return false;
    }
}
