import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import { InputGroupPlacement } from './types';
import { FormStates } from '@fundamental-ngx/core/shared';
import { Subscription } from 'rxjs';
import { applyCssClass, CssClassBuilder, DestroyedService } from '@fundamental-ngx/core/utils';
import {
    ContentDensityConsumer,
    contentDensityConsumer,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-input-group-input]',
    providers: [
        DestroyedService,
        contentDensityConsumer({
            modifiers: { [ContentDensityMode.COMPACT]: 'fd-input--compact' },
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY]
        })
    ]
})
export class InputGroupInputDirective implements CssClassBuilder, OnInit, OnChanges, OnDestroy {
    /** user's custom classes */
    @Input()
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _contentDensityConsumer: ContentDensityConsumer) {}

    /** @hidden */
    ngOnInit(): void {
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
        return ['fd-input', 'fd-input-group__input'];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-textarea-group-input]'
})
export class InputGroupTextareaDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-input-group-addon]',
    providers: [
        DestroyedService,
        contentDensityConsumer({
            modifiers: { [ContentDensityMode.COMPACT]: 'fd-input-group__addon--compact' },
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY]
        })
    ]
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
    state?: FormStates;

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
        private _contentDensityConsumer: ContentDensityConsumer
    ) {}

    /** @hidden */
    ngOnInit(): void {
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
            this.state ? 'is-' + this.state : ''
        ];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
