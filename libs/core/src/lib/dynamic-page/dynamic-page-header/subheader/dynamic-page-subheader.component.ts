import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    HostBinding,
    ChangeDetectorRef
} from '@angular/core';

import { DynamicPageConfig } from '../../dynamic-page.config';
import { DynamicPageService } from '../../dynamic-page.service';
import { distinctUntilChanged } from 'rxjs/operators';

let dynamicPageSubHeaderId = 0;
@Component({
    selector: 'fd-dynamic-page-subheader',
    templateUrl: './dynamic-page-subheader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageSubheaderComponent {
    /**
     * whether the header can be collapsed. True by default. If set to false, both pin/collapse buttons disappear
     * and the header stays visible
     */
    @Input()
    collapsible = true;

    /**
     * whether the header should be allowed to be pinned or unpinned. When set, the pin button shows up.
     * Pinning the header will make the header stay visible and the collapse button(if present) will disappear until unpinned.
     */
    @Input()
    pinnable = false;

    /**
     * the initial state of the header. Set to true if header should be collapsed.
     */
    @Input()
    set collapsed(collapsed: boolean) {
        this._handleCollapsedChange(collapsed);
    }

    get collapsed(): boolean {
        return this._collapsed;
    }

    /**
     * ARIA label for button when the header is collapsed
     */
    @Input()
    expandLabel: string = this._dynamicPageConfig.expandLabel;

    /**
     * ARIA label for button when the header is expanded
     */
    @Input()
    collapseLabel: string = this._dynamicPageConfig.collapseLabel;

    /** Header role  */
    @Input()
    @HostBinding('attr.role')
    role = 'region';

    /**
     * id for header
     */
    @Input()
    @HostBinding('attr.id')
    id = `fd-dynamic-page-header-id-${dynamicPageSubHeaderId++}`;

    /**
     * aria label for header
     */
    @Input()
    headerAriaLabel: string;

    /**
     * aria label for pin state of pin button
     */
    @Input()
    pinAriaLabel: string = this._dynamicPageConfig.pinLabel;

    /**
     * aria label for unpin state of pin button
     */
    @Input()
    unpinAriaLabel: string = this._dynamicPageConfig.unpinLabel;

    /** Collapse/Expand change event raised */
    @Output()
    collapsedChange = new EventEmitter<boolean>();

    /** Reference to page header content */
    @ViewChild('pincollapseContainer')
    pinCollapseContainer: ElementRef<HTMLElement>;

    /**
     * tracking if pin button is pinned
     */
    _pinned = false;

    /**
     * @hidden
     * tracking expand/collapse button
     */
    private _collapsed = false;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        protected _dynamicPageConfig: DynamicPageConfig,
        private _dynamicPageService: DynamicPageService
    ) {
        this._dynamicPageService.collapsed
            .pipe(distinctUntilChanged())
            .subscribe(collapsed => this._handleCollapsedChange(collapsed));
    }

    /**
     * toggles the state of the header and
     * handles expanded/collapsed event
     */
    toggleCollapse(): void {
        this._pinned = false;
        this._handleCollapsedChange(!this._collapsed)
    }

    /**
     * @hidden
     * click action on pin button
     */
    togglePinned(): void {
        this._pinned = !this._pinned;
        this._dynamicPageService.pinned.next(this._pinned);
    }

    private _handleCollapsedChange(collapsed: boolean): void {
        if (collapsed === this._collapsed) {
            return;
        }

        this._collapsed = collapsed;
        this._dynamicPageService.collapsed.next(collapsed);
        this._cd.detectChanges();
        this._dynamicPageService.subheaderVisibilityChange.next();
    }
}
