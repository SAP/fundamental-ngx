import { AsyncPipe } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    contentChildren,
    HostListener,
    inject,
    input,
    OnDestroy,
    OnInit,
    Renderer2,
    signal,
    viewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { InitialFocusDirective, RtlService } from '@fundamental-ngx/cdk/utils';
import { BarComponent, BarElementDirective, BarLeftDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListItemComponent } from '@fundamental-ngx/core/list';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { map, Observable } from 'rxjs';
import { SettingsDetailAreaDirective } from '../settings-detail-area/settings-detail-area.directive';
import { SettingsHeaderButtonDirective } from '../settings-header-button/settings-header-button.directive';
import { SettingsHeaderDirective } from '../settings-header/settings-header.directive';

export type SettingsViewMode = 'lg' | 'md' | 'sm';

export enum VIEW_MODE {
    LG = 'lg',
    MD = 'md',
    SM = 'sm'
}

@Component({
    selector: 'fd-settings-container',
    templateUrl: './settings-container.component.html',
    styleUrl: './settings-container.component.scss',
    host: {
        class: 'fd-settings__container',
        '[class.fd-settings__container--md]': 'viewMode() === "md"',
        '[class.fd-settings__container--sm]': 'viewMode() === "sm"'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AsyncPipe,
        BarComponent,
        BarElementDirective,
        BarLeftDirective,
        SettingsHeaderButtonDirective,
        SettingsHeaderDirective,
        SettingsDetailAreaDirective,
        ButtonComponent,
        TitleComponent,
        InitialFocusDirective
    ]
})
export class SettingsContainerComponent implements OnInit, OnDestroy, AfterViewInit {
    /**
     * Heading level for the title in the Details Area
     * Default value is 2
     * Acceptable values: number 1 | 2 | 3 | 4 | 5 | 6
     */
    readonly detailsAreaTitleHeading = input<1 | 2 | 3 | 4 | 5 | 6>(2);

    /**
     * Heading level display size for the title in the Details Area (controls the font size)
     * Default value is 5
     * Acceptable values: number 1 | 2 | 3 | 4 | 5 | 6
     */
    readonly detailsAreaTitleHeadingSize = input<1 | 2 | 3 | 4 | 5 | 6>(5);

    /**
     * aria-label and title value for the back button
     */
    readonly backBtnAriaLabel = input<string>('');

    /**
     * Handle the navigation icon (arrow) of the Back button in RTL mode
     */
    navigationArrow$: Observable<string>;

    /** @hidden */
    readonly viewContainer = viewChild('container', { read: ViewContainerRef });

    /** @hidden */
    readonly listItems = contentChildren(ListItemComponent, { descendants: true });

    /** @hidden */
    readonly activeListItem = signal<ListItemComponent | null>(null);

    /** @hidden */
    readonly viewMode = signal<SettingsViewMode>(VIEW_MODE.LG);

    /** @hidden */
    readonly screenWidth = signal<number>(window.innerWidth);

    /** @hidden */
    readonly showListArea = signal<boolean>(true);

    /** @hidden */
    readonly showDetailArea = signal<boolean>(true);

    /** @hidden */
    readonly activeTitle = signal<string>('');

    /** @hidden */
    private _eventUnlisteners: (() => void)[] = [];

    /** @hidden */
    private _rtlService = inject(RtlService);

    /** @hidden */
    private _renderer = inject(Renderer2);

    /** @hidden */
    constructor() {
        this._updateViewMode();
    }

    /** @hidden */
    @HostListener('window:resize')
    onWindowResize(): void {
        this.screenWidth.set(window.innerWidth);
        this._updateViewMode();
    }

    /** @hidden */
    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._updateViewMode();
        this._setupListItemListeners();

        if (this.showListArea()) {
            this._focusInitialListItem();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._eventUnlisteners.forEach((unlistener) => unlistener());
    }

    /** @hidden */
    onHeaderBackClick(): void {
        if (this.viewMode() !== VIEW_MODE.LG) {
            this.showListArea.set(true);
            this.showDetailArea.set(false);

            queueMicrotask(() => this._focusInitialListItem());
        }
    }

    /** @hidden */
    private _updateViewMode(): void {
        const screenWidth = this.screenWidth();

        if (screenWidth < 600) {
            this.viewMode.set(VIEW_MODE.SM);
        } else if (screenWidth < 1024) {
            this.viewMode.set(VIEW_MODE.MD);
        } else {
            this.viewMode.set(VIEW_MODE.LG);
        }

        const isLargeView = this.viewMode() === VIEW_MODE.LG;

        this.showListArea.set(true);
        this.showDetailArea.set(isLargeView);

        if (isLargeView && this.activeListItem()) {
            queueMicrotask(() => this._renderTemplate());
        }
    }

    /** @hidden */
    private _setupListItemListeners(): void {
        this.listItems().forEach((item: ListItemComponent) => {
            if (item.selected) {
                this.activeListItem.set(item);
                this._updateActiveTitle(item);
                this._renderTemplate();
            }

            this._eventUnlisteners.push(
                this._renderer.listen(item.elementRef.nativeElement, 'click', () => {
                    const currentActiveItem = this.activeListItem();
                    if (currentActiveItem) {
                        currentActiveItem.selected = false;
                    }

                    this.activeListItem.set(item);

                    const newActiveItem = this.activeListItem();
                    if (newActiveItem) {
                        newActiveItem.selected = true;
                        this._updateActiveTitle(newActiveItem);
                    }

                    if (this.viewMode() !== VIEW_MODE.LG) {
                        this.showListArea.set(false);
                        this.showDetailArea.set(true);
                        setTimeout(() => this._renderTemplate());
                    }

                    this._renderTemplate();
                })
            );
        });
    }

    /** @hidden */
    private _renderTemplate(): void {
        const template = this.activeListItem()?.settingsListTpl();

        if (this.viewContainer() && template) {
            this.viewContainer()?.clear();
            this.viewContainer()?.createEmbeddedView(template);
        }
    }

    /** @hidden */
    private _updateActiveTitle(item: ListItemComponent): void {
        const titleEl = item.elementRef.nativeElement.querySelector('[fd-list-title]');
        const titleText = titleEl?.textContent?.trim() || '';
        this.activeTitle.set(titleText);
    }

    /** @hidden */
    private _focusInitialListItem(): void {
        queueMicrotask(() => {
            const items = this.listItems();
            if (!items?.length) {
                return;
            }

            const selectedItem = items.find((item) => item.selected);
            const itemToFocus = selectedItem ?? items[0];

            setTimeout(() => {
                const el = itemToFocus.elementRef.nativeElement as HTMLElement;
                el.focus();
            });
        });
    }
}
