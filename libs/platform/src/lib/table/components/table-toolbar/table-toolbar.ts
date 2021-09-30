import { InjectionToken, TemplateRef } from '@angular/core';

export interface TableToolbarWithTemplate {
    contentTemplateRef: TemplateRef<any>;
}

/**
 * Used to provide a table-toolbar to the table component without causing a circular dependency.
 */
export const TABLE_TOOLBAR = new InjectionToken<any>('PLATFORM_TABLE_TOOLBAR');
