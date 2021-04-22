import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

interface CompanyDTO {
    id: string;
    name: string;
    // should be VO?
    address: {
        city: string;
        street: string;
        zip: string;
    };
}

@RESTResource({
    path: 'company'
})
@Entity<Company>({
    domain: 'Requisitioning',
    name: 'Company'
})
export class Company extends BaseEntity<CompanyDTO> {
    get identity(): IdentityKey {
        return this.value.id;
    }
}
