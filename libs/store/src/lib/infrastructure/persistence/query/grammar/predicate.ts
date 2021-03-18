export interface Predicate<TModel> {
    operands: Predicate<TModel> | Array<Predicate<TModel>>;
    readonly query: string;

    and(...operands: Array<Predicate<TModel>>): Predicate<TModel>;

    or(...operands: Array<Predicate<TModel>>): Predicate<TModel>;

    not(operand: Predicate<TModel>): Predicate<TModel>;

    test(target: TModel): boolean;
}

export class BasePredicate<TModel> implements Predicate<TModel> {
    operands: Predicate<TModel> | Array<Predicate<TModel>>;

    and(...operands: Array<Predicate<TModel>>): this {
        return this;
    }

    not(operand: Predicate<TModel>): this {
        return this;
    }

    or(...operands: Array<Predicate<TModel>>): this {
        return this;
    }

    test(target: TModel): boolean {
        return false;
    }

    get query(): string {
        return '';
    }
}

export class NotPredicate<TModel> extends BasePredicate<TModel> {
    constructor(public readonly predicate: Predicate<TModel>) {
        super();
    }

    test(target: TModel): boolean {
        return !this.predicate.test(target);
    }
}

export class ComparisonPredicate<
    TModel,
    TProperty extends keyof TModel,
    TPropertyValue extends TModel[TProperty]
> extends BasePredicate<TModel> {
    constructor(public readonly property: TProperty, public readonly value: TPropertyValue) {
        super();
    }
}

export class EqPredicate<
    TModel,
    TProperty extends keyof TModel,
    TPropertyValue extends TModel[TProperty]
> extends ComparisonPredicate<TModel, TProperty, TPropertyValue> {
    constructor(property: TProperty, value: TPropertyValue) {
        super(property, value);
    }

    test(target: TModel): boolean {
        const value = target[this.property];
        if (value instanceof Date) {
            return value.valueOf() === this.value.valueOf();
        }
        return value === this.value;
    }
}

export class GtPredicate<
    TModel,
    TProperty extends keyof TModel,
    TPropertyValue extends TModel[TProperty]
> extends ComparisonPredicate<TModel, TProperty, TPropertyValue> {
    constructor(property: TProperty, value: TPropertyValue) {
        super(property, value);
    }

    test(target: TModel): boolean {
        return target[this.property] > this.value;
    }
}

export class LtPredicate<
    TModel,
    TProperty extends keyof TModel,
    TPropertyValue extends TModel[TProperty]
> extends ComparisonPredicate<TModel, TProperty, TPropertyValue> {
    constructor(property: TProperty, value: TPropertyValue) {
        super(property, value);
    }

    test(target: TModel): boolean {
        return target[this.property] < this.value;
    }
}

export class GePredicate<
    TModel,
    TProperty extends keyof TModel,
    TPropertyValue extends TModel[TProperty]
> extends ComparisonPredicate<TModel, TProperty, TPropertyValue> {
    constructor(property: TProperty, value: TPropertyValue) {
        super(property, value);
    }

    test(target: TModel): boolean {
        return target[this.property] >= this.value;
    }
}

export class LePredicate<
    TModel,
    TProperty extends keyof TModel,
    TPropertyValue extends TModel[TProperty]
> extends ComparisonPredicate<TModel, TProperty, TPropertyValue> {
    constructor(property: TProperty, value: TPropertyValue) {
        super(property, value);
    }

    test(target: TModel): boolean {
        return target[this.property] <= this.value;
    }
}

export class ContainsPredicate<
    TModel,
    TProperty extends keyof TModel,
    TPropertyValue extends TModel[TProperty]
> extends ComparisonPredicate<TModel, TProperty, TPropertyValue> {
    constructor(property: TProperty, value: TPropertyValue, private caseSensitive: boolean) {
        super(property, value);
    }

    test(target: TModel): boolean {
        const value = target[this.property];
        if (typeof value === 'string' && typeof this.value === 'string') {
            const full = this.caseSensitive ? value : value.toLowerCase();
            const part = this.caseSensitive ? this.value : this.value.toLowerCase();
            return full.includes(part);
        }
        return false;
    }
}

export abstract class BinaryPredicate<TModel> extends BasePredicate<TModel> {
    constructor(public readonly operands: Array<Predicate<TModel>>) {
        super();
    }
}

export class AndPredicate<TModel> extends BinaryPredicate<TModel> {
    constructor(operands: Array<Predicate<TModel>>) {
        super(operands);
    }

    test(target: TModel): boolean {
        return this.operands.every((op) => op.test(target));
    }
}

export class OrPredicate<TModel> extends BinaryPredicate<TModel> {
    constructor(operands: Array<Predicate<TModel>>) {
        super(operands);
    }

    test(target: TModel): boolean {
        return this.operands.some((op) => op.test(target));
    }
}
