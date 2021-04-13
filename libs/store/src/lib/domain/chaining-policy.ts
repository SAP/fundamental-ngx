import {
    // BaseEntity,
    IdentityKey
} from './entity';
import { AllowedFields, Type, IfTargetIncludeConditionType } from './utility';
import { BaseEntity } from '../infrastructure/persistence';

type EntityType<T> = BaseEntity<T> | Array<BaseEntity<T>>;

export type ChainingStrategy =
    | 'non-block' // call immediately and non-block (default)
    | 'block' // call immediately and block
    | 'suppress'; // don't call

export type ChainingStrategyFieldsMap<Entity extends {}> = IfTargetIncludeConditionType<
    Entity,
    EntityType<any>,
    ChainingStrategyMap<Entity>,
    never
>;

export type ChainingStrategyMap<Entity extends {}> = {
    [EntityField in AllowedFields<Entity, EntityType<any>>]: ChainingStrategy;
};

// tslint:disable-next-line: interface-over-type-literal
export type ChainingPolicy<Entity extends {}> = {
    fields: IfTargetIncludeConditionType<Entity, EntityType<any>, ChainingPolicyFieldsOption<Entity>, never>;
};

type ChainingPolicyFieldsOption<Entity extends {}> = {
    [EntityField in AllowedFields<Entity, EntityType<any>>]?: ChainingPolicyFieldOptions<
        Entity,
        Entity[EntityField]
    >;
};

// tslint:disable-next-line: interface-over-type-literal
export type ChainingPolicyFieldOptions<ParentEntity extends {}, ChildEntity extends EntityType<any>> = {
    type: ChildEntity extends any[] ? Array<Type<ChildEntity[number]>> : Type<ChildEntity>;
    strategy: ChainingStrategy;
    key?: ChainingPolicyPrimaryKey<ParentEntity>;
};

export type ChainingPolicyPrimaryKey<Entity> = AllowedFields<Entity, IdentityKey> | ((entity: Entity) => IdentityKey);
