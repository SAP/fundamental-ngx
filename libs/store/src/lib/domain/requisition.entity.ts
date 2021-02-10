// import { BaseEntity } from './base.entity';

export class RequisitionEntity {

}

class BaseEntity {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}

class BaseValue {
    amount: number;
}

export function Entity(config) {
    return (target: any): void => {
        if (!target) {
            return;
        }
    };
}

@Entity({
    root: 'http://www.example.com/v1/',
    path: '/requisitions/:reqId/lineItems',
})
class LineItem extends BaseValue {
    className = 'LineItem';
    reqId: string;
}
