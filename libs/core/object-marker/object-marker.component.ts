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

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-object-marker]',
    template: `@if (glyph) {
            <i class="fd-object-marker__icon" [class]="' sap-icon--' + glyph"></i>
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
    standalone: true,
    imports: []
})
export class ObjectMarkerComponent implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /** Glyph (icon) of the Object Status.*/
    @Input()
    glyph: string;

    /** Whether the Object Status is clickable. */
    @Input()
    clickable = false;

    /** Define the text content of the Object Status */
    @Input()
    label: string;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}

    /** @ignore
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-object-marker', this.clickable ? 'fd-object-marker--link' : '', this.class];
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
