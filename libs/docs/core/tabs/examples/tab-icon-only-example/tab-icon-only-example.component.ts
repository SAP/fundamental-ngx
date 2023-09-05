import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tab-icon-only-example',
    templateUrl: './tab-icon-only-example.component.html',
    standalone: true,
    imports: [FormLabelModule, TabsModule, ContentDensityDirective, RouterLinkActive, RouterLink, RouterOutlet]
})
export class TabIconOnlyExampleComponent {}
