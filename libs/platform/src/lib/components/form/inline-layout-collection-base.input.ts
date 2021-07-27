import {
    ChangeDetectorRef,
    Directive,
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
import { NgControl, NgForm } from '@angular/forms';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

import { CollectionBaseInput } from './collection-base.input';
import { FormFieldControl } from './form-control';
import { FormField } from './form-field';

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
    L: number = RESPONSIVE_BREAKPOINTS['L'];
    M: number = RESPONSIVE_BREAKPOINTS['M'];
    S: number = RESPONSIVE_BREAKPOINTS['S'];
}

@Injectable({
    providedIn: 'root'
})
export class ResponsiveBreakpointsService {
    breakpoints: object = {};
    activeBreakpoints: string[];
    minWidth = 'min-width';
    maxWidth = 'max-width';
    unit = 'px';

    getBreakpoints(config: ResponsiveBreakPointConfig): string[] {
        let breakPointStr: string;
        this.activeBreakpoints = [];

        for (const screenSize of Object.keys(config)) {
            switch (screenSize) {
                case 'S':
                    breakPointStr = `(max-width: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = screenSize;
                    break;
                case 'M':
                    breakPointStr = `(min-width: ${config['S']}${this.unit}) and (max-width: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = screenSize;
                    break;
                case 'L':
                    breakPointStr = `(min-width: ${config['M']}${this.unit}) and (max-width: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = screenSize;

                    // create entry for XL screen
                    breakPointStr = `(min-width: ${config[screenSize]}${this.unit})`;
                    this.activeBreakpoints.push(breakPointStr);
                    this.breakpoints[breakPointStr] = 'XL';
                    break;
            }
        }
        return this.activeBreakpoints;
    }

    getBreakpointName(breakpointValue): string {
        return this.breakpoints[breakpointValue];
    }
}

@Directive()
export abstract class InLineLayoutCollectionBaseInput extends CollectionBaseInput implements OnInit {
    /** object to change isInline property based on screen size */
    @Input()
    get inlineLayout(): InlineLayout {
        return this._inlineLayout;
    }

    set inlineLayout(layout: InlineLayout) {
        this._inlineLayout = layout;
        this._isInLineLayoutEnabled = true;
        this._setFieldLayout(layout);
    }

    /** @hidden */
    protected _inlineCurrentValue = new BehaviorSubject<boolean>(false);

    /** @hidden */
    protected _responsiveBreakPointConfig: ResponsiveBreakPointConfig;

    /** @hidden */
    private _inlineLayout: InlineLayout;

    /** @hidden */
    private _isInlineCurrent: boolean;

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

    constructor(
        cd: ChangeDetectorRef,
        readonly _responsiveBreakpointsService: ResponsiveBreakpointsService,
        readonly _breakpointObserver: BreakpointObserver,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        @Optional()
        @Inject(RESPONSIVE_BREAKPOINTS_CONFIG)
        readonly _defaultResponsiveBreakPointConfig?: ResponsiveBreakPointConfig
    ) {
        super(cd, ngControl, ngForm, formField, formControl);

        this._responsiveBreakPointConfig = _defaultResponsiveBreakPointConfig || new ResponsiveBreakPointConfig();
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (this._isInLineLayoutEnabled) {
            this._breakpointObserver
                .observe(this._responsiveBreakpointsService.getBreakpoints(this._responsiveBreakPointConfig))
                .subscribe((result) => this._breakPointMeet(result));
        }
    }

    /** set values of inline for each screen layout */
    private _setFieldLayout(inlineLayout: InlineLayout): void {
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
                    this._isInlineCurrent = this._sIsInline;
                    this._inlineCurrentValue.next(this._isInlineCurrent);
                    break;
                case 'M':
                    this._isInlineCurrent = this._mdIsInline;
                    this._inlineCurrentValue.next(this._isInlineCurrent);
                    break;
                case 'L':
                    this._isInlineCurrent = this._lgIsInline;
                    this._inlineCurrentValue.next(this._isInlineCurrent);
                    break;
                case 'XL':
                    this._isInlineCurrent = this._xlIsInline;
                    this._inlineCurrentValue.next(this._isInlineCurrent);
                    break;
                default:
                    this._isInlineCurrent = this._xlIsInline;
                    this._inlineCurrentValue.next(this._isInlineCurrent);
            }
        }
    }

    /** @hidden when screen size changes from one breakpoint to another */
    private _breakPointMeet(breakPoints: BreakpointState): void {
        if (breakPoints.matches) {
            for (const breakpoint in breakPoints.breakpoints) {
                if (breakPoints.breakpoints[breakpoint]) {
                    const breakPointName = this._responsiveBreakpointsService.getBreakpointName(breakpoint);
                    this._updateLayout(breakPointName);
                }
            }
        }
    }
}
