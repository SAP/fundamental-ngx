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
    /**
     * @deprecated use i18n capabilities instead
     * @hidden Text visible in the trigger */
    @Input()
    set label(value: string) {
        console.warn(
            "Property label is deprecated. Use i18n capabilities 'coreTabs.tabListExpandButtonText' key instead."
        );
        this._label = value;
    }

    get label(): string {
        return this._label;
    }

    /** @hidden */
    private _label: string;
}
