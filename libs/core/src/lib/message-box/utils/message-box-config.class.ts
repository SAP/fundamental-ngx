import { DialogConfigBase } from '../../dialog/base/dialog-config-base.class';
import { InjectionToken } from '@angular/core';

export const MESSAGE_BOX_CONFIG = new InjectionToken<string[]>('MessageBoxConfig');
export const MESSAGE_BOX_DEFAULT_CONFIG = new InjectionToken<string[]>('Default MessageBoxConfig');

export class MessageBoxConfig<T = any> extends DialogConfigBase<T> {}
