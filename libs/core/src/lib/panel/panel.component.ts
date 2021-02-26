import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation,
    Output,
    ContentChild,
    Optional,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { applyCssClass, ContentDensityService, CssClassBuilder, RtlService } from '../utils/public_api';
import { PanelContentDirective } from './panel-content/panel-content.directive';

let panelUniqueId = 0;
let panelExpandUniqueId = 0;

/**
 * The panel is a container for grouping and displaying information
 * Types: Expandable (default) and Fixed
 * Modes: Tablet/Mobile (default) and Desktop (compact)
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fd-panel',
    templateUrl: './panel.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements CssClassBuilder, OnChanges, OnInit, OnDestroy {
    /** User's custom classes */
    @Input()
    class: string;

    /** Whether the Panel is fixed */
    @Input()
    fixed: boolean;

    /** Whether to apply compact mode to the Panel */
    @Input()
    compact: boolean = null;

    /** Id of the panel element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-' + panelUniqueId++;

    /** Id of the expand button */
    @Input()
    expandId: string = 'fd-panel-expand-' + panelExpandUniqueId++;

    /** aria-label of the expand button */
    @Input()
    expandAriaLabel: string;

    /** aria-labelledby of the expand button */
    @Input()
    expandAriaLabelledBy: string;

    /** Whether the Panel Content is expanded */
    @Input()
    expanded: boolean;

    /** Output event triggered when the Expand button is clicked */
    @Output()
    expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Reference to panel content */
    @ContentChild(PanelContentDirective)
    panelContent: PanelContentDirective;

    /** @hidden */
    _rtl = false;

    /** @hidden */
    _subscription = new Subscription();

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef,
                private _elementRef: ElementRef,
                @Optional() private _contentDensityService: ContentDensityService,
                @Optional() private _rtlService: RtlService) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === null && this._contentDensityService) {
            this._subscription.add(this._contentDensityService.contentDensity.subscribe(density => {
                this.compact = density === 'compact';
                this.buildComponentCssClass();
            }))
        }
        this._listenRtl();
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return ['fd-panel', this.fixed ? 'fd-panel--fixed' : '', this.compact ? 'fd-panel--compact' : '', this.class];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** Methods that toggles the Panel Content */
    toggleExpand(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }

    /** @hidden */
    _getButtonIcon(): string {
        return this.expanded
            ? 'slim-arrow-down'
            : this._rtl
                ? 'slim-arrow-left'
                : 'slim-arrow-right'
    }

    /** @hidden */
    private _listenRtl(): void {
        if (this._rtlService) {
            this._subscription.add(
                this._rtlService.rtl.subscribe(rtl => {
                    this._rtl = rtl;
                    this._cdRef.markForCheck();
                })
            );
        }
    }
}
