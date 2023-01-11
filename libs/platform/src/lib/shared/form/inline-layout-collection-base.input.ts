import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Host,
    Inject,
    Injectable,
    InjectionToken,
    Input,
    OnInit,
    Optional,
    Self,
    SkipSelf
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Subject } from 'rxjs';

import { CollectionBaseInput } from './collection-base.input';
import { PlatformFormFieldControl } from './form-control';
import { PlatformFormField } from './form-field';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

export interface InlineLayout {
    XL?: boolean;
    L?: boolean;
    M?: boolean;
    S?: boolean;
}

export enum RESPONSIVE_BREAKPOINTS {
    S = 600,
    M = 1024,
    L = 1440
}

export const RESPONSIVE_BREAKPOINTS_CONFIG = new InjectionToken<ResponsiveBreakPointConfig>(
    'Default Responsive breakpoint config'
);

@Injectable()
export class ResponsiveBreakPointConfig {
    /** Large screen */
    L: number = RESPONSIVE_BREAKPOINTS['L'];
    /** Medium screen */
    M: number = RESPONSIVE_BREAKPOINTS['M'];
    /** Small screen */
    S: number = RESPONSIVE_BREAKPOINTS['S'];
}

@Injectable({
    providedIn: 'root'
})
export class ResponsiveBreakpointsService {
    /** @hidden */
    breakpoints: Record<string, any> = {};
    /** @hidden */
    activeBreakpoints: string[];
    /** @hidden */
    minWidth = 'min-width';
    /** @hidden */
    maxWidth = 'max-width';
    /** @hidden */
    unit = 'px';

    /** @hidden */
    constructor(readonly _breakpointObserver: BreakpointObserver) {}

    /** subscribe to get current screen size based on config provided */
    observeBreakpointByConfig(config: ResponsiveBreakPointConfig): Subject<any> {
        const breakPointName: Subject<string> = new BehaviorSubject('S');

        this._breakpointObserver.observe(this._getBreakpoints(config)).subscribe((matchValues) => {
            const breakPoint = this._breakPointMeet(matchValues);
            breakPointName.next(breakPoint);
        });

        return breakPointName;
    }

    /** @hidden when screen size changes from one breakpoint to another */
    private _breakPointMeet(breakPointMatches: BreakpointState): string {
        let breakPointName: string | undefined;

        if (breakPointMatches.matches) {
            for (const breakpoint in breakPointMatches.breakpoints) {
                if (breakPointMatches.breakpoints[breakpoint]) {
                    breakPointName = this._getBreakpointName(breakpoint);
                }
            }
        }

        return breakPointName ?? 'S';
    }

    /** @hidden */
    private _getBreakpoints(config: ResponsiveBreakPointConfig): string[] {
        let breakPointStr: string;
        this.activeBreakpoints = [];

        for (const screenSize of Object.keys(config)) {
            switch (screenSize) {
                case 'S':
                    breakPointStr = `(${this.maxWidth}: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = screenSize;
                    break;
                case 'M':
                    breakPointStr = `(${this.minWidth}: ${config['S']}${this.unit}) and (${this.maxWidth}: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = screenSize;
                    break;
                case 'L':
                    breakPointStr = `(${this.minWidth}: ${config['M']}${this.unit}) and (${this.maxWidth}: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = screenSize;

                    // create entry for XL screen
                    breakPointStr = `(${this.minWidth}: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = 'XL';
                    break;
            }
        }

        return this.activeBreakpoints;
    }

    /** @hidden */
    private _getBreakpointName(breakpointValue): string {
        return this.breakpoints[breakpointValue];
    }
}

@Directive()
export abstract class InLineLayoutCollectionBaseInput extends CollectionBaseInput implements OnInit {
    /** object to change isInline property based on screen size */
    @Input()
    set inlineLayout(layout: InlineLayout | undefined) {
        if (layout) {
            this._inlineLayout = layout;
            this._isInLineLayoutEnabled = true;
        }
        this._setFieldLayout(layout);
    }
    get inlineLayout(): InlineLayout {
        return this._inlineLayout;
    }

    /** @hidden */
    protected _inlineCurrentValue$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    protected _responsiveBreakPointConfig: ResponsiveBreakPointConfig;

    /** @hidden */
    private _inlineLayout: InlineLayout;

    /** @hidden */
    private _xlIsInline: boolean;

    /** @hidden */
    private _lgIsInline: boolean;

    /** @hidden */
    private _mdIsInline: boolean;

    /** @hidden */
    private _sIsInline: boolean;

    /** @hidden */
    private _isInLineLayoutEnabled = false;

    /** @hidden */
    protected constructor(
        cd: ChangeDetectorRef,
        elementRef: ElementRef,
        readonly _responsiveBreakpointsService: ResponsiveBreakpointsService,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly controlContainer: ControlContainer,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl,
        @Optional()
        @Inject(RESPONSIVE_BREAKPOINTS_CONFIG)
        readonly _defaultResponsiveBreakPointConfig?: ResponsiveBreakPointConfig
    ) {
        super(cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);

        this._responsiveBreakPointConfig = _defaultResponsiveBreakPointConfig || new ResponsiveBreakPointConfig();
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();

        if (this._isInLineLayoutEnabled) {
            this._responsiveBreakpointsService
                .observeBreakpointByConfig(this._responsiveBreakPointConfig)
                .subscribe((breakPointName) => {
                    this._updateLayout(breakPointName);
                });
        }
    }

    /** @hidden set values of inline for each screen layout */
    private _setFieldLayout(inlineLayout?: InlineLayout): void {
        if (!inlineLayout) {
            this._isInLineLayoutEnabled = false;
            return;
        }
        try {
            this._sIsInline = !!inlineLayout['S'];
            this._mdIsInline = !!inlineLayout['M'];
            this._lgIsInline = !!inlineLayout['L'];
            this._xlIsInline = !!inlineLayout['XL'];
        } catch (error) {
            this._isInLineLayoutEnabled = false;
        }
    }

    /** @hidden */
    private _updateLayout(currentBreakingPointName: string): void {
        if (this._isInLineLayoutEnabled) {
            switch (currentBreakingPointName) {
                case 'S':
                    this._inlineCurrentValue$.next(this._sIsInline);
                    break;
                case 'M':
                    this._inlineCurrentValue$.next(this._mdIsInline);
                    break;
                case 'L':
                    this._inlineCurrentValue$.next(this._lgIsInline);
                    break;
                case 'XL':
                    this._inlineCurrentValue$.next(this._xlIsInline);
                    break;
                default:
                    this._inlineCurrentValue$.next(this._xlIsInline);
            }
        }
    }
}
