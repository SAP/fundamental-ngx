import {
    AfterViewInit,
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
import { Subscription, fromEvent } from 'rxjs';

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
    standalone: true,
    imports: []
})
export class IllustratedMessageComponent implements AfterViewInit, OnChanges, OnDestroy, OnInit, CssClassBuilder {
    /**
     * The type of the Illustrated Message
     * Options include: 'scene' | 'spot' | 'dialog' | 'dot' | 'base'.
     * The default type is set to 'scene'
     */
    @Input()
    type: IllustratedMessageType = IllustratedMessageTypes.SCENE;

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
    _containerWidth: number;

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
        return ['fd-illustrated-message', this.type ? `fd-illustrated-message--${this.type}` : '', this.class];
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();
        if ('svgConfig' in changes) {
            this._constructHref();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._constructHref();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._containerWidth = this.elementRef.nativeElement.offsetWidth;
        this._constructHref();
        this._subscriptions.add(fromEvent(window, 'resize').subscribe(() => this._constructHref()));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _constructHref(): void {
        let inlineSvg: string | undefined;
        this._inlineSvg = undefined;

        this._containerWidth = this.elementRef.nativeElement.offsetWidth;

        if (this._containerWidth >= 682) {
            this.type = IllustratedMessageTypes.SCENE;
        }

        if (this._containerWidth >= 361 && this._containerWidth <= 681) {
            this.type = IllustratedMessageTypes.DIALOG;
        }

        if (this._containerWidth >= 261 && this._containerWidth <= 360) {
            this.type = IllustratedMessageTypes.SPOT;
        }

        if (this._containerWidth >= 161 && this._containerWidth <= 260) {
            this.type = IllustratedMessageTypes.DOT;
        }

        if (this._containerWidth <= 160) {
            this.type = IllustratedMessageTypes.BASE;
        }

        if (this.svgConfig) {
            switch (this.type) {
                case IllustratedMessageTypes.SCENE:
                    inlineSvg = this.svgConfig.scene?.file;
                    this._href = `${this.svgConfig.scene?.url || ''}#${this.svgConfig.scene?.id}`;
                    break;

                case IllustratedMessageTypes.DIALOG:
                    inlineSvg = this.svgConfig.dialog?.file;
                    this._href = `${this.svgConfig.dialog?.url || ''}#${this.svgConfig.dialog?.id}`;
                    break;

                case IllustratedMessageTypes.SPOT:
                    inlineSvg = this.svgConfig.spot?.file;
                    this._href = `${this.svgConfig.spot?.url || ''}#${this.svgConfig.spot?.id}`;
                    break;

                case IllustratedMessageTypes.DOT:
                    inlineSvg = this.svgConfig.dot?.file;
                    this._href = `${this.svgConfig.dot?.url || ''}#${this.svgConfig.dot?.id}`;
                    break;
            }
        }
        if (inlineSvg) {
            this._inlineSvg = this._sanitizer.bypassSecurityTrustHtml(inlineSvg);
        }

        this.buildComponentCssClass();
        this._cdRef.detectChanges();
    }
}
