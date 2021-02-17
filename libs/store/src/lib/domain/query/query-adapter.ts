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
    parsePredicate(p?: Predicate<T>): string {
        if (p instanceof EqPredicate) {
            return p.property + ' eq \'' + p.value + '\'';
        } else if (p instanceof GePredicate) {
            return p.property + ' ge ' + p.value;
        } else if (p instanceof GtPredicate) {
            return p.property + ' gt ' + p.value;
        } else if (p instanceof LePredicate) {
            return p.property + ' le ' + p.value;
        } else if (p instanceof LtPredicate) {
            return p.property + ' lt ' + p.value;
        } else if (p instanceof AndPredicate) {
            const operands = p.operands.map(op => {
               return this.parsePredicate(op);
            });
            return '(' + operands.join(' and ') + ')';
        } else if (p instanceof OrPredicate) {
            const operands = p.operands.map(op => {
               return this.parsePredicate(op);
            });
            return '(' + operands.join(' or ') + ')';
        }
        return '';
    }
}
