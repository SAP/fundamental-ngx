import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, input, ViewEncapsulation } from '@angular/core';
import { AsyncOrSyncPipe, Nullable } from '@fundamental-ngx/cdk/utils';
import { IconTabBarItem } from '../../interfaces/icon-tab-bar-item.interface';
import { TabColorAssociations } from '../../interfaces/tab-color-associations.interface';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-icon-tab-bar-text-type-tab-item]',
    imports: [AsyncOrSyncPipe, NgTemplateOutlet],
    templateUrl: './icon-tab-bar-text-type-tab-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-icon-tab-bar__tab',
        role: 'tab'
    }
})
export class IconTabBarTextTypeTabItemComponent {
    /** Tab item. */
    @Input()
    item: Nullable<IconTabBarItem>;

    /**
     * @description Layout type for tab.
     */
    @Input()
    layoutMode: 'row' | 'column';

    /**
     * @description Associations for colors of the tabs.
     * If any of the color associations provided, they'll be read by screenreader instead of the actual color
     */
    colorAssociations = input<TabColorAssociations | undefined>();

    /** @hidden */
    get nativeElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @hiddem */
    private readonly _elementRef = inject(ElementRef);
}
