import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PanelService } from '../panel.service';
import { filter } from 'rxjs/operators';

let expandButtonUniqueId: number = 0;

/**
 * ```html
 * <div fd-panel-expand></div>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-panel-expand]',
    templateUrl: './panel-expand.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelExpandComponent implements OnInit, OnDestroy {
    /** @hidden */
    @HostBinding('class.fd-panel__expand')
    readonly fdPanelExpandClass: boolean = true;

    /** Whether to apply compact mode to the button that shows/hides the Panel content. */
    @Input()
    compact: boolean = false;

    /** aria-label attribute of the expand button. */
    @Input()
    ariaLabel: string = null;

    /** aria-labelledby attribute of the expand button. */
    @Input()
    ariaLabelledBy: string = null;

    /** Id for the expand button. If omitted, a unique one is generated. */
    @Input()
    id: string = 'fd-panel-expand-' + expandButtonUniqueId++;

    /** Whether the panel content is expanded. */
    expanded: boolean;

    /** @hidden */
    private _subscription: Subscription;

    constructor(private _cdRef: ChangeDetectorRef, private _panelService: PanelService) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenOnExpandedChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /** Methods that toggles the content of the Panel. */
    toggleExpand(): void {
        this.expanded = !this.expanded;
        this._panelService.updateExpanded(this.expanded, true);
    }

    /** @hidden */
    private _listenOnExpandedChange(): void {
        this._subscription = this._panelService.expanded$
            .pipe(filter(value => !value.isExpandTriggerClick))
            .subscribe(value => {
                this.expanded = value.isExpanded;
                this._cdRef.markForCheck();
            });
    }
}
