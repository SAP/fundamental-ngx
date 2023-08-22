import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tabs-example',
    templateUrl: './tabs-example.component.html',
    standalone: true,
    imports: [FormLabelModule, TabsModule, RouterLinkActive, RouterLink]
})
export class TabsExampleComponent {}
