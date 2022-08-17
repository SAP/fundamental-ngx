import { InjectionToken } from '@angular/core';
import { ModuleDeprecation } from '../interfaces/module-deprecation.interface';

export const ModuleDeprecations = new InjectionToken<ModuleDeprecation>('ModuleDeprecations');
