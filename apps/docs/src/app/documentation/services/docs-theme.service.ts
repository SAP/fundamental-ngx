import { Injectable } from '@angular/core';
import { ThemeServiceOutput } from '@fundamental-ngx/core/utils';
import { Subject } from 'rxjs';

@Injectable()
export class DocsThemeService {
    readonly onThemeChange = new Subject<ThemeServiceOutput>();
}
