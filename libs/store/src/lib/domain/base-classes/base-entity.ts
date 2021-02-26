import { ENTITY, REST_RESOURCE } from '../decorators';
import { ID } from './id.value-object';

export interface BaseEntityProps {
    id: ID;
    createdAt: string;
    updatedAt: string;
}

export abstract class BaseEntity<EntityProps> {
    constructor(id: number, props: EntityProps) {
        this._props = props;
        this._id = id;
        this._createdAt = Date.now();
        this._updatedAt = 0;
    }

    private readonly _id: number;
    protected readonly _props: EntityProps;
    protected readonly _createdAt: number;
    protected readonly _updatedAt: number;

    get id(): number { // value object
        return this._id;
    }

    get updatedAt(): number {
        return this._updatedAt;
    }

    get createdAt(): number {
        return this._createdAt;
    }

    get metadata() {
        return {
            // entity: this[ENTITY].metadata,
            // resource: this[REST_RESOURCE].metadata
        }
    }

    get props(): EntityProps {
        return this._props;
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

        return this.id ? this.id.equals(object.id) : false;
    }
}
