import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';
import { Company, CompanyDTO } from './company.entity';

export interface UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId: string;
    company?: CompanyDTO;
}

@RESTResource({
    path: 'user'
})
@Entity<User>({
    domain: 'Requisitioning',
    name: 'User',
    chainingPolicy: {
        fields: {
            company: {
                strategy: 'non-block',
                type: Company,
                key: 'companyId'
            }
        }
    }
})
export class User extends BaseEntity<UserDTO> {
    get identity(): IdentityKey {
        return this.value.id;
    }
    get firstName(): string {
        return this.value.firstName;
    }
    get lastName(): string {
        return this.value.lastName;
    }
    get role(): string {
        return this.value.role;
    }
    get companyId(): string {
        return this.value.companyId;
    }
    get company(): Company {
        return new Company(this.value.company);
    }
}
