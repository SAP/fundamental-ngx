import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
    HostBinding,
    ChangeDetectorRef,
    AfterContentInit,
    Inject
} from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { DynamicPageConfig } from '../../dynamic-page.config';
import { DynamicPageService } from '../../dynamic-page.service';
import { TranslationResolver, FdLanguage, FD_LANGUAGE } from '@fundamental-ngx/i18n';
import { firstValueFrom, Observable } from 'rxjs';

let dynamicPageSubHeaderId = 0;
@Component({
    selector: 'fd-dynamic-page-subheader',
    templateUrl: './dynamic-page-subheader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicPageSubheaderComponent implements AfterContentInit {
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
    expandLabel: string;

    /**
     * ARIA label for button when the header is expanded
     */
    @Input()
    collapseLabel: string;

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
     * id for collapsible header
     */
    collapsibleHeaderId = `${this.id}-collapsible`;
    /**
     * aria label for header
     */
    @Input()
    headerAriaLabel: Nullable<string>;

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
    private _translationResolver = new TranslationResolver();

    /** @hidden */
    private _language: FdLanguage;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        protected _dynamicPageConfig: DynamicPageConfig,
        private _dynamicPageService: DynamicPageService,
        @Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>
    ) {
        this._dynamicPageService.collapsed
            .pipe(distinctUntilChanged())
            .subscribe((collapsed) => this._handleCollapsedChange(collapsed));
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._init();
    }

    /** @hidden */
    private async _init(): Promise<void> {
        this._language = await firstValueFrom(this._language$);
        if (!this.expandLabel) {
            if (this._dynamicPageConfig && this._dynamicPageConfig.expandLabel) {
                this.expandLabel = this._dynamicPageConfig.expandLabel;
            } else {
                this.expandLabel = this._translationResolver.resolve(this._language, `coreDynamicPage.expandLabel`);
            }
        }
        if (!this.collapseLabel) {
            if (this._dynamicPageConfig && this._dynamicPageConfig.collapseLabel) {
                this.collapseLabel = this._dynamicPageConfig.collapseLabel;
            } else {
                this.collapseLabel = this._translationResolver.resolve(this._language, `coreDynamicPage.collapseLabel`);
            }
        }
        if (!this.pinAriaLabel) {
            if (this._dynamicPageConfig && this._dynamicPageConfig.pinLabel) {
                this.pinAriaLabel = this._dynamicPageConfig.pinLabel;
            } else {
                this.pinAriaLabel = this._translationResolver.resolve(this._language, `coreDynamicPage.pinLabel`);
            }
        }
        if (!this.unpinAriaLabel) {
            if (this._dynamicPageConfig && this._dynamicPageConfig.unpinLabel) {
                this.unpinAriaLabel = this._dynamicPageConfig.unpinLabel;
            } else {
                this.unpinAriaLabel = this._translationResolver.resolve(this._language, `coreDynamicPage.unpinLabel`);
            }
        }
        this._cd.detectChanges();
    }

    /**
     * toggles the state of the header and
     * handles expanded/collapsed event
     */
    toggleCollapse(): void {
        this._pinned = false;
        this._handleCollapsedChange(!this._collapsed);
    }

    /**
     * @hidden
     * click action on pin button
     */
    togglePinned(): void {
        this._pinned = !this._pinned;
        this._dynamicPageService.pinned.next(this._pinned);
    }

    /** @hidden */
    private _handleCollapsedChange(collapsed: boolean): void {
        if (collapsed === this._collapsed) {
            return;
        }

        this._collapsed = collapsed;
        this._dynamicPageService.collapsed.next(collapsed);
        this.collapsedChange.emit(this._collapsed);
        this._cd.detectChanges();
        this._dynamicPageService.subheaderVisibilityChange.next();
    }
}
