import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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
    imports: [TabsModule, RouterLinkActive, RouterLink, SeparatorComponent, AsyncPipe]
})
export class HeaderTabsComponent {
    @Input()
    preCustomTabs: { title: string; link: string }[] = [];
    @Input()
    postCustomTabs: { title: string; link: string }[] = [];

    hasI18n = inject(HAS_I18N);

    observedLink = inject(ExampleChildService, {
        optional: true
    });
}
