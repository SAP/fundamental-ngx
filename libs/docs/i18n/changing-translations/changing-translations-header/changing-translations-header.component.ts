import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescriptionComponent, HeaderComponent } from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './changing-translations-header.component.html',
    standalone: true,
    imports: [HeaderComponent, DescriptionComponent, RouterOutlet]
})
export class ChangingTranslationsHeaderComponent {}
