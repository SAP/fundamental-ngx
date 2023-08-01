/* eslint-disable @angular-eslint/no-input-rename */
import {
    AfterViewInit,
    DestroyRef,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    inject,
    Input,
    NgModule,
    OnChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty, coerceElement } from '@angular/cdk/coercion';
import { ViewportSizeObservable } from '../../tokens/viewport-size.observable';
import { ResizeObserverService } from '../../services';
import { finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { BreakpointName, getBreakpointName } from './responsive-breakpoints';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Directive to show/hide element on specific breakpoint or range of window width.
 * Uses native ngIf directive to show/hide element.
 */
@Directive({
    selector:
        '[fdkBreakpoint], [fdkBreakpointS], [fdkBreakpointM], [fdkBreakpointL], [fdkBreakpointXL], [fdkBreakpointLt], [fdkBreakpointGt]',
    standalone: true
})
export class BreakpointDirective implements OnChanges, AfterViewInit {
    /**
     * Provide list of the breakpoints to show element on.
     * */
    @Input()
    set fdkBreakpoint(value: BreakpointName[]) {
        const providedValues = value.map((v) => v.toLowerCase());
        this.showOnS = providedValues.includes('s');
        this.showOnM = providedValues.includes('m');
        this.showOnL = providedValues.includes('l');
        this.showOnXL = providedValues.includes('xl');
    }

    /**
     * Show element on S breakpoint.
     * S - 0 - 599px
     * */
    @Input('fdkBreakpointS')
    set showOnS(value: BooleanInput) {
        this._showOnS = coerceBooleanProperty(value);
    }

    /**
     * Show element on M breakpoint.
     * M - 0 - 1023px
     * */
    @Input('fdkBreakpointM')
    set showOnM(value: BooleanInput) {
        this._showOnM = coerceBooleanProperty(value);
    }

    /**
     * Show element on L breakpoint.
     * L - 0 - 1439px
     * */
    @Input('fdkBreakpointL')
    set showOnL(value: BooleanInput) {
        this._showOnL = coerceBooleanProperty(value);
    }

    /**
     * Show element on XL breakpoint.
     *  */
    @Input('fdkBreakpointXL')
    set showOnXL(value: BooleanInput) {
        this._showOnXL = coerceBooleanProperty(value);
    }

    /**
     * Show element on breakpoint less than provided value.
     * */
    @Input()
    fdkBreakpointLt: number;

    /**
     * Show element on breakpoint greater than provided value.
     *  */
    @Input()
    fdkBreakpointGt: number;

    /**
     * Observe element width changes.
     */
    @Input('fdkBreakpointObserve')
    set observationSource(value: HTMLElement | ElementRef<HTMLElement>) {
        if (!value) {
            this._sizeObservable$.next(this.viewportSize$);
            return;
        }
        const element = coerceElement(value);
        this._sizeObservable$.next(
            this._resizeObserverService.observe(value).pipe(
                map(() => element.offsetWidth),
                startWith(element.offsetWidth)
            )
        );
    }

    /** @hidden */
    templateViewRef?: EmbeddedViewRef<unknown>;

    /** @hidden */
    onChanges$ = new Subject<void>();

    /** @hidden */
    _sizeObservable$: BehaviorSubject<Observable<number>> = new BehaviorSubject<Observable<number>>(
        inject(ViewportSizeObservable)
    );
    /** @hidden */
    private _showOnS = false;
    /** @hidden */
    private _showOnM = false;
    /** @hidden */
    private _showOnL = false;

    /** @hidden */
    private _showOnXL = false;

    /** @hidden */
    private viewportSize$ = inject(ViewportSizeObservable);

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _resizeObserverService = inject(ResizeObserverService);

    /** @hidden */
    constructor(private readonly templateRef: TemplateRef<any>, private readonly viewContainer: ViewContainerRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        combineLatest([this._sizeObservable$.pipe(switchMap((obs$) => obs$)), this.onChanges$.pipe(startWith(void 0))])
            .pipe(
                map(([w]) => [w, getBreakpointName(w)] as const),
                map(([width, breakpointName]) => this._shouldShow(width, breakpointName)),
                tap((shouldShow) => {
                    if (shouldShow) {
                        if (!this.templateViewRef) {
                            this.viewContainer.clear();
                            this.templateViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
                            this.templateViewRef.detectChanges();
                        }
                    } else {
                        this.viewContainer.clear();
                        this.templateViewRef = undefined;
                    }
                }),
                takeUntilDestroyed(this._destroyRef),
                finalize(() => {
                    this.viewContainer.clear();
                    this.templateViewRef = undefined;
                })
            )
            .subscribe();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.onChanges$.next();
    }

    /** @hidden */
    private _shouldShow(width: number, currentBreakpoint: BreakpointName): boolean {
        const shouldShowOnBreakpoints = [
            this._showOnS && 'S',
            this._showOnM && 'M',
            this._showOnL && 'L',
            this._showOnXL && 'XL'
        ].filter(Boolean);
        const shouldShow = shouldShowOnBreakpoints.includes(currentBreakpoint);
        if (this.fdkBreakpointLt) {
            return width < this.fdkBreakpointLt;
        }
        if (this.fdkBreakpointGt) {
            return width > this.fdkBreakpointGt;
        }
        return shouldShow;
    }
}

@NgModule({
    imports: [BreakpointDirective],
    exports: [BreakpointDirective]
})
export class BreakpointModule {}
