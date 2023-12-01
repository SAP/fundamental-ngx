import { InjectionToken } from '@angular/core';
import { DataSourceParser } from './models/data-source';

/**
 * Injection token used for passing custom datasource transformer into DataSourceProvider.
 */
export const FD_DATA_SOURCE_TRANSFORMER = new InjectionToken<DataSourceParser>('FdDataSourceTransformer');
