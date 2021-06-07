import { DialogRefBase } from '@fundamental-ngx/core/dialog';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageBoxRef<T = any> extends DialogRefBase<T> {}
