import { ENTITY, REST_RESOURCE } from '../decorators';
import { ID } from './id.value-object';

export interface BaseEntityDTO {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export abstract class BaseEntity<EntityProps extends BaseEntityDTO> {
    constructor(dto: EntityProps) {
        this._dto = dto;
        this._id = 123;
        this._createdAt = '123';
        this._updatedAt = '456';
    }

    _dto: EntityProps;
    readonly _id: number;
    readonly _createdAt: string;
    readonly _updatedAt: string;

    get id(): number { // value object
        return this._id;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get dto(): EntityProps {
        return this._dto;
    }

    set dto(value) {
        this._dto = value;
    }

    static isEntity(entity: unknown): entity is BaseEntity<unknown> {
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
