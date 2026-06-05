import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    input,
    ViewEncapsulation
} from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_GENERIC_TAG_COMPONENT } from './tokens';

export type GenericTagType = 'error' | 'success' | 'warning' | 'information';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-generic-tag]',
    templateUrl: './generic-tag.component.html',
    styleUrl: './generic-tag.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_GENERIC_TAG_COMPONENT,
            useExisting: GenericTagComponent
        }
    ],
    host: {
        '[attr.tabindex]': '0',
        '[attr.aria-roledescription]': 'ariaRoleDescription()',
        '[class]': 'cssClass()',
        role: 'button'
    },
    imports: [IconComponent]
})
export class GenericTagComponent implements HasElementRef {
    /**
     * The type of the Generic Tag.
     * Can be one of the following: 'error' | 'success' | 'warning' | 'information'.
     * For default Generic Tag omit this property.
     */
    readonly type = input<GenericTagType | null | undefined>();

    /**
     * Required input
     * The KPI Name of the Generic tag. Standard text.
     * Always use a meaningful title. Keep it simple and try to use no more than 3 words.
     */
    readonly name = input.required<string>();

    /**
     * The KPI Value of the Generic tag.
     * The value represents the numeric (key) attribute and its unit.
     */
    readonly value = input<string | null | undefined>();

    /**
     *  Aria defines role description for the Generic Tag
     */
    readonly ariaRoleDescription = input('Generic Tag');

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /**
     * Computed icon glyph based on type.
     * @hidden
     */
    protected readonly iconGlyph = computed(() => {
        const tagType = this.type();
        return tagType ? `message-${tagType}` : '';
    });

    /**
     * Computed CSS class string for the component.
     * @hidden
     */
    protected readonly cssClass = computed(() => {
        const classes = ['fd-generic-tag'];
        const tagType = this.type();

        if (tagType) {
            classes.push(`fd-generic-tag--${tagType}`);
        }

        return classes.join(' ');
    });
}
