import { BaseEntity, Entity, IdentityKey, RESTResource } from '@fundamental-ngx/store';
import { Company } from './company.entity';

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
export class User extends BaseEntity<any> {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    companyId: string;
    company: Company;

    get identity(): IdentityKey {
        return this.value.id;
    }
}
