import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tabs-example',
    templateUrl: './tabs-example.component.html',
    imports: [TabsModule, RouterLinkActive, RouterLink]
})
export class TabsExampleComponent {}
