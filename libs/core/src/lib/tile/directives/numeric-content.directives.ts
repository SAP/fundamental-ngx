import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

export type NumericContentState = 'negative' | 'critical' | 'positive' | 'informative' | 'neutral';
export type NumericContentSize = 's' | 'm' | 'l';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content]',
    standalone: true
})
export class NumericContentDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** Size of the numeric content */
    @Input()
    size: NumericContentSize | null;

    /** @hidden */
    @HostBinding('class.fd-numeric-content')
    baseClass = true;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-numeric-content',
            this.size ? 'fd-numeric-content--' + this.size : '',
            this.class,
            this._isSmallTile() ? 'fd-numeric-content--small-tile' : ''
        ];
    }

    /** @hidden */
    private _isSmallTile(): boolean {
        let retVal = false;
        if (
            this.elementRef.nativeElement.parentElement &&
            this.elementRef.nativeElement.parentElement.parentElement &&
            this.elementRef.nativeElement.parentElement.parentElement.classList.contains('fd-tile--s')
        ) {
            retVal = true;
        }
        return retVal;
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-launch-icon-container]',
    standalone: true
})
export class NumericContentLaunchIconContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__launch-icon-container')
    baseClass = true;
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-launch-icon]',
    standalone: true
})
export class NumericContentLaunchIconDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** Glyph */
    @Input()
    glyph: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-numeric-content__launch-icon', this.glyph ? 'sap-icon--' + this.glyph : '', this.class];
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-kpi-container]',
    standalone: true
})
export class NumericContentKpiContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__kpi-container')
    baseClass = true;
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-kpi]',
    standalone: true
})
export class NumericContentKpiDirective implements OnInit, OnChanges, CssClassBuilder {
    /** State of the KPI. Options are neutral (default), 'positive', 'negative', 'critical', and 'informative'. */
    @Input()
    state?: NumericContentState | null;

    /** Apply user custom styles */
    @Input()
    class: string;

    /** Glyph */
    @Input()
    glyph: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-numeric-content__kpi', this.state ? 'fd-numeric-content__kpi--' + this.state : '', this.class];
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale-container]',
    standalone: true
})
export class NumericContentScaleContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__scale-container')
    baseClass = true;
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale-arrow]',
    standalone: true
})
export class NumericContentScaleArrowDirective implements OnInit, OnChanges, CssClassBuilder {
    /** Apply user custom styles */
    @Input()
    class: string;

    /** Glyph */
    @Input()
    glyph: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-numeric-content__scale-arrow', this.glyph ? 'sap-icon--' + this.glyph : '', this.class];
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale]',
    standalone: true
})
export class NumericContentScaleDirective implements OnInit, OnChanges, CssClassBuilder {
    /** State of the SCALE. Options are neutral (default), 'positive', 'negative', 'critical', and 'informative'. */
    @Input()
    state?: NumericContentState | null;

    /** Apply user custom styles */
    @Input()
    class: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-numeric-content__scale', this.state ? 'fd-numeric-content__scale--' + this.state : '', this.class];
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale-text]',
    standalone: true
})
export class NumericContentScaleTextDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__scale-text')
    baseClass = true;
}
