import { Observable } from 'rxjs';

export interface QueryBuilder<TModel> {
    where<TP extends keyof TModel, TPT extends TModel[TP]>(predicate: Predicate<TModel>): QueryBuilder<TModel>;

    create(): Query<TModel>;
}

export interface Predicate<TModel> {
    operands: Predicate<TModel> | Array<Predicate<TModel>>;

    and(...operands: Array<Predicate<TModel>>): Predicate<TModel>;

    or(...operands: Array<Predicate<TModel>>): Predicate<TModel>;

    not(operand: Predicate<TModel>): Predicate<TModel>;
}

export interface Query<TModel> {
    orderBy(): this;

    minResult(start: number): this;

    maxResult(size: number): this;

    previous(): this;

    next(): this;

    select(): Observable<TModel | Array<TModel>>;
}
