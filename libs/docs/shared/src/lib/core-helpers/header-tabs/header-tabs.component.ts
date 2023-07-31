import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ExampleChildService } from '../../services/example-child.service';

@Component({
    selector: 'fd-header-tabs',
    templateUrl: './header-tabs.component.html',
    styleUrls: ['./header-tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderTabsComponent {
    @Input() hasI18n = false;

    observedLink = inject(ExampleChildService, {
        optional: true
    });
}
