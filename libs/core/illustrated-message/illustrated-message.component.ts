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

export interface SvgItemConfig {
    url: string;
    id: string;
    file: string;
}

export interface SvgConfig {
    // New keys
    large?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    medium?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    small?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    xsmall?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;

    // Legacy keys
    scene?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    dialog?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    spot?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
    dot?: RequireOnlyOne<SvgItemConfig, 'url' | 'file'>;
}

export type IllustratedMessageType =
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'base'
    | 'scene'
    | 'dialog'
    | 'spot'
    | 'dot';

export enum IllustratedMessageTypes {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small',
    EXTRA_SMALL = 'xsmall',
    BASE = 'base',
    SCENE = 'scene',
    DIALOG = 'dialog',
    SPOT = 'spot',
    DOT = 'dot'
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
    @Input()
    type: IllustratedMessageType;

    @Input()
    svgConfig: SvgConfig;

    @Input()
    svgAriaLabel: Nullable<string>;

    @Input()
    svgAlt: Nullable<string>;

    @Input()
    noSvg = false;

    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-illustrated-message-' + illustratedMessageUniqueId++;

    @Input()
    class: string;

    _href: string;
    _isSmallScreen: boolean;
    _inlineSvg: SafeHtml | undefined;
    _tempType: IllustratedMessageType;

    private _subscriptions = new Subscription();

    constructor(
        public readonly elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        private _sanitizer: DomSanitizer
    ) {}

    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-illustrated-message',
            this._tempType ? `fd-illustrated-message--${this._tempType}` : '',
            this.class || ''
        ].filter(Boolean);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('svgConfig' in changes) {
            this._constructHref();
        }
    }

    ngOnInit(): void {
        const resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(200))
            .subscribe(() => this._constructHref());
        this._subscriptions.add(resizeSubscription);
    }

    ngAfterContentChecked(): void {
        this._constructHref();
    }

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    private _constructHref(): void {
        this._inlineSvg = undefined;
        const containerWidth = this.elementRef.nativeElement.offsetWidth;
        const normalizedType = this._normalizeType(this.type);
        this._tempType = this.type ? normalizedType : this._determineIllustratedMessageType(containerWidth);

        const normalizedConfig = this._normalizeSvgConfig(this.svgConfig);
        const inlineSvg = normalizedConfig?.[this._tempType]?.file;
        if (inlineSvg) {
            this._inlineSvg = this._sanitizer.bypassSecurityTrustHtml(inlineSvg);
        }

        this._href = normalizedConfig ? this._getHrefByType(this._tempType, normalizedConfig) : '';
        this.buildComponentCssClass();
        this._cdRef.markForCheck();
    }

    private _determineIllustratedMessageType(width: number): IllustratedMessageType {
        if (width >= 682) {
            return IllustratedMessageTypes.LARGE;
        } else if (width >= 361) {
            return IllustratedMessageTypes.MEDIUM;
        } else if (width >= 261) {
            return IllustratedMessageTypes.SMALL;
        } else if (width >= 161) {
            return IllustratedMessageTypes.EXTRA_SMALL;
        }

        return IllustratedMessageTypes.BASE;
    }

    private _normalizeType(type: IllustratedMessageType): IllustratedMessageType {
        switch (type) {
            case 'scene':
                return 'large';
            case 'dialog':
                return 'medium';
            case 'spot':
                return 'small';
            case 'dot':
                return 'xsmall';
            default:
                return type;
        }
    }

    private _normalizeSvgConfig(config: SvgConfig): SvgConfig {
        return {
            large: config.large || config.scene,
            medium: config.medium || config.dialog,
            small: config.small || config.spot,
            xsmall: config.xsmall || config.dot
        };
    }

    private _getHrefByType(type: IllustratedMessageType, svgConfig: SvgConfig): string {
        switch (type) {
            case 'large':
                return `${svgConfig.large?.url || ''}#${svgConfig.large?.id}`;
            case 'medium':
                return `${svgConfig.medium?.url || ''}#${svgConfig.medium?.id}`;
            case 'small':
                return `${svgConfig.small?.url || ''}#${svgConfig.small?.id}`;
            case 'xsmall':
                return `${svgConfig.xsmall?.url || ''}#${svgConfig.xsmall?.id}`;
            default:
                return '';
        }
    }
}
