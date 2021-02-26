import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2
} from '@angular/core';
import { InputGroupPlacement } from './input-group.component';
import { FormStates } from '../form/form-control/form-states';
import { applyCssClass, ContentDensityService, CssClassBuilder } from '../utils/public_api';
import { Subscription } from 'rxjs';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-input-group-input]'
})
export class InputGroupInputDirective implements CssClassBuilder, OnInit, OnChanges, OnDestroy {
    /** user's custom classes */
    @Input()
    class: string;

    @Input()
    compact: boolean = null;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef, @Optional() private _contentDensityService: ContentDensityService) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === null && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService.contentDensity.subscribe(density => {
                this.compact = density === 'compact';
                this.buildComponentCssClass();
            }));
        }
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return ['fd-input', 'fd-input-group__input', this.compact ? 'fd-input--compact' : ''];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-textarea-group-input]'
})
export class InputGroupTextareaDirective {}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-input-group-addon]'
})
export class InputGroupAddOnDirective implements OnInit, OnChanges, CssClassBuilder, AfterContentInit, OnDestroy {
    /** user's custom classes */
    @Input()
    class: string;

    /** @hidden */
    @HostBinding('class.fd-input-group__addon')
    fdInputGroupAddonClass = true;

    /**
     * The placement of the add-on. Options include *before* and *after*
     */
    @Input()
    placement: InputGroupPlacement = 'after';

    /** Whether to apply compact mode to the AddOn. */
    @Input()
    compact: boolean = null;

    /**
     * The placement of the add-on. Options include *before* and *after*
     */
    @Input()
    type: string;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether the icon add-on or the text add-on is a button.
     */
    @Input()
    button = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private renderer: Renderer2,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === null && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService.contentDensity.subscribe((density) => {
                    this.compact = density === 'compact';
                    this.buildComponentCssClass();
                })
            );
        }
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        /** Add fd-input-group__button to button child element */
        const button = this.elementRef().nativeElement.querySelector('button');
        if (button) {
            this.renderer.addClass(button, 'fd-input-group__button');
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-input-group__addon',
            this.button ? 'fd-input-group__addon--button' : '',
            this.type ? 'fd-input-group__addon--' + this.type : '',
            this.state ? 'is-' + this.state : '',
            this.compact ? 'fd-input-group__addon--compact' : ''
        ];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
