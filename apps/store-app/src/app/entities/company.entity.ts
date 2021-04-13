import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

@RESTResource({
    path: 'company'
})
@Entity<Company>({
    domain: 'Requisitioning',
    name: 'Company'
})
export class Company extends BaseEntity<any> {
    id: string;
    name: string;
    address: {
        city: string;
        street: string;
        zip: string;
    };

    get identity(): IdentityKey {
        return this.value.id;
    }
}
