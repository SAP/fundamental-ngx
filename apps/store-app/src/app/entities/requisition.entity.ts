import { BaseValue, Entity, RESTResource } from '@fundamental-ngx/store';
import { LineItems, LineItem } from './line-items.value-object';
import { BaseEntity, BaseEntityDTO } from '../../../../../libs/store/src/lib/domain/base-classes/base-entity';
import { Money } from './money.value-object';

import 'reflect-metadata';

interface ReqDTO extends BaseEntityDTO {
    title: string;
    totalAmount: Money;
}

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
export class Requisition extends BaseEntity<ReqDTO> implements ReqDTO {
    lineItems: Array<LineItems>;
    title: string;

    constructor(
        dto?: ReqDTO
    ) {
        super(dto);
    }

    identity(): number {
        return this.id;
    }

    // get title() {
    //     return this.dto.title;
    // }

    get createdAt() {
        return this.dto.createdAt;
    }

    get updatedAt() {
        return this.dto.updatedAt;
    }

    get totalAmount() {
        if (this.dto) {
            return this.dto.totalAmount;
        }
    }

    set totalAmount(value: Money) {
        if (this.dto) {
            this.dto.totalAmount = value;
        }
    }
}

// const req = new Requisition({
//     title: 'REQ123',
//     createdAt: '000',
//     updatedAt: '111',
//     totalAmount: Money.create({ amount: 123, currency: 'USD' })
// });

// const clonedMoney = req.totalAmount.clone();
const newMoney = Money.create({ amount: 111, currency: 'EUR' });
// const isEqual = newMoney.equals(clonedMoney as Money);

// if (!isEqual) {
    // req.totalAmount = newMoney;
// }

// @ts-ignore
const myReq: Requisition = newInstanceForType(Requisition);
// myReq.totalAmount = Money.create({ amount: 1235, currency: 'UAH' });
// console.log('amount', myReq.totalAmount.currency);
myReq.totalAmount = new Money({ amount: 555, currency: 'USD' });
console.log('totalAmount', myReq.totalAmount);

export type Class<T>  = new(...args: any[]) => T;

// Proxy handler
function newInstanceForType<T, R>(Type: Class<T>, fromState?: R){
    const newState = new Type();

    // @ts-ignore
    // const handler = new NgrxStateHandler<T>(req);
    return new Proxy(newState, {
        get(t: any, p: PropertyKey, r: any): any {
            return t[p] || null;
        },
        set(target: T, key: PropertyKey, value: Class<T>, receiver: any): boolean {
            console.log('Setting internally property', key, value);
            if (value instanceof BaseValue) {
                const isEqual = value.equals(target[key]);
                if (!isEqual) {
                    let clonedVO = target[key] && target[key].clone();
                    if (clonedVO) {
                        clonedVO.amount = new value();
                        target[key] = clonedVO;
                    }
                    target[key] = value;
                    // console.log('newState', newState, newState[key]);
                }

            }
            // 1. Check if Changed
            // 2. Emit Event to EntityStoreServer
            // 3. Assign value
            // target[key] = value;

            return true;
        }

    });
}
export class NgrxStateHandler<TModel> {
    constructor(private targetState?: TModel) {
    }

    // get(t: any, p: PropertyKey, r: any): any {
    //     return this._target[p];
    // }
    //
    // set(target: TModel, key: PropertyKey, value: any, receiver: any): boolean {
    //     console.log('Setting internally property', key);
    //     // 1. Check if Changed
    //     // 2. Emit Event to EntityStoreServer
    //     // 3. Assign value
    //     this.targetState[key] = value;
    //
    //     return true;
    // }
}





