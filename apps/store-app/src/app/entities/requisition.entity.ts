import { Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';
import { BaseEntity } from '@fundamental-ngx/store';
import { LineItem } from './line-items.value-object';
import { User } from './user.entity';

export interface ReqDTO {
    id: number;
    title: string;
    totalAmount: number;
    owner: User;
    ownerId: string;
    lineItems: Array<LineItem>;
}

// URI with endpoints for different actions
@RESTResource({
    path: {
        default: 'requisition',
        add: '/cart',
        getAll: '/requisitions',
        update: ['PATCH', '/requisition']
    }
})
@Entity<Requisition>({
    domain: 'Requisitioning',
    name: 'Requisition',
    chainingPolicy: {
        fields: {
            owner: {
                strategy: 'non-block',
                type: User,
                key: 'ownerId'
            }
        }
    }
})
export class Requisition extends BaseEntity<ReqDTO> {
    id: string;
    title: string;
    totalAmount: number;
    owner: User;
    ownerId: string;
    lineItems: LineItem[];

    get identity(): IdentityKey {
        return this.value.id;
    }
}
