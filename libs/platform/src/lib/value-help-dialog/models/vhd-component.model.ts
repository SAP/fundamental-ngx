import { QueryList } from '@angular/core';
import { ValueHelpColumnDefDirective } from '../directives/value-help-column-def.directive';

export abstract class VhdComponent {
    abstract columnDef: QueryList<ValueHelpColumnDefDirective>;
}
