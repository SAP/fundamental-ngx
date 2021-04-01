import 'reflect-metadata';
import { Entity, RESTResource } from '@fundamental-ngx/store';
import { BaseEntityDTO } from '@fundamental-ngx/store';
import { BaseEntity } from '@fundamental-ngx/store';
import { LineItem } from './line-items.value-object';

export interface ReqDTO extends BaseEntityDTO {
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
export class Requisition extends BaseEntity<ReqDTO> {
    title: string;
    totalAmount: number;
    lineItems: Array<LineItem>;
}
