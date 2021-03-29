import { BaseValue, RESTResource } from '@fundamental-ngx/store';
import { Money } from './money.value-object';

export interface Item {
    title: string;
    price: number;
    amount: Money;
}

@RESTResource({
    root: 'http://www.example.com/v1/',
    path: '/requisitions/:reqId/lineItems',
})
export class LineItem extends BaseValue<Item> {
    amount: Money;
    title: string;

    constructor(dto?) {
        super(dto);
    }
}

