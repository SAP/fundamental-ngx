import { IdentityKey, BaseEntity } from './entity';
import { AllowedFields, Type, IfTargetIncludeConditionType } from './utility';

export type ChainingStrategy =
    | 'non-block' // call immediately and non-block (default)
    | 'block' // call immediately and block
    | 'suppress'; // don't call

export type ChainingStrategyFieldsMap<Entity extends {}> = IfTargetIncludeConditionType<
    Entity,
    BaseEntity | Array<BaseEntity>,
    ChainingStrategyMap<Entity>,
    never
    >;

export type ChainingStrategyMap<Entity extends {}> = {
    [EntityField in AllowedFields<Entity, BaseEntity | Array<BaseEntity>>]: ChainingStrategy;
};

// tslint:disable-next-line: interface-over-type-literal
export type ChainingPolicy<Entity extends {}> = {
    fields: IfTargetIncludeConditionType<Entity, BaseEntity | BaseEntity[], ChainingPolicyFieldsOption<Entity>, never>;
};

type ChainingPolicyFieldsOption<Entity extends {}> = {
    [EntityField in AllowedFields<Entity, BaseEntity | Array<BaseEntity>>]?: ChainingPolicyFieldOptions<
        Entity,
        Entity[EntityField]
        >;
};

// tslint:disable-next-line: interface-over-type-literal
export type ChainingPolicyFieldOptions<ParentEntity extends {}, ChildEntity extends BaseEntity | Array<BaseEntity>> = {
    type: ChildEntity extends any[] ? Array<Type<ChildEntity[number]>> : Type<ChildEntity>;
    strategy: ChainingStrategy;
    key?: ChainingPolicyPrimaryKey<ParentEntity>;
};

export type ChainingPolicyPrimaryKey<Entity> = AllowedFields<Entity, IdentityKey> | ((entity: Entity) => IdentityKey);
