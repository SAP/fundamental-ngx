import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '../../utils/decorators/apply-css-class.decorator';
type KpiStatus = 'negative' | 'critical' | 'positive' | 'informative' | '';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-tile-launch]'
})
export class TileLaunchDirective {
    /** @hidden */
    @HostBinding('class.fd-tile--launch')
    baseClass: boolean = true;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-numeric-content-launch-icon-container]'
})
export class NumericContentLaunchIconContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__launch-icon-container')
    baseClass: boolean = true;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-numeric-content-launch-icon]'
})
export class NumericContentLaunchIconDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__launch-icon')
    baseClass: boolean = true;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-numeric-content-kpi-container]'
})
export class NumericContentKpiContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__kpi-container')
    baseClass: boolean = true;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-numeric-content-kpi]'
})
export class NumericContentKpiDirective implements OnInit, OnChanges {
    /** State of the KPI. Options are 'neutral' (default), 'positive', 'negative', 'critical', and 'informative'. */
    @Input()
    state: KpiStatus = '';

    /** Apply user custom styles */
    @Input()
    class: string;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return ['fd-numeric-content__kpi', this.state ? 'sap-icon--' + this.state : '', this.class]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-numeric-content-scale-container]'
})
export class NumericContentScaleContainerDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__scale-container')
    baseClass: boolean = true;
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-numeric-content-scale]'
})
export class NumericContentScaleDirective implements OnInit, OnChanges {
    /** State of the SCALE. Options are 'neutral' (default), 'positive', 'negative', 'critical', and 'informative'. */
    @Input()
    state: string = '';

    /** Apply user custom styles */
    @Input()
    class: string;

    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return ['fd-numeric-content__scale', this.state ? 'sap-icon--' + this.state : '', this.class]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-numeric-content-scale-text]'
})
export class NumericContentScaleTextDirective {
    /** @hidden */
    @HostBinding('class.fd-numeric-content__scale-text')
    baseClass: boolean = true;
}
