import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    ElementRef,
    HostListener,
    inject,
    input,
    OnDestroy,
    Renderer2,
    signal,
    TemplateRef,
    viewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { InitialFocusDirective, RtlService } from '@fundamental-ngx/cdk/utils';
import { BarComponent, BarElementDirective, BarLeftDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListItemComponent } from '@fundamental-ngx/core/list';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { SettingsDetailAreaDirective } from '../settings-detail-area/settings-detail-area.directive';
import { SettingsHeaderButtonDirective } from '../settings-header-button/settings-header-button.directive';
import { SettingsHeaderDirective } from '../settings-header/settings-header.directive';

export type SettingsViewMode = 'lg' | 'md' | 'sm';

export enum VIEW_MODE {
    LG = 'lg',
    MD = 'md',
    SM = 'sm'
}

/** Represents a secondary view in the view stack */
export interface SettingsStackedView {
    /** The template to render */
    template: TemplateRef<any>;
    /** The title to display in the header */
    title: string;
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
    imports: [
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
export class SettingsContainerComponent implements OnDestroy, AfterViewInit {
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

    /** Whether there is a stacked (secondary) view currently displayed */
    readonly hasStackedView = computed(() => this._viewStack().length > 0);

    /**
     * The current title to display in the header.
     * Returns the stacked view's title if one exists, otherwise the active list item's title.
     */
    readonly currentTitle = computed(() => {
        const stack = this._viewStack();
        return stack.length > 0 ? stack[stack.length - 1].title : this.activeTitle();
    });

    /**
     * Handle the navigation icon (arrow) of the Back button in RTL mode
     */
    protected readonly navigationArrow = computed(() =>
        this._rtlService?.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    /**
     * Stack of secondary views pushed on top of the main template.
     * This enables drill-down navigation within a settings section.
     */
    private readonly _viewStack = signal<SettingsStackedView[]>([]);

    /** @hidden */
    private _eventUnlisteners: (() => void)[] = [];

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

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

    /**
     * Push a secondary view onto the stack.
     * Use this to navigate to a drill-down view within a settings section.
     * @param template The template to render
     * @param title The title to display in the header
     */
    pushView(template: TemplateRef<any>, title: string): void {
        this._viewStack.update((stack) => [...stack, { template, title }]);
        this._renderCurrentView();

        // Focus the back button after rendering the secondary view
        setTimeout(() => this._focusBackButton());
    }

    /**
     * Pop the top view from the stack, returning to the previous view.
     * If no stacked views exist, this method does nothing.
     */
    popView(): void {
        if (this._viewStack().length === 0) {
            return;
        }
        this._viewStack.update((stack) => stack.slice(0, -1));
        this._renderCurrentView();
    }

    /**
     * Clear all stacked views and return to the main template.
     */
    clearViewStack(): void {
        this._viewStack.set([]);
    }

    /** @hidden */
    onHeaderBackClick(): void {
        // If we have stacked views, pop the top view instead of navigating back to the list
        if (this.hasStackedView()) {
            this.popView();
            return;
        }

        if (this.viewMode() !== VIEW_MODE.LG) {
            this.showListArea.set(true);
            this.showDetailArea.set(false);

            /**  The timeout is to ensure any keyboard events are fully processed before focusing the list item. This prevents the Enter key that triggered the back button from accidentally activating the newly focused list item. */

            setTimeout(() => this._focusInitialListItem(), 200);
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
            queueMicrotask(() => this._renderCurrentView());
        }
    }

    /** @hidden */
    private _setupListItemListeners(): void {
        this.listItems().forEach((item: ListItemComponent) => {
            if (item.selected) {
                this.activeListItem.set(item);
                this._updateActiveTitle(item);
                this._renderCurrentView();
            }

            this._eventUnlisteners.push(
                this._renderer.listen(item.elementRef.nativeElement, 'click', () => {
                    const currentActiveItem = this.activeListItem();
                    if (currentActiveItem) {
                        currentActiveItem.selected = false;
                    }

                    this.activeListItem.set(item);

                    // Clear any stacked views when switching list items
                    this.clearViewStack();

                    const newActiveItem = this.activeListItem();
                    if (newActiveItem) {
                        newActiveItem.selected = true;
                        this._updateActiveTitle(newActiveItem);
                    }

                    if (this.viewMode() !== VIEW_MODE.LG) {
                        this.showListArea.set(false);
                        this.showDetailArea.set(true);
                        setTimeout(() => this._renderCurrentView());
                    }

                    this._renderCurrentView();
                })
            );
        });
    }

    /** @hidden */
    private _renderCurrentView(): void {
        const stack = this._viewStack();
        const template = stack.length > 0 ? stack[stack.length - 1].template : this.activeListItem()?.settingsListTpl();

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

            // setTimeout is needed so that the focus outline is displayed, o.w. the item is focussed, the tabindex is updated, but without the timeout the focus is not shown.
            setTimeout(() => {
                const el = itemToFocus.elementRef.nativeElement as HTMLElement;
                el.focus();
            });
        });
    }

    /** @hidden Focus the back button in the header */
    private _focusBackButton(): void {
        const backButton = this._elementRef.nativeElement.querySelector(
            'button[fd-settings-header-button]'
        ) as HTMLElement;
        if (backButton) {
            backButton.focus();
        }
    }
}
