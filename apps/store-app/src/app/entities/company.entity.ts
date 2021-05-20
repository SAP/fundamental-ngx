import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';

interface Address {
    city: string;
    street: string;
    zip: string;
}

export interface CompanyDTO {
    id: string;
    name: string;
    // should be VO?
    address: Address;
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
    get name(): string {
        return this.value.name;
    }
    get address(): Address {
        return this.value.address;
    }
}
