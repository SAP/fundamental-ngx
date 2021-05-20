import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

export interface LineItemDTO {
    lineItemId: string;
    reqId: string;
}

@RESTResource({
    path: '/requisitions/:reqId/lineItems'
})
@Entity<LineItem>({
    domain: 'Requisitioning',
    name: 'LineItem',
    aggregateOf: 'Requisition'
})
export class LineItem extends BaseEntity<LineItemDTO> {
    get identity(): IdentityKey {
        return this.value.lineItemId;
    }
    get reqId(): string {
        return this.value.reqId;
    }
}
