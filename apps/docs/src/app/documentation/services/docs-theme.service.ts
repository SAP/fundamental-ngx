import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemeServiceOutput } from '@fundamental-ngx/core';

@Injectable()
export class DocsThemeService {
    readonly onThemeChange = new Subject<ThemeServiceOutput>();
}
