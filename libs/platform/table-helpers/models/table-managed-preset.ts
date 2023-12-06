import { TableState } from '../interfaces';

export type PlatformTableManagedPreset = Partial<Omit<TableState, 'columnKeys'>>;
