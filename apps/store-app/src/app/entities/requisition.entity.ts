import 'reflect-metadata';
import { Entity, RESTResource } from '@fundamental-ngx/store';
import { LineItem } from './line-items.value-object';
import { BaseEntityDTO } from '../../../../../libs/store/src/lib/infrastructure/persistence/domain/base-classes/base-entity';
import { BaseEntity } from '../../../../../libs/store/src/lib/infrastructure/persistence/domain/base-classes/base-entity';

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
