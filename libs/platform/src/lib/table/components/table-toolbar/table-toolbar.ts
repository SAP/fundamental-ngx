import { InjectionToken, TemplateRef } from '@angular/core';

export interface TableToolbarInterface {
    tableToolbarTitleId: string;
    contentTemplateRef: TemplateRef<any>;
}

/** @deprecated Use TableToolbarInterface instead */
export type TableToolbarWithTemplate = TableToolbarInterface;

/**
 * Used to provide a table-toolbar to the table component without causing a circular dependency.
 */
export const TABLE_TOOLBAR = new InjectionToken<any>('PLATFORM_TABLE_TOOLBAR');
