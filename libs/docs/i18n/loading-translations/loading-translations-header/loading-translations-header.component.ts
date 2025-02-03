import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescriptionComponent, HeaderComponent } from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './loading-translations-header.component.html',
    imports: [HeaderComponent, DescriptionComponent, RouterOutlet]
})
export class LoadingTranslationsHeaderComponent {}
