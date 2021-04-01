import { DefaultEntityStore } from '../store';
import { EntityCollectionService } from '@ngrx/data';
import { QueryBuilder } from '../query/query-builder';
import { BaseEntity, BaseEntityDTO, BaseValue, RESTResource } from '@fundamental-ngx/store';
import { Type } from '../../../domain/public_api'

interface MoneyDTO {
    amount: number;
    currency: string
}

interface Item {
    title: string;
    price: number;
    amount: Money;
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
    id: number;
    title: string;
    amount: number;
    lineItems: Array<LineItem>;
}

class Requisition extends BaseEntity<ReqDTO> {
    id: number;
    title: string;
    amount: number;
    lineItems: Array<LineItem>;
}

const fromState = {
    id: 1,
    title: 'Req 1',
    amount: 10,
    lineItems: [
        new LineItem({ title: 'Line1' })
    ]
} as Requisition;

describe('should create proxy', () => {
    let entity: Type<Requisition>;
    let store: DefaultEntityStore<Requisition>;
    let collectionService: EntityCollectionService<Requisition>;
    let queryBuilder: QueryBuilder<Requisition>;
    let entityInstance: Requisition;

    beforeEach(() => {
        entity = Requisition;
        store = new DefaultEntityStore(entity, collectionService, queryBuilder);
        entityInstance = store.createEntityInstance(fromState);
    });

    it('should store be created', () => {
        expect(store).toBeTruthy();
    });

    it('should be changed', () => {
        const firstValue = 'Req 1';
        const changedValue = 'Change title';
        expect(entityInstance.title).toEqual(firstValue);

        entityInstance.title = changedValue;

        expect(entityInstance.title).toEqual(changedValue);
    });

    it('can create new instance Value Object', () => {
        expect(entityInstance.lineItems[0]).toBeInstanceOf(LineItem);
    });

    it('cannot change VO directly', () => {
        expect(Object.isFrozen(entityInstance.lineItems[0].dto)).toBeTrue();
    });

    it('can change VO through clone method', () => {
        const defaultValue = 'Line1';
        const changedValue = 'changedTitle';

        expect(entityInstance.lineItems[0].dto.title).toEqual(defaultValue);
        const lineToEdit = entityInstance.lineItems[0].clone();
        lineToEdit.title = changedValue;
        entityInstance.lineItems[0] = new LineItem(lineToEdit);

        expect(entityInstance.lineItems[0].dto.title).toEqual(changedValue);
    });

    it('can assign array with several items', () => {
        entityInstance.lineItems = [
            new LineItem({ title: 'Line1' }),
            new LineItem({ title: 'Line2' }),
            new LineItem({ title: 'Line3' })
        ];

        entityInstance.lineItems.push(new LineItem({ title: 'Line4' }));

        expect(entityInstance.lineItems[3].dto.title).toEqual('Line4');

        entityInstance.lineItems.push(new LineItem({ title: 'Line1' }));

        expect(entityInstance.lineItems[4]).toEqual(undefined);
    });
})
