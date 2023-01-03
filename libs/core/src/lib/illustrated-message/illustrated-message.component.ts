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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { applyCssClass, RequireOnlyOne } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';
import { fromEvent, Subscription } from 'rxjs';

export interface SvgConfig {
    scene?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    dialog?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    spot?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
}

export interface SvgItemConfig {
    url: string;
    id: string;
    file: string;
}

export type IllustratedMessageType = 'scene' | 'dialog' | 'spot';

let illustratedMessageUniqueId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-illustrated-message]',
    template: `
        <svg class="fd-illustrated-message__illustration" *ngIf="!noSvg || _inlineSvg">
            <use [attr.href]="_href"></use>
        </svg>
        <div *ngIf="_inlineSvg" style="display: none;" [innerHTML]="_inlineSvg"></div>
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
    @Input()
    type: IllustratedMessageType = 'scene';

    /**
     * An object containing url and id for each type used to construct the svg href
     * For 'scene' type 'scene' and 'dialog' values are required
     * In small screens (less than 600px) 'dialog' svg will be applied for 'scene' type
     */
    @Input()
    svgConfig: SvgConfig;

    /**
     * When set to true will remove the illustration from the Illustrated Message
     * The default is set to false
     */
    @Input()
    noSvg = false;

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
    _inlineSvg: SafeHtml | undefined;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _cdRef: ChangeDetectorRef, private _sanitizer: DomSanitizer) {}

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
            this._subscriptions.add(fromEvent(window, 'resize').subscribe(() => this._constructHref()));
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /**
     * @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-illustrated-message', this.type ? `fd-illustrated-message--${this.type}` : '', this.class];
    }

    /** @hidden */
    private _constructHref(): void {
        let inlineSvg;
        this._inlineSvg = undefined;
        if (this.svgConfig) {
            switch (this.type) {
                case 'scene':
                    this._isSmallScreen = window.innerWidth < 600;

                    inlineSvg = this._isSmallScreen ? this.svgConfig.dialog?.file : this.svgConfig.scene?.file;

                    this._href = this._isSmallScreen
                        ? `${this.svgConfig.dialog?.url || ''}#${this.svgConfig.dialog?.id}`
                        : `${this.svgConfig.scene?.url || ''}#${this.svgConfig.scene?.id}`;
                    break;

                case 'dialog':
                    inlineSvg = this.svgConfig.dialog?.file;
                    this._href = `${this.svgConfig.dialog?.url || ''}#${this.svgConfig.dialog?.id}`;
                    break;

                case 'spot':
                    inlineSvg = this.svgConfig.spot?.file;
                    this._href = `${this.svgConfig.spot?.url || ''}#${this.svgConfig.spot?.id}`;
                    break;
            }
        }
        if (inlineSvg) {
            this._inlineSvg = this._sanitizer.bypassSecurityTrustHtml(inlineSvg);
        }

        this._cdRef.detectChanges();
    }
}
