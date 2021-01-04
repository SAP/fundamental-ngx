import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * Represents a list of tab-panels.
 */
@Component({
    selector: 'fd-item-expand',
    templateUrl: './tab-item-expand.component.html',
    styleUrls: ['./tab-item-expand.component.scss'],
    host: {
        role: 'tab',
        class: 'fd-tabs__item fd-tabs__item--overflow'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabItemExpandComponent {

    /** @hidden Text visible in the trigger */
    @Input()
    label = 'More';
}
