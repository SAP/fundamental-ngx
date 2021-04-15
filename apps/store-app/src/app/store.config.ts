import { FundamentalStoreConfig } from '@fundamental-ngx/store';
import { Requisition, LineItem, User, Company } from './entities';

// Set the default URL root for all entities registered
export const storeConfig: FundamentalStoreConfig = {
    root: 'http://localhost:3000/',
    entities: { Requisition: Requisition, LineItem: LineItem, User: User, Company: Company },
    enableDevtools: true
};
