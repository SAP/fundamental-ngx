import {
    IdentityKey
} from './entity';
import { AllowedFields, Type, IfTargetIncludeConditionType } from './utility';
import { BaseEntity } from '../infrastructure/persistence';

type EntityType = BaseEntity | Array<BaseEntity>;

export type ChainingStrategy =
    | 'non-block' // call immediately and non-block (default)
    | 'block' // call immediately and block
    | 'suppress'; // don't call

export type ChainingStrategyFieldsMap<Entity extends {}> = IfTargetIncludeConditionType<
    Entity,
    EntityType,
    ChainingStrategyMap<Entity>,
    never
>;

export type ChainingStrategyMap<Entity extends {}> = {
    [EntityField in AllowedFields<Entity, EntityType>]: ChainingStrategy;
};

// tslint:disable-next-line: interface-over-type-literal
export type ChainingPolicy<Entity extends {}> = {
    fields: IfTargetIncludeConditionType<Entity, EntityType, ChainingPolicyFieldsOption<Entity>, never>;
};

type ChainingPolicyFieldsOption<Entity extends {}> = {
    [EntityField in AllowedFields<Entity, EntityType>]?: ChainingPolicyFieldOptions<
        Entity,
        Entity[EntityField]
    >;
};

// tslint:disable-next-line: interface-over-type-literal
export type ChainingPolicyFieldOptions<ParentEntity extends {}, ChildEntity extends EntityType> = {
    type: ChildEntity extends any[] ? Array<Type<ChildEntity[number]>> : Type<ChildEntity>;
    strategy: ChainingStrategy;
    key?: ChainingPolicyPrimaryKey<ParentEntity>;
};

export type ChainingPolicyPrimaryKey<Entity> = AllowedFields<Entity, IdentityKey> | ((entity: Entity) => IdentityKey);
