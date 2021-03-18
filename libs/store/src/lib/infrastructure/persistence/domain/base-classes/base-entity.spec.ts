import { DefaultEntityStore } from '../../store';
import { EntityCollectionService } from '@ngrx/data';
import { QueryBuilder } from '../../query/query-builder';
import { BaseEntity, BaseEntityDTO, BaseValue, RESTResource } from '@fundamental-ngx/store';
import { instanceForType } from '../state-handler';

interface MoneyDTO {
    amount: number;
    currency: string
}

interface Item {
    title?: string;
    price?: number;
    amount?: Money;
}

interface ReqDTO extends BaseEntityDTO {
    title: string;
    amount: number;
    lineItems: Array<LineItem>;
}

class Money extends BaseValue<MoneyDTO> {
    constructor(value?: MoneyDTO) {
        super(value);
    }
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

interface ReqDTO extends BaseEntityDTO {
    title: string;
    amount: number;
    lineItems: Array<LineItem>;
}

class Requisition extends BaseEntity<ReqDTO> {
    title: string;
    lineItems: Array<LineItem>;
}

const fromState = {
    id: 1,
    title: 'Req 1',
    amount: 10,
    lineItems: [
        // { title: 'Line0', price: 100, amount: { currency: 'EUR', amount: 200 }},
        // { title: 'Line1', price: 200, amount: { currency: 'USD', amount: 100 }},
    ]
}

describe('should create proxy', () => {
    let store: DefaultEntityStore<Requisition>;
    let collectionService: EntityCollectionService<Requisition>;
    let queryBuilder: QueryBuilder<Requisition>;
    let valueState: Requisition;

    beforeEach(() => {
        valueState = instanceForType(Requisition, fromState);
        store = new DefaultEntityStore(collectionService, queryBuilder, valueState);
    });

    it('should store be created', () => {
        expect(store).toBeTruthy();
    });

    it('should be get value title', () => {
        const expectedTitle = 'Req 1';
        expect(store.value.title).toEqual(expectedTitle);
    });

    it('should be changed', () => {
        const firstValue = 'Req 1';
        const changedValue = 'Change title';
        expect(store.value.title).toEqual(firstValue);

        store.value.title = changedValue;

        expect(store.value.title).toEqual(changedValue);
    });

    it('can create new instance Value Object', () => {
        store.value.lineItems[0] = new LineItem();

        expect(store.value.lineItems[0]).toBeInstanceOf(LineItem);
    });

    it('cannot assign the same equality new VO', () => {
        store.value.lineItems[0] = new LineItem({ title: 'Line1' });

        store.value.lineItems[0] = new LineItem({ title: 'Line1' });

        expect(store.value.lineItems[0].dto.title).toEqual('Line1');
        expect(store.value.lineItems[1]).toEqual(undefined);

    });

    it('can assign array with several items', () => {
       store.value.lineItems = [
           new LineItem({ title: 'Line1' }),
           new LineItem({ title: 'Line2' }),
           new LineItem({ title: 'Line3' })
       ];

       store.value.lineItems.push(new LineItem({ title: 'Line4'}));

       expect(store.value.lineItems[0].dto.title).toEqual('Line1');
       expect(store.value.lineItems[3].dto.title).toEqual('Line4');
    });
})
