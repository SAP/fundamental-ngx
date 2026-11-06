import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-tab-filter-example',
    templateUrl: './tab-filter-example.component.html',
    imports: [TabsModule, RouterLinkActive, RouterLink, RouterOutlet, TextComponent]
})
export class TabFilterExampleComponent {}
