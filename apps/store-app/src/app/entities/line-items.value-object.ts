import { BaseValue, ENTITY, Entity, REST_RESOURCE, RESTResource } from '@fundamental-ngx/store';

export interface LineItem {
    title: string;
    price: number;
    amount: number;
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
export class LineItems extends BaseValue<LineItem> {
    constructor(props) {
        super(props);
    }

    get title() {
        return this.props.title;
    }

    get price() {
        return this.props.price;
    }

    get amount() {
        return this.props.amount;
    }
}

