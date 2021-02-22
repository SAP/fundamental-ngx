import { Entity, RESTResource} from '@fundamental-ngx/store';
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

export class Dependency {
    name: 'Dependency';
}

// URI with endpoints for different actions
@RESTResource({
    path: {
        default: 'requisitioning',
        add: '/cart',
        getAll: '/requisitions',
        update: ['PATCH', '/requisition']
    }
})
@Entity({
    domain: 'Requisitioning',
    name: 'Requisition',
})
export class Requisition extends BaseEntity {
    id: string;

    constructor(public dep: Dependency) {
        super();
    }
}

// Set the default URL root for all entities registered
export const storeConfig = {
    root: 'http://www.example.com/v0/',
    entities: { Requisition, LineItem }
};

