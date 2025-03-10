import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostListener,
    OnDestroy,
    Renderer2,
    ViewContainerRef,
    ViewEncapsulation,
    contentChild,
    contentChildren,
    inject,
    signal
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListItemComponent } from '@fundamental-ngx/core/list';
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
    template: `
        @if (this.showListArea()) {
            <ng-content select="[fd-settings-list-area]"></ng-content>
        }
        @if (this.showDetailArea()) {
            <ng-content select="[fd-settings-detail-area]"></ng-content>
        }
    `,
    host: {
        class: 'fd-settings__container',
        '[class.fd-settings__container--md]': 'viewMode() === "md"',
        '[class.fd-settings__container--sm]': 'viewMode() === "sm"'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class SettingsContainerComponent implements OnDestroy, AfterViewInit {
    /** @hidden */
    readonly viewContainer = contentChild(SettingsHeaderDirective, { read: ViewContainerRef });

    /** @hidden */
    readonly headerButton = contentChild(SettingsHeaderButtonDirective, { descendants: true, read: ButtonComponent });

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
    private _eventUnlisteners: (() => void)[] = [];

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
        this._setupHeaderButton();
        this._setupListItemListeners();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._eventUnlisteners.forEach((unlistener) => unlistener());
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

        this._updateHeaderButtonVisibility();
    }

    /** @hidden */
    private _setupHeaderButton(): void {
        const button = this.headerButton()?.elementRef.nativeElement;
        if (!button) {
            return;
        }

        this._eventUnlisteners.push(
            this._renderer.listen(button, 'click', () => {
                if (this.viewMode() !== VIEW_MODE.LG) {
                    this.showListArea.set(true);
                    this.showDetailArea.set(false);
                }
            })
        );

        this._updateHeaderButtonVisibility();
    }

    /** @hidden */
    private _updateHeaderButtonVisibility(): void {
        const button = this.headerButton()?.elementRef.nativeElement;
        if (!button) {
            return;
        }

        this._renderer.setStyle(button, 'display', this.viewMode() === VIEW_MODE.LG ? 'none' : 'block');
    }

    /** @hidden */
    private _setupListItemListeners(): void {
        this.listItems().forEach((item: ListItemComponent) => {
            if (item.selected) {
                this.activeListItem.set(item);
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
                    }

                    if (this.viewMode() !== VIEW_MODE.LG) {
                        this.showListArea.set(false);
                        this.showDetailArea.set(true);
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
}
