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
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { Subscription } from 'rxjs';
import { InputGroupPlacement } from './types';

@Directive({
    selector: '[fdInputGroupInput], [fd-input-group-input]',
    providers: [contentDensityObserverProviders()],
    standalone: true
})
export class InputGroupInputDirective implements CssClassBuilder, OnInit, OnChanges, OnDestroy {
    /** user's custom classes */
    @Input()
    class: string;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        _contentDensityObserver: ContentDensityObserver
    ) {
        _contentDensityObserver.subscribe();
    }

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

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-input', 'fd-input-group__input'];
    }
}

@Directive({
    selector: '[fdTextareaGroupInput], [fd-textarea-group-input]',
    standalone: true
})
export class InputGroupTextareaDirective {}

@Directive({
    selector: '[fdInputGroupAddon], [fd-input-group-addon]',
    providers: [contentDensityObserverProviders()],
    standalone: true
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
        public readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        _contentDensityObserver: ContentDensityObserver
    ) {
        _contentDensityObserver.subscribe();
    }

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
        const button = this.elementRef.nativeElement.querySelector('button');
        if (button) {
            this.renderer.addClass(button, 'fd-input-group__button');
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-input-group__addon',
            this.button ? 'fd-input-group__addon--button' : '',
            this.type ? 'fd-input-group__addon--' + this.type : '',
            this.state ? 'is-' + this.state : ''
        ];
    }
}

@Directive({
    selector: '[fdInputGroupAddonButton], [fd-input-group-addon-button]',
    host: {
        class: 'fd-input-group__button'
    },
    standalone: true
})
export class InputGroupAddonButtonDirective {}
