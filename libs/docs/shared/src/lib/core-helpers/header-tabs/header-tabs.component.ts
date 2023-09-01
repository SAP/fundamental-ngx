import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { ExampleChildService } from '../../services/example-child.service';
import { HAS_I18N } from '../../tokens/has-i18n.token';
import { SeparatorComponent } from '../seperator/seperator.component';

@Component({
    selector: 'fd-header-tabs',
    templateUrl: './header-tabs.component.html',
    styleUrls: ['./header-tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TabsModule, RouterLinkActive, RouterLink, NgIf, SeparatorComponent, AsyncPipe]
})
export class HeaderTabsComponent {
    hasI18n = inject(HAS_I18N);

    observedLink = inject(ExampleChildService, {
        optional: true
    });
}
