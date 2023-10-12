import { computed, Directive, ElementRef, inject, Input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HasElementRef, ResizeObserverService, ResponsiveBreakpoints } from '@fundamental-ngx/cdk/utils';
import { ContentDensityDirective, ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { distinctUntilChanged, map, startWith } from 'rxjs';
import { FdbToolHeaderMode, ToolHeaderComponent } from '../components/tool-header/tool-header.component';

interface FdbToolHeaderModeConfig {
    desktop: number;
    tabletlandscape: [number, number];
    tabletportrait: [number, number];
    mobile: number;
}

const DEFAULT_CONFIG: FdbToolHeaderModeConfig = {
    desktop: ResponsiveBreakpoints.L + 1,
    tabletlandscape: [ResponsiveBreakpoints.M + 1, ResponsiveBreakpoints.L],
    tabletportrait: [ResponsiveBreakpoints.S + 1, ResponsiveBreakpoints.M],
    mobile: ResponsiveBreakpoints.S
};

@Directive({
    selector: 'fdb-tool-header[fdbToolHeaderAutoMode]',
    hostDirectives: [ContentDensityDirective],
    standalone: true
})
export class ToolHeaderAutoModeDirective implements HasElementRef {
    /**
     * What sizes should be used to determine mode.
     * Sizes mean the width of the tool header, not the whole screen.
     **/
    @Input() set config(config: Partial<FdbToolHeaderModeConfig>) {
        this._config.set({ ...DEFAULT_CONFIG, ...config });
    }

    /**
     * Reference to the element on which the directive is applied.
     */
    elementRef: ElementRef = inject(ElementRef);

    /**
     * Current configuration of the directive.
     */
    protected _config = signal(DEFAULT_CONFIG);

    /** @hidden */
    protected _contentDensity = inject(ContentDensityDirective);

    /**
     * Signal of the Width of the element
     */
    protected _elementWidth = toSignal(
        inject(ResizeObserverService)
            .observe(this.elementRef.nativeElement)
            .pipe(
                map((entries) => entries[0].contentRect.width),
                startWith(this.elementRef.nativeElement.clientWidth)
            ),
        { requireSync: true }
    );
    /**
     * Reference to the ToolHeaderComponent
     */
    protected _toolHeaderComponent = inject(ToolHeaderComponent, { host: true });

    /**
     * Current mode of the ToolHeaderComponent
     */
    protected _currentMode = computed(() => this._getMode(this._elementWidth(), this._config()));

    /**
     * @hidden
     */
    constructor() {
        toObservable(this._currentMode)
            .pipe(
                distinctUntilChanged((a, b) => a[0] === b[0] && a[1] === b[1]),
                takeUntilDestroyed()
            )
            .subscribe((_mode) => {
                const [mode, orientation = 'landscape'] = _mode;
                this._toolHeaderComponent._mode = mode;
                this._toolHeaderComponent._orientation = orientation;
                this._contentDensity.fdContentDensity = mode ? ContentDensityMode.COMPACT : ContentDensityMode.COZY;
            });
    }

    /**
     * What mode should be used for the given width and configuration
     * @param width
     * @param config
     * @private
     */
    private _getMode(width: number, config: FdbToolHeaderModeConfig): [FdbToolHeaderMode, 'landscape' | 'portrait'] {
        if (width >= config.desktop) {
            return ['', 'landscape'];
        }
        if (width <= config.mobile) {
            return ['mobile', 'landscape'];
        }
        return [
            'tablet',
            width >= config.tabletlandscape[0] && width <= config.tabletlandscape[1] ? 'landscape' : 'portrait'
        ];
    }
}
