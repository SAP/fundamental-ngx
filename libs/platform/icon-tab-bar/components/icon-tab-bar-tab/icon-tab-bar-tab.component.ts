import { CommonModule } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    contentChildren,
    Directive,
    ElementRef,
    inject,
    input,
    TemplateRef,
    viewChild
} from '@angular/core';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';
import { IconTabTitleDirective } from '../../directives/icon-tab-title.directive';
import { ReactiveTabConfig } from '../../interfaces/tab-config.interface';
import { SemanticColor } from '../../types';

let defaultIdIndex = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-icon-tab-bar-tab-content',
    standalone: true,
    host: { '[attr.id]': 'id()' }
})
export class IconTabBarTabContentDirective implements HasElementRef {
    /** Tab ID */
    id = input<Nullable<string>>();

    /** Tab Unique ID. */
    uId = input<Nullable<string>>();

    /** Element reference. */
    readonly elementRef = inject(ElementRef);
}

@Component({
    selector: 'fdp-icon-tab-bar-tab',
    imports: [CommonModule],
    templateUrl: './icon-tab-bar-tab.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarTabComponent implements ReactiveTabConfig {
    /** Tab Label. */
    label = input<Nullable<string>>();

    /** Tab text color. */
    color = input<SemanticColor>('default');

    /** Tab icon. */
    icon = input<string>();

    /** Tab icon font family. */
    iconFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Tab counter. */
    counter = input<Nullable<number>>();

    /** whether the tab is selected */
    active = input(false, { transform: booleanAttribute });

    /** if set to true, will show red circle in top-right corner of tab */
    badge = input(false, { transform: booleanAttribute });

    /** Whether the tab can be closed. */
    closable = input(false, { transform: booleanAttribute });

    /** Tab ID. */
    id = input(`fdp-icon-tab-bar-tab-${defaultIdIndex++}`);

    /** Content renderer. */
    readonly renderer = viewChild<TemplateRef<any>>('renderer');

    /** Title template. */
    readonly titleTemplate = contentChild(IconTabTitleDirective, { read: TemplateRef });

    /** @hidden */
    readonly children = contentChildren(IconTabBarTabComponent);
}
