import { Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';
import { BaseEntity } from '@fundamental-ngx/store';
import { LineItem } from './line-items.value-object';

export interface ReqDTO {
    id: number;
    title: string;
    totalAmount: number;
    lineItems: Array<LineItem>;
}

@RESTResource({
    path: {
        default: 'requisitioning',
        add: '/cart'
    }
})
@Entity({
    domain: 'Requisitioning',
    name: 'Requisition',
})
export class Requisition extends BaseEntity<ReqDTO>{
    id: number;
    title: string;
    totalAmount: number;
    lineItems: Array<LineItem>;

    get identity(): IdentityKey {
        return this.value.id;
    }
}
