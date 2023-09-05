import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tab-counter-example',
    templateUrl: './tab-counter.component.html',
    standalone: true,
    imports: [FormLabelComponent, TabsModule, RouterLinkActive, RouterLink]
})
export class TabCounterComponent {}
