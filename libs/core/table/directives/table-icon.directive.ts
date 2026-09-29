import { Directive, ElementRef, booleanAttribute, computed, inject, input } from '@angular/core';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont, fdBuildIconClass } from '@fundamental-ngx/core/icon';

@Directive({
    selector: '[fdTableIcon], [fd-table-icon]',
    host: {
        '[class]': 'cssClass()'
    }
})
export class TableIconDirective {
    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    readonly glyph = input('');

    /** Glyph font family */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Whether or no icon is used as navigation  */
    readonly navigation = input(false, { transform: booleanAttribute });

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() =>
        [
            'fd-table__icon',
            this.glyph() ? fdBuildIconClass(this.glyphFont(), this.glyph()) : '',
            this.navigation() ? 'fd-table__icon--navigation' : ''
        ]
            .filter(Boolean)
            .join(' ')
    );
}
