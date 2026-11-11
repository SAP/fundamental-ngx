import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-tab-counter-example',
    templateUrl: './tab-counter-example.component.html',
    imports: [TabsModule, RouterLinkActive, RouterLink, TextComponent]
})
export class TabCounterComponent {}
