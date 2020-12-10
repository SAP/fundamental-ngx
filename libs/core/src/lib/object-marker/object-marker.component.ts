import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    ElementRef
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '../utils/public_api';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-object-marker]',
    template: ` <i class="fd-object-marker__icon" [ngClass]="' sap-icon--' + glyph" *ngIf="glyph"></i>
        <span *ngIf="label" class="fd-object-marker__text" [attr.tabindex]="clickable ? 0 : -1">{{ label }}</span>
        <ng-content></ng-content>`,
    styleUrls: ['./object-marker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef) {}

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
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

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
