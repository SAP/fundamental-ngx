import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_LANGUAGE, resolveTranslationSignalFn } from '@fundamental-ngx/i18n';
import { DynamicPageConfig } from '../../dynamic-page.config';
import { DynamicPageService } from '../../dynamic-page.service';
import { patchHeaderI18nTexts } from '../../patch-header-i18n-texts';

let dynamicPageSubHeaderId = 0;
@Component({
    selector: 'fd-dynamic-page-subheader',
    templateUrl: './dynamic-page-subheader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonComponent, IconComponent],
    providers: [
        {
            provide: FD_LANGUAGE,
            useFactory: patchHeaderI18nTexts,
            deps: [[new Optional(), DynamicPageConfig]]
        }
    ]
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
        this._dynamicPageService.collapsed.set(collapsed);
    }

    get collapsed(): boolean {
        return this._dynamicPageService.collapsed();
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
    headerAriaLabel: Nullable<string> = 'Collapsed Header';

    /**
     * aria label for pin state of pin button
     */
    @Input()
    pinAriaLabel: string;

    /**
     * aria label for unpin state of pin button
     */
    @Input()
    unpinAriaLabel: string;

    /** Collapse/Expand change event raised */
    @Output()
    collapsedChange = new EventEmitter<boolean>();

    /** Reference to page header content */
    @ViewChild('pincollapseContainer')
    pinCollapseContainer: ElementRef<HTMLElement>;

    /**
     * id for collapsible header
     */
    collapsibleHeaderId = `${this.id}-collapsible`;

    /**
     * Aria Label for the toggle button
     * @hidden
     **/
    get _toggleButtonAriaLabel(): string {
        const expandLabel = this.expandLabel || this._defaultExpandLabel();
        const collapseLabel = this.collapseLabel || this._defaultCollapseLabel();
        return this._collapsed ? expandLabel : collapseLabel;
    }

    /**
     * Aria Label for the pin button
     * @hidden
     **/
    get _pinButtonAriaLabel(): string {
        const pinLabel = this.pinAriaLabel || this._defaultPinLabel();
        const unpinLabel = this.unpinAriaLabel || this._defaultUnpinLabel();
        return this._pinned ? unpinLabel : pinLabel;
    }

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
    private _resolveTranslationSignal = resolveTranslationSignalFn();

    /** @hidden */
    private _defaultExpandLabel = this._resolveTranslationSignal('coreDynamicPage.expandLabel');

    /** @hidden */
    private _defaultCollapseLabel = this._resolveTranslationSignal('coreDynamicPage.collapseLabel');

    /** @hidden */
    private _defaultPinLabel = this._resolveTranslationSignal('coreDynamicPage.pinLabel');

    /** @hidden */
    private _defaultUnpinLabel = this._resolveTranslationSignal('coreDynamicPage.unpinLabel');

    /** @hidden */
    constructor(readonly _dynamicPageService: DynamicPageService) {}

    /**
     * toggles the state of the header and
     * handles expanded/collapsed event
     */
    toggleCollapse(): void {
        this._pinned = false;
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this._collapsed);
    }

    /**
     * @hidden
     * click action on pin button
     */
    togglePinned(): void {
        this._pinned = !this._pinned;
        this._dynamicPageService.pinned.set(this._pinned);
    }
}
