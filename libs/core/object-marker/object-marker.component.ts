import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-object-marker]',
    template: `@if (glyph) {
            <fd-icon [glyph]="glyph" [font]="glyphFont" class="fd-object-marker__icon"></fd-icon>
        }
        @if (label) {
            <span class="fd-object-marker__text">{{ label }}</span>
        }
        <ng-content></ng-content>`,
    styleUrl: './object-marker.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.tabindex]': 'clickable ? 0 : -1',
        '[attr.role]': 'clickable ? "link" :""'
    },
    imports: [IconComponent]
})
export class ObjectMarkerComponent implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /** Glyph (icon) of the Object Status.*/
    @Input()
    glyph: string;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** Whether the Object Status is clickable. */
    @Input()
    clickable = false;

    /** Define the text content of the Object Status */
    @Input()
    label: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-object-marker', this.clickable ? 'fd-object-marker--link' : '', this.class];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
