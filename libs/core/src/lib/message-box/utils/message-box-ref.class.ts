import { DialogRefBase } from '../../dialog/base/dialog-ref-base.class';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageBoxRef<T = any> extends DialogRefBase<T> {}
