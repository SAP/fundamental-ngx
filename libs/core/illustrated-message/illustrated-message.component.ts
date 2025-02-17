import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CssClassBuilder, Nullable, RequireOnlyOne, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { Subscription, debounceTime, fromEvent } from 'rxjs';

export interface SvgConfig {
    scene?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    dialog?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    spot?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    dot?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
}

export interface SvgItemConfig {
    url: string;
    id: string;
    file: string;
}

export type IllustratedMessageType = 'scene' | 'dialog' | 'spot' | 'dot' | 'base';

export enum IllustratedMessageTypes {
    SCENE = 'scene',
    DIALOG = 'dialog',
    SPOT = 'spot',
    DOT = 'dot',
    BASE = 'base'
}

let illustratedMessageUniqueId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-illustrated-message]',
    templateUrl: './illustrated-message.component.html',
    styleUrl: './illustrated-message.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class IllustratedMessageComponent implements AfterContentChecked, OnChanges, OnDestroy, OnInit, CssClassBuilder {
    /**
     * The type of the Illustrated Message
     * Options include: 'scene' | 'spot' | 'dialog' | 'dot' | 'base'.
     */
    @Input()
    type: IllustratedMessageType;

    /**
     * An object containing url and id for each type used to construct the svg href
     * For 'scene' type 'scene' and 'dialog' values are required
     * In small screens (less than 600px) 'dialog' svg will be applied for 'scene' type
     */
    @Input()
    svgConfig: SvgConfig;

    /**
     * aria-label for the svg
     */
    @Input()
    svgAriaLabel: Nullable<string>;

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
    _tempType: IllustratedMessageType;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        private _sanitizer: DomSanitizer
    ) {}

    /**
     * @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-illustrated-message',
            this._tempType ? `fd-illustrated-message--${this._tempType}` : '',
            this.class || ''
        ].filter(Boolean);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('svgConfig' in changes) {
            this._constructHref();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        const resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(200)) // reduce frequent calls during window resizing
            .subscribe(() => this._constructHref());
        this._subscriptions.add(resizeSubscription);
    }

    /** @hidden */
    ngAfterContentChecked(): void {
        this._constructHref();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _constructHref(): void {
        this._inlineSvg = undefined;
        const containerWidth = this.elementRef.nativeElement.offsetWidth;
        this._tempType = this.type;
        if (!this.type && containerWidth > 0) {
            this._tempType = this._determineIllustratedMessageType(containerWidth);
        }
        const inlineSvg = this.svgConfig?.[this._tempType]?.file;
        if (inlineSvg) {
            this._inlineSvg = this._sanitizer.bypassSecurityTrustHtml(inlineSvg);
        }

        this._href = this.svgConfig ? this._getHrefByType(this._tempType, this.svgConfig) : '';
        this.buildComponentCssClass();

        this._cdRef.markForCheck();
    }

    /** @hidden */
    private _determineIllustratedMessageType(width: number): IllustratedMessageType {
        if (width >= 682) {
            return IllustratedMessageTypes.SCENE;
        } else if (width >= 361) {
            return IllustratedMessageTypes.DIALOG;
        } else if (width >= 261) {
            return IllustratedMessageTypes.SPOT;
        } else if (width >= 161) {
            return IllustratedMessageTypes.DOT;
        }

        return IllustratedMessageTypes.BASE;
    }

    /** @hidden */
    private _getHrefByType(type: IllustratedMessageType, svgConfig: SvgConfig): string {
        switch (type) {
            case IllustratedMessageTypes.SCENE:
                return `${svgConfig.scene?.url || ''}#${svgConfig.scene?.id}`;
            case IllustratedMessageTypes.DIALOG:
                return `${svgConfig.dialog?.url || ''}#${svgConfig.dialog?.id}`;
            case IllustratedMessageTypes.SPOT:
                return `${svgConfig.spot?.url || ''}#${svgConfig.spot?.id}`;
            case IllustratedMessageTypes.DOT:
                return `${svgConfig.dot?.url || ''}#${svgConfig.dot?.id}`;
            default:
                return '';
        }
    }
}
