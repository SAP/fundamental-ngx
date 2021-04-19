import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

@RESTResource({
    path: '/requisitions/:reqId/lineItems'
})
@Entity<LineItem>({
    domain: 'Requisitioning',
    name: 'LineItem',
    aggregateOf: 'Requisition'
})
export class LineItem extends BaseEntity<any> {
    lineItemId: string;
    reqId: string;

    get identity(): IdentityKey {
        return this.lineItemId;
    }
}
