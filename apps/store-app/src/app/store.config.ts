import { Entity, RESTResource, FundamentalStoreConfig, BaseEntity, ChainingPolicy } from '@fundamental-ngx/store';

interface EntityComposite {
    getTypes();
}

interface Field<T> {
    [key: string]: T;
}

export class BaseValue {
    lineItems: Array<any>;
    clone() {}
}

export type Class<T> = new (...args: any[]) => T;

export interface EntityTypes {
    [index: string]: Class<BaseEntity>;
}

@RESTResource({
    path: '/requisitions/:reqId/lineItems'
})
@Entity<LineItem>({
    domain: 'Requisitioning',
    name: 'LineItem',
    primaryKey: 'lineItemId', // if not provided 'id' is assumed to be primaryKey
    aggregateOf: 'Requisition'
})
class LineItem extends BaseEntity {
    lineItemId: string;
    reqId: string;
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
@Entity<Requisition>({
    domain: 'Requisitioning',
    name: 'Requisition',
    chainingPolicy: {
        fields: {
            lineItems: {
                strategy: 'non-block',
                type: Array(LineItem)
            }
        }
    }
})
export class Requisition extends BaseEntity {
    id: string;
    title: string;
    totalAmount: number;
    lineItems: LineItem[];
}

// Set the default URL root for all entities registered
export const storeConfig: FundamentalStoreConfig = {
    root: 'http://www.example.com/v0/',
    entities: { Requisition: Requisition, LineItem: LineItem },
    enableDevtools: true
};
