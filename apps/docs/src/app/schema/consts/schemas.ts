import { InjectionToken } from '@angular/core';
import { Schema } from '../models/schema.model';

export interface Schemas {
    [name: string]: Schema;
}

export const SCHEMAS = new InjectionToken<Schemas>('Schemas');
