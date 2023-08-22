import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-tab-counter-example',
    templateUrl: './tab-counter.component.html',
    standalone: true,
    imports: [FormLabelModule, TabsModule, RouterLinkActive, RouterLink]
})
export class TabCounterComponent {}
