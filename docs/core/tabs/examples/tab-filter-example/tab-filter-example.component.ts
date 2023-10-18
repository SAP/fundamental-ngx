import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tab-filter-example',
    templateUrl: './tab-filter-example.component.html',
    standalone: true,
    imports: [FormLabelComponent, TabsModule, ContentDensityDirective, RouterLinkActive, RouterLink, RouterOutlet]
})
export class TabFilterExampleComponent {}
