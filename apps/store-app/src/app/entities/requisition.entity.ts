import { BaseEntity, Entity, RESTResource } from '@fundamental-ngx/store';
import { LineItems, LineItem } from './line-items.value-object';

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
export class Requisition<TModel> extends BaseEntity<TModel> {;

    lineItems: LineItems;

    identity(): number {
        return this.id;
    }
}

const req = new Requisition(1, { foo: 'asd'});



