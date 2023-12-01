import { Injectable } from '@angular/core';
import { DialogRefBase } from '@fundamental-ngx/core/dialog';

@Injectable()
export class MessageBoxRef<T = any> extends DialogRefBase<T> {}
