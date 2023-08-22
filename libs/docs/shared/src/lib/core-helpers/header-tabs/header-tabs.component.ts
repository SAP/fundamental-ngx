import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ExampleChildService } from '../../services/example-child.service';
import { SeparatorComponent } from '../seperator/seperator.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { TabsModule } from '@fundamental-ngx/core/tabs';

@Component({
    selector: 'fd-header-tabs',
    templateUrl: './header-tabs.component.html',
    styleUrls: ['./header-tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TabsModule, RouterLinkActive, RouterLink, NgIf, SeparatorComponent, AsyncPipe]
})
export class HeaderTabsComponent {
    @Input() hasI18n = false;

    observedLink = inject(ExampleChildService, {
        optional: true
    });
}
