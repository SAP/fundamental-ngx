import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescriptionComponent, HeaderComponent } from '@fundamental-ngx/docs/shared';

@Component({
    templateUrl: './patching-translations-header.component.html',
    standalone: true,
    imports: [HeaderComponent, DescriptionComponent, RouterOutlet]
})
export class PatchingTranslationsHeaderComponent {}
