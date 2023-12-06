import { Type } from '@angular/core';
import { DataSourceDirective } from '../data-source.directive';

export const applyDatasourceDirective:
    | Type<unknown>
    | {
          directive: Type<unknown>;
          inputs?: string[];
          outputs?: string[];
      } = {
    directive: DataSourceDirective,
    inputs: ['dataSource'],
    outputs: ['dataChanged']
};
