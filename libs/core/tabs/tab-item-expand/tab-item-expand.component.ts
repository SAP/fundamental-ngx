import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { TabTagDirective } from '../tab-utils/tab-directives';

/**
 * Represents a list of tab-panels.
 */
@Component({
    selector: 'fd-item-expand',
    templateUrl: './tab-item-expand.component.html',
    styleUrl: './tab-item-expand.component.scss',
    host: {
        role: 'tab',
        class: 'fd-tabs__item fd-tabs__item--overflow'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TabTagDirective, IconComponent, FdTranslatePipe]
})
export class TabItemExpandComponent {}
