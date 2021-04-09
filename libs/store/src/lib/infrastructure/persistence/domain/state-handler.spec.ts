import { DefaultEntityStore } from '../store';
import { EntityCollectionService } from '@ngrx/data';
import { QueryBuilder } from '../query/query-builder';
import { BaseEntity, BaseValue, RESTResource } from '@fundamental-ngx/store';
import { Type } from '../../../domain/public_api'

type IdentityKey = string | number;

interface MoneyDTO {
    amount: number;
    currency: string
}

interface Item {
    title: string;
    price: number;
    amount: Money;
}

interface ReqDTO {
    uniqueName: IdentityKey;
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

interface ReqDTO {
    uniqueName: IdentityKey;
    title: string;
    amount: number;
    lineItems: Array<LineItem>;
}

class Requisition extends BaseEntity<ReqDTO> {
    uniqueName: IdentityKey;
    title: string;
    amount: number;
    lineItems: Array<LineItem>;

    get identity(): IdentityKey {
        return this.value.uniqueName;
    }

    set identity(value) {
        this.value.uniqueName = value;
    }
}

const fromState = {
    uniqueName: 'ReqName',
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
        expect(entityInstance.value.title).toEqual(firstValue);

        entityInstance.value.title = changedValue;

        expect(entityInstance.value.title).toEqual(changedValue);
    });

    it('can create new instance Value Object', () => {
        expect(entityInstance.lineItems[0]).toBeInstanceOf(LineItem);
    });

    it('cannot change VO directly', () => {
        expect(Object.isFrozen(entityInstance.lineItems[0].value)).toBeTrue();
    });

    it('can change VO through clone method', () => {
        const defaultValue = 'Line1';
        const changedValue = 'changedTitle';

        expect(entityInstance.lineItems[0].value.title).toEqual(defaultValue);
        const lineToEdit = entityInstance.lineItems[0].clone();
        lineToEdit.title = changedValue;
        entityInstance.lineItems[0] = new LineItem(lineToEdit);

        expect(entityInstance.lineItems[0].value.title).toEqual(changedValue);
    });

    it('can assign array with several items', () => {
        entityInstance.lineItems = [
            new LineItem({ title: 'Line1' }),
            new LineItem({ title: 'Line2' }),
            new LineItem({ title: 'Line3' })
        ];

        entityInstance.lineItems.push(new LineItem({ title: 'Line4' }));

        expect(entityInstance.lineItems[3].value.title).toEqual('Line4');

        // push the same VO
        expect(() => entityInstance.lineItems[4] = new LineItem({ title: 'Line1' })).toThrow();
    });

    it('can treat dto', () => {
        expect(entityInstance.value).toEqual(fromState);
    });

    it('cat treat entity indenity', () => {
        expect(entityInstance.identity).toEqual(fromState.uniqueName);
    })
})
