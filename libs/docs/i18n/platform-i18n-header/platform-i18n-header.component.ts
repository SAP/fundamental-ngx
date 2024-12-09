import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescriptionComponent, HeaderComponent } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-i18n-header',
    templateUrl: './platform-i18n-header.component.html',
    imports: [HeaderComponent, DescriptionComponent, RouterOutlet]
})
export class PlatformI18nHeaderComponent {}
