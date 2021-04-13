import { Entity, RESTResource, FundamentalStoreConfig, BaseEntity } from '@fundamental-ngx/store';
import { Requisition, LineItem, User, Company } from './entities';

// interface EntityComposite {
//     getTypes();
// }
//
// interface Field<T> {
//     [key: string]: T;
// }
//
// export class BaseValue {
//     lineItems: Array<any>;
//     clone() {}
// }
//
// export type Class<T> = new (...args: any[]) => T;
//
// export interface EntityTypes {
//     [index: string]: Class<BaseEntity>;
// }
//
// @RESTResource({
//     path: 'company'
// })
// @Entity<Company>({
//     domain: 'Requisitioning',
//     name: 'Company'
// })
// class Company extends BaseEntity {
//     id: string;
//     name: string;
//     address: {
//         city: string;
//         street: string;
//         zip: string;
//     };
// }
// @RESTResource({
//     path: 'user'
// })
// @Entity<User>({
//     domain: 'Requisitioning',
//     name: 'User',
//     chainingPolicy: {
//         fields: {
//             company: {
//                 strategy: 'non-block',
//                 type: Company,
//                 key: 'companyId'
//             }
//         }
//     }
// })
// class User extends BaseEntity {
//     id: string;
//     firstName: string;
//     lastName: string;
//     role: string;
//     companyId: string;
//     company: Company;
// }
//
// @RESTResource({
//     path: '/requisitions/:reqId/lineItems'
// })
// @Entity<LineItem>({
//     domain: 'Requisitioning',
//     name: 'LineItem',
//     primaryKey: 'lineItemId', // if not provided 'id' is assumed to be primaryKey
//     aggregateOf: 'Requisition'
// })
// class LineItem extends BaseEntity {
//     lineItemId: string;
//     reqId: string;
// }
//
// // URI with endpoints for different actions
// @RESTResource({
//     path: {
//         default: 'requisition',
//         add: '/cart',
//         getAll: '/requisitions',
//         update: ['PATCH', '/requisition']
//     }
// })
// @Entity<Requisition>({
//     domain: 'Requisitioning',
//     name: 'Requisition',
//     chainingPolicy: {
//         fields: {
//             owner: {
//                 strategy: 'non-block',
//                 type: User,
//                 key: 'ownerId'
//             }
//         }
//     }
// })
// export class Requisition extends BaseEntity {
//     id: string;
//     title: string;
//     totalAmount: number;
//     owner: User;
//     ownerId: string;
//     lineItems: LineItem[];
// }

// Set the default URL root for all entities registered
export const storeConfig: FundamentalStoreConfig = {
    root: 'http://localhost:3000/',
    entities: { Requisition: Requisition, LineItem: LineItem, User: User, Company: Company },
    enableDevtools: true
};
