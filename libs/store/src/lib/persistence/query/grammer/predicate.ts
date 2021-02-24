export interface Predicate < TModel > {
    operands: Predicate < TModel > | Array < Predicate < TModel >> ;
    readonly query: string;

    and(...operands: Array < Predicate < TModel >> ): Predicate < TModel > ;

    or(...operands: Array < Predicate < TModel >> ): Predicate < TModel > ;

    not(operand: Predicate < TModel > ): Predicate < TModel > ;

    test(target: TModel): boolean;
}

export class BasePredicate < TModel > implements Predicate < TModel > {
    operands: Predicate < TModel > | Array < Predicate < TModel >> ;

    and(...operands: Array < Predicate < TModel >> ): this {
        return this;
    }

    not(operand: Predicate < TModel > ): this {
        return this;
    }

    or(...operands: Array < Predicate < TModel >> ): this {
        return this;
    }

    test(target: TModel): boolean {
        return false;
    }

    get query(): string {
        return '';
    }
}

export class NotPredicate<TModel> extends BasePredicate<TModel> {}

export class ComparisonPredicate <TModel, TProperty extends keyof TModel, TPropertyValue extends TModel[TProperty]>
    extends BasePredicate <TModel> {

        constructor(public readonly property: TProperty, public readonly value: TPropertyValue) {
            super();
        }
    }

export class EqPredicate < TModel, TProperty extends keyof TModel, TPropertyValue extends TModel[TProperty] >
    extends ComparisonPredicate < TModel, TProperty, TPropertyValue > {

        constructor(property: TProperty, value: TPropertyValue) {
            super(property, value);
        }
    }

export class GtPredicate < TModel, TProperty extends keyof TModel, TPropertyValue extends TModel[TProperty] >
    extends ComparisonPredicate < TModel, TProperty, TPropertyValue > {

        constructor(property: TProperty, value: TPropertyValue) {
            super(property, value);
        }
    }

export class LtPredicate < TModel, TProperty extends keyof TModel, TPropertyValue extends TModel[TProperty] >
    extends ComparisonPredicate < TModel, TProperty, TPropertyValue > {

        constructor(property: TProperty, value: TPropertyValue) {
            super(property, value);
        }
    }

export class GePredicate < TModel, TProperty extends keyof TModel, TPropertyValue extends TModel[TProperty] >
    extends ComparisonPredicate < TModel, TProperty, TPropertyValue > {

        constructor(property: TProperty, value: TPropertyValue) {
            super(property, value);
        }
    }

export class LePredicate < TModel, TProperty extends keyof TModel, TPropertyValue extends TModel[TProperty] >
    extends ComparisonPredicate < TModel, TProperty, TPropertyValue > {

        constructor(property: TProperty, value: TPropertyValue) {
            super(property, value);
        }
    }

export abstract class BinaryPredicate < TModel > extends BasePredicate < TModel > {

    constructor(public readonly operands: Array < Predicate < TModel >> ) {
        super();
    }
}

export class AndPredicate < TModel > extends BinaryPredicate < TModel > {

    constructor(operands: Array < Predicate < TModel >> ) {
        super(operands);
    }
}

export class OrPredicate < TModel > extends BinaryPredicate < TModel > {

    constructor(operands: Array < Predicate < TModel >> ) {
        super(operands);
    }
}
