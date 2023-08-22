import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-tabs-navigation-mode-example',
    templateUrl: './tabs-navigation-mode-example.component.html',
    standalone: true,
    imports: [TabsModule, RouterLinkActive, RouterLink, RouterOutlet]
})
export class TabsNavigationModeExampleComponent {}
