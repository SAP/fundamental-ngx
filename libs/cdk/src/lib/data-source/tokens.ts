import { InjectionToken } from '@angular/core';
import { DataSourceProvider } from './models/data-source';

/**
 * Injection token used for passing custom datasource transformer into DataSourceProvider.
 */
export const FD_DATA_SOURCE_TRANSFORMER = new InjectionToken<DataSourceProvider | undefined>('FdDataSourceTransformer');
