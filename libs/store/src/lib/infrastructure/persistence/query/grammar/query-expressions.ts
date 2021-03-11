import {
    AndPredicate,
    ContainsPredicate,
    EqPredicate,
    GePredicate,
    GtPredicate,
    LePredicate,
    LtPredicate,
    NotPredicate,
    OrPredicate,
    Predicate
} from './predicate';


export function and < TModel > (...args: Predicate < TModel >[]): AndPredicate < TModel > {
    return new AndPredicate < TModel > (args);
}

export function or < TModel > (...args: Predicate < TModel >[]): OrPredicate < TModel > {
    return new OrPredicate < TModel > (args);
}

export function not < TModel > (predicate: Predicate<TModel>): NotPredicate<TModel> {
    return new NotPredicate<TModel>(predicate);
}

export function eq < TModel,
TProperty extends keyof TModel,
TPropertyValue extends TModel[TProperty] > (property: TProperty, value: TPropertyValue): EqPredicate < TModel, TProperty, TPropertyValue > {
    return new EqPredicate < TModel,
    TProperty,
    TPropertyValue > (property, value);
}

export function gt < TModel,
TProperty extends keyof TModel,
TPropertyValue extends TModel[TProperty] > (property: TProperty, value: TPropertyValue): EqPredicate < TModel, TProperty, TPropertyValue > {
    return new GtPredicate < TModel,
    TProperty,
    TPropertyValue > (property, value);
}

export function lt < TModel,
TProperty extends keyof TModel,
TPropertyValue extends TModel[TProperty] > (property: TProperty, value: TPropertyValue): EqPredicate < TModel, TProperty, TPropertyValue > {
    return new LtPredicate < TModel,
    TProperty,
    TPropertyValue > (property, value);
}

export function ge < TModel,
TProperty extends keyof TModel,
TPropertyValue extends TModel[TProperty] > (property: TProperty, value: TPropertyValue): EqPredicate < TModel, TProperty, TPropertyValue > {
    return new GePredicate < TModel,
    TProperty,
    TPropertyValue > (property, value);
}

export function le < TModel,
TProperty extends keyof TModel,
TPropertyValue extends TModel[TProperty] > (property: TProperty, value: TPropertyValue): EqPredicate < TModel, TProperty, TPropertyValue > {
    return new LePredicate < TModel,
    TProperty,
    TPropertyValue > (property, value);
}

export function contains < TModel,
TProperty extends keyof TModel,
TPropertyValue extends TModel[TProperty] >
(property: TProperty, value: TPropertyValue, caseSensitive?: boolean): EqPredicate < TModel, TProperty, TPropertyValue > {
    return new ContainsPredicate < TModel,
    TProperty,
    TPropertyValue > (property, value, caseSensitive);
}
