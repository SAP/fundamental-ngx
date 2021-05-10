import { BaseEntity, BaseValue } from '../domain/base-classes';
import { RESTResource } from '../../../domain/decorators';
import { IdentityKey } from '../../../domain/public_api';
import { instanceForType } from './state-handler';

interface MoneyDTO {
    amount: number;
    currency: string;
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

class Money extends BaseValue<MoneyDTO> implements MoneyDTO {
    amount: number;
    currency: string;

    constructor(dto: MoneyDTO) {
        super(dto);
    }
}

@RESTResource({
    root: 'http://www.example.com/v1/',
    path: '/requisitions/:reqId/lineItems'
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
    total: Money;
    lineItems: Array<LineItem>;
}

class Requisition extends BaseEntity<ReqDTO> {
    uniqueName: IdentityKey;
    title: string;
    amount: number;
    total: Money;
    lineItems: Array<LineItem>;

    get identity(): IdentityKey {
        return this.value.uniqueName;
    }

    _accessorValue: string;
    set accessor(value: string) {
        this._accessorValue = value;
    }
    get accessor(): string {
        return this._accessorValue;
    }
}

describe('Proxy State Handler', () => {
    let entityInstance: Requisition;
    const createReqDTO = (): ReqDTO => ({
        uniqueName: 'ReqName',
        title: 'Req 1',
        amount: 10,
        total: new Money({ amount: 100, currency: '$' }),
        lineItems: [new LineItem({ title: 'Line1' })]
    });

    beforeEach(() => {
        entityInstance = instanceForType(Requisition, createReqDTO());
    });

    it('should create instance of entity', () => {
        expect(entityInstance instanceof Requisition).toBeTruthy();
    });

    it('should keep dto in entity "value" property', () => {
        expect(entityInstance.value).toEqual(createReqDTO());
    });

    it('should has "identity" property and return entity id', () => {
        expect(entityInstance.identity).toBe('ReqName');
    });

    describe('entity get/set primitive values', () => {
        it('should get primitive value from entity instance directly', () => {
            expect(entityInstance.title).toBe('Req 1');
        });

        it('should set new value from entity instance directly', () => {
            expect(entityInstance.title).toBe('Req 1');
            entityInstance.title = 'Change title';
            expect(entityInstance.title).toBe('Change title');
        });

        it('should get primitive value from entity.value scope', () => {
            expect(entityInstance.value.title).toBe('Req 1');
        });

        it('should set new value in entity.value scope', () => {
            expect(entityInstance.value.title).toBe('Req 1');
            entityInstance.value.title = 'Change title';
            expect(entityInstance.value.title).toBe('Change title');
        });

        it('should handle "set" accessor properly', () => {
            expect(entityInstance._accessorValue).toBe(undefined);
            entityInstance.accessor = 'new value from setter';
            expect(entityInstance._accessorValue).toBe('new value from setter');
        });

        it('should handle "get" accessor properly', () => {
            expect(entityInstance.accessor).toBe(undefined);
            entityInstance._accessorValue = 'new value for getter';
            expect(entityInstance.accessor).toBe('new value for getter');
        });
    });

    describe('entity get/set Value Object values', () => {
        it('should be able to assign new VO via clone method', () => {
            expect(entityInstance.total.currency).toBe('$');

            const dto = entityInstance.total.clone();
            entityInstance.total = new Money({ ...dto, currency: 'UH' });

            expect(entityInstance.total.currency).toBe('UH');
        });

        it('should throw an error when change VO directly', (done) => {
            expect(entityInstance.total.currency).toBe('$');
            try {
                entityInstance.total.currency = 'UH';
            } catch (error) {
                expect(entityInstance.total.currency).toBe('$');
                done();
            }
        });

        it('should be able to assign array with several items', () => {
            entityInstance.lineItems = [
                new LineItem({ title: 'Line1' }),
                new LineItem({ title: 'Line2' }),
                new LineItem({ title: 'Line3' })
            ];
            entityInstance.lineItems.push(new LineItem({ title: 'Line4' }));

            expect(entityInstance.lineItems).toEqual([
                new LineItem({ title: 'Line1' }),
                new LineItem({ title: 'Line2' }),
                new LineItem({ title: 'Line3' }),
                new LineItem({ title: 'Line4' })
            ]);
        });

        it('should throw error assigning VO with the same model', () => {
            // plain vo
            entityInstance.total = new Money({ amount: 10, currency: '$' });
            expect(() => {
                entityInstance.total = new Money({ amount: 10, currency: '$' });
            }).toThrow();
            // the same for array of vo
            entityInstance.lineItems = [new LineItem({ title: 'Line1' })];
            expect(() => {
                entityInstance.lineItems[1] = new LineItem({ title: 'Line1' });
            }).toThrow();
        });
    });
});
