import {
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass } from '../utils/decorators/apply-css-class.decorator';
import { CssClassBuilder } from '../utils/interfaces/css-class-builder.interface';
import { fromEvent, Subscription } from 'rxjs';

export interface SvgConfig {
    scene?: { url: string, id: string };
    dialog?: { url: string, id: string };
    spot?: { url: string, id: string };
}

let illustratedMessageUniqueId = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-illustrated-message]',
    template: `
        <svg class="fd-illustrated-message__illustration" *ngIf="!noSvg">
            <use [attr.xlink:href]="_href"></use>
        </svg>
        <ng-content select="[fd-illustrated-message-figcaption]"></ng-content>
        <ng-content select="fd-illustrated-message-actions"></ng-content>
    `,
    styleUrls: ['./illustrated-message.component.scss'],

    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IllustratedMessageComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit, CssClassBuilder {
    /** 
     * The type of the Illustrated Message
     * Options include: 'scene' | 'spot' | 'dialog'
     * The default type is set to 'scene'
     */
    @Input() type: 'scene' | 'dialog' | 'spot' = 'scene';

    /** 
     * An object containing url and id for each type used to construct the svg href
     * For 'scene' type 'scene' and 'dialog' values are required
     * In small screens (less than 600px) 'dialog' svg will be applied for 'scene' type
     */
    @Input() svgConfig: SvgConfig;

    /** 
     * When set to true will remove the illustration from the Illustrated Message
     * The default is set to false
     */
    @Input() noSvg = false;

    /** 
     * Id of the Illustrated Message
     * If not provided, a default one is generated
     */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-illustrated-message-' + illustratedMessageUniqueId++;

    /** User's custom classes */
    @Input()
    class: string;

    /** @hidden */
    _href: string;

    /** @hidden */
    _isSmallScreen: boolean;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor (private _elementRef: ElementRef, private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._constructHref();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.type === 'scene') {
            this._subscriptions.add(
                fromEvent(window, 'resize')
                    .subscribe(() => this._constructHref())
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-illustrated-message',
            this.type ? `fd-illustrated-message--${this.type}` : '',
            this.class
        ];
    }

    /** @hidden */
    private _constructHref(): void {
        if (this.svgConfig) {
            switch (this.type) {
                case 'scene' : {
                    this._isSmallScreen = window.innerWidth < 600;
                    
                    this._href = this._isSmallScreen ? 
                    `${this.svgConfig.dialog?.url}#${this.svgConfig.dialog?.id}` :
                    `${this.svgConfig.scene?.url}#${this.svgConfig.scene?.id}`
                    this._cdRef.detectChanges();
                }
                break;
    
                case 'dialog' : {
                    this._href = `${this.svgConfig.dialog?.url}#${this.svgConfig.dialog?.id}`;
                }
                break;
    
                case 'spot' : {
                    this._href = `${this.svgConfig.spot?.url}#${this.svgConfig.spot?.id}`;
                }
                break;
            }
        }
    }
}
