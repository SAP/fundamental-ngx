import { Entity, IdentityKey, RESTResource, BaseEntity } from '@fundamental-ngx/store';
import { User, UserDTO } from './user.entity';

export interface ReqDTO {
    id: number;
    title: string;
    totalAmount: number;
    ownerId: string;
    owner?: UserDTO;
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
    get identity(): IdentityKey {
        return this.value.id;
    }
    get title(): string {
        return this.value.title;
    }
    get totalAmount(): number {
        return this.value.totalAmount;
    }
    get owner(): User {
        return new User(this.value.owner);
    }
    get ownerId(): string {
        return this.value.ownerId;
    }
}
