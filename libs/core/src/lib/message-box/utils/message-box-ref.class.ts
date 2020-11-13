import { DialogRefBase } from '../../dialog/base/dialog-ref-base.class';
import { InjectionToken } from '@angular/core';

export const MESSAGE_BOX_REF = new InjectionToken<string[]>('MessageBoxRef');

export class MessageBoxRef extends DialogRefBase {}
