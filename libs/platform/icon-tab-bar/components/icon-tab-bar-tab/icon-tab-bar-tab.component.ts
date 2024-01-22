import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    TemplateRef,
    ViewChild,
    booleanAttribute,
    inject
} from '@angular/core';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { TabConfig } from '../../interfaces/tab-config.interface';
import { SemanticColor } from '../../types';

let defaultIdIndex = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-icon-tab-bar-tab-content',
    standalone: true
})
export class IconTabBarTabContentDirective implements HasElementRef {
    /** Tab ID. */
    @HostBinding('attr.id')
    @Input()
    id: Nullable<string>;

    /** Tab Unique ID. */
    @Input()
    uId: Nullable<string>;

    /** Element reference. */
    readonly elementRef = inject(ElementRef);
}

@Component({
    selector: 'fdp-icon-tab-bar-tab',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './icon-tab-bar-tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarTabComponent implements TabConfig {
    /** Tab Label. */
    @Input()
    label: Nullable<string>;

    /** Tab text color. */
    @Input()
    color: SemanticColor;

    /** Tab icon. */
    @Input()
    icon: string;

    /** Tab icon font family. */
    @Input()
    iconFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Tab counter. */
    @Input()
    counter: number;

    /** whether the tab is selected */
    @Input({ transform: booleanAttribute })
    active = false;

    /** if set to true, will show red circle in top-right corner of tab */
    @Input({ transform: booleanAttribute })
    badge = false;

    /** Whether the tab can be closed. */
    @Input({ transform: booleanAttribute })
    closable = false;

    /** Tab ID. */
    @Input()
    id = `fdp-icon-tab-bar-tab-${defaultIdIndex++}`;

    /** Content renderer. */
    @ViewChild('renderer')
    readonly renderer: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(IconTabBarTabComponent)
    readonly children: QueryList<IconTabBarTabComponent>;
}
