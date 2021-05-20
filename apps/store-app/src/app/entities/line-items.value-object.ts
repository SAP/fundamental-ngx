import { BaseValue, RESTResource } from '@fundamental-ngx/store';
import { Money, MoneyDTO } from './money.value-object';

export interface LineItemDTO {
    title: string;
    price: number;
    amount: MoneyDTO;
}

@RESTResource({
    root: 'http://www.example.com/v1/',
    path: '/requisitions/:reqId/lineItems'
})
export class LineItem extends BaseValue<LineItemDTO> {
    get title(): string {
        return this.value.title;
    }
    get price(): number {
        return this.value.price;
    }
    get amount(): Money {
        return new Money(this.value.amount);
    }
}
