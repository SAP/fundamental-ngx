import { AfterViewInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
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
    template: `<ng-content></ng-content>`,
    styleUrls: ['./object-marker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectMarkerComponent implements OnChanges, OnInit, CssClassBuilder, AfterViewInit {
    /** User's custom classes */
    @Input()
    class: string;
    /**
     * Glyph (icon) of the Object Status.
     */
    @Input()
    glyph: string;

    /** Whether the Object Status is clickable. */
    @Input()
    clickable = false;

    private icon: HTMLElement;

    private oldGlyph: string;

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef, private readonly renderer: Renderer2) {}

    ngAfterViewInit(): void {
        if (this.glyph) {
            this.oldGlyph = this.glyph;
            this.icon = this.renderer.createElement('i');
            this.icon.classList.add('fd-object-marker__icon');
            this.icon.classList.add('sap-icon--' + this.glyph);
            this.renderer.insertBefore(
                this._elementRef.nativeElement,
                this.icon,
                this._elementRef.nativeElement.firstChild
            );
        }
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        if (this.icon) {
            this.renderer.removeClass(this.icon, 'sap-icon--' + this.oldGlyph);
            this.renderer.addClass(this.icon, 'sap-icon--' + this.glyph);
            this.oldGlyph = this.glyph;
        }
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
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
}
