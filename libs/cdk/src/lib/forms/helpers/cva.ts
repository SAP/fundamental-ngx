import { Type } from '@angular/core';
import { CvaDirective } from '../cva/cva.directive';

export const addCvaDirective:
    | Type<unknown>
    | {
          directive: Type<unknown>;
          inputs?: string[];
          outputs?: string[];
      } = {
    directive: CvaDirective,
    inputs: ['id', 'placeholder', 'state', 'stateMessage', 'disabled', 'readonly', 'name']
};
