import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TextComponent } from '@fundamental-ngx/core/text';

@Component({
    selector: 'fd-tab-icon-only-example',
    templateUrl: './tab-icon-only-example.component.html',
    imports: [TabsModule, ContentDensityDirective, RouterLinkActive, RouterLink, RouterOutlet, TextComponent]
})
export class TabIconOnlyExampleComponent {}
