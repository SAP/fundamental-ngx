import { Injectable } from '@angular/core';
import {
    Predicate,
    EqPredicate,
    GePredicate,
    GtPredicate,
    LePredicate,
    LtPredicate,
    AndPredicate,
    OrPredicate,
} from './grammer/predicate';

export abstract class QueryAdapter<T> {
    abstract parsePredicate(predicate?: Predicate<T>): string;
}

@Injectable()
export class DefaultQueryAdapter<T> extends QueryAdapter<T> {
    parsePredicate(predicate?: Predicate<T>): string {
        if (predicate instanceof EqPredicate) {
            return predicate.property + ' eq ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof GePredicate) {
            return predicate.property + ' ge ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof GtPredicate) {
            return predicate.property + ' gt ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof LePredicate) {
            return predicate.property + ' le ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof LtPredicate) {
            return predicate.property + ' lt ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof AndPredicate) {
            const operands = predicate.operands.map(op => {
               return this.parsePredicate(op);
            });
            return '(' + operands.join(' and ') + ')';
        } else if (predicate instanceof OrPredicate) {
            const operands = predicate.operands.map(op => {
               return this.parsePredicate(op);
            });
            return '(' + operands.join(' or ') + ')';
        }
        return '';
    }

    _prepareValue(value: string | number): string {
        if (typeof value === 'number') {
            return value.toString();
        }
        return '\'' + value + '\'';
    }
}
