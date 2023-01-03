import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { PanelContentDirective } from './panel-content/panel-content.directive';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

let panelUniqueId = 0;
let panelExpandUniqueId = 0;

/**
 * The panel is a container for grouping and displaying information
 * Types: Expandable (default) and Fixed
 * Modes: Tablet/Mobile (default) and Desktop (compact)
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fd-panel',
    templateUrl: './panel.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()]
})
export class PanelComponent implements OnInit, OnDestroy {
    /** User's custom classes */
    @Input()
    class: string;

    /** Whether the Panel is fixed */
    @Input()
    fixed: boolean;

    /** Id of the panel element. */
    @Input()
    @HostBinding('attr.id')
    id: string = 'fd-panel-' + panelUniqueId++;

    /** Id of the expand button */
    @Input()
    expandId: string = 'fd-panel-expand-' + panelExpandUniqueId++;

    /** aria-label of the expand button */
    @Input()
    expandAriaLabel: Nullable<string>;

    /** aria-labelledby of the expand button */
    @Input()
    expandAriaLabelledBy: Nullable<string>;

    /** Whether the Panel Content is expanded */
    @Input()
    expanded = false;

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
    constructor(
        private _cdRef: ChangeDetectorRef,
        private _elementRef: ElementRef,
        readonly _contentDensityObserver: ContentDensityObserver,
        @Optional() private _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenRtl();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
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
        return this.expanded ? 'slim-arrow-down' : this._rtl ? 'slim-arrow-left' : 'slim-arrow-right';
    }

    /** @hidden */
    private _listenRtl(): void {
        if (this._rtlService) {
            this._subscription.add(
                this._rtlService.rtl.subscribe((rtl) => {
                    this._rtl = rtl;
                    this._cdRef.markForCheck();
                })
            );
        }
    }
}
