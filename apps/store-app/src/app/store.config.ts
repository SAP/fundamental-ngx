import { Entity, RESTResource, ENTITY, REST_RESOURCE} from '@fundamental-ngx/store';
interface EntityComposite {
    getTypes();
}

interface Field<T> {
    [key: string]: T
}

export class BaseEntity {
    identity: number;
    created: number;
    updated: number
}

export class BaseValue {
    lineItems: Array<any>;
    clone() {

    }
}

export type Class<T>  = new(...args: any[]) => T;

export interface EntityTypes {
    [index: string]: Class<BaseEntity>;
}

@RESTResource({
    root: 'http://www.example.com/v1/',
    path: '/requisitions/:reqId/lineItems',
})
@Entity({
    domain: 'Requisitioning',
    name: 'LineItem',
    primaryKey: 'lineItemId', // if not provided 'id' is assumed to be primaryKey
    aggregateOf: 'Requisition',
})
class LineItem {
    lineItemId: string;
    reqId: string;
}

// URI with endpoints for different actions
@RESTResource({
    path: {
        create: '/cart',
        getAll: '/requisitions',
        update: ['PATCH', '/requisition']
    }
})
@Entity({
    domain: 'Requisitioning',
    name: 'Requisition',
})
class Requisition extends BaseEntity {
    id: string;
}


// Set the default URL root for all entities registered
export const storeConfig = {
    root: 'http://www.example.com/v0/',
    entities: { Requisition, LineItem }
};

function getEntityMetaData(Entity) {
    return {
        entity: Entity[ENTITY].metadata,
        resource: Entity[REST_RESOURCE].metadata
    }
}

function entityComposite(Entity) {
    const metaData = getEntityMetaData(Entity);

    let entityTypes: EntityTypes = {}

    if (metaData.entity.aggregateOf) {
        const AggregateEntity = storeConfig.entities[metaData.entity.aggregateOf];
        entityTypes.parent = AggregateEntity;
        entityTypes.child = Entity;
    }

    const parent = entityTypes.parent;
    parent[ENTITY].metadata;
    parent[REST_RESOURCE].metadata;

}

entityComposite(LineItem);

