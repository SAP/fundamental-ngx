import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    HostListener,
    OnInit,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyboardSupportService, RtlService } from '@fundamental-ngx/cdk/utils';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { UserMenuListItemComponent } from '@fundamental-ngx/core/user-menu';
import { Observable, Subject, map, merge, startWith, takeUntil } from 'rxjs';

@Component({
    selector: 'fd-user-menu-body',
    templateUrl: './user-menu-body.component.html',
    host: {
        class: 'fd-user-menu__body'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BarComponent,
        CommonModule,
        TitleComponent,
        BarLeftDirective,
        BarRightDirective,
        ButtonBarComponent,
        BarElementDirective
    ],
    providers: [KeyboardSupportService, contentDensityObserverProviders()]
})
export class UserMenuBodyComponent implements OnInit, AfterViewInit {
    /** @hidden */
    @ContentChildren(UserMenuListItemComponent, { descendants: true })
    readonly _listItems: QueryList<UserMenuListItemComponent>;

    /**
     * Handle the navigation icon (arrow) of the Back button in RTL mode
     */
    navigationArrow$: Observable<string>;

    /**
     * Template ref of the submenu
     */
    submenu = signal<TemplateRef<any> | null>(null);

    /**
     * The text of the selected item
     * Needed in mobile mode to update the title in the header
     */
    selectedItemTitle = signal<string | null>(null);

    /**
     * Template ref to the header of the user menu body.
     * Needed in mobile mode
     */
    readonly bodyHeader = viewChild<TemplateRef<any>>('bodyHeader');

    /** @hidden */
    private _rtlService = inject(RtlService);

    /** @hidden */
    private _refresh$ = new Subject<void>();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _keyboardSupportService = inject(KeyboardSupportService);

    /** @hidden */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this._keyboardSupportService.keyManager) {
            this._keyboardSupportService.onKeyDown(event);
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._keyboardSupportService.setKeyboardService(this._listItems, false, false);

        this._listItems.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._setupInteractionListeners();
        });

        this._listItems.changes
            .pipe(startWith(this._listItems), takeUntilDestroyed(this._destroyRef))
            .subscribe((listItems) => {
                listItems.forEach((item: UserMenuListItemComponent) => {
                    item.showSubmenu
                        .pipe(takeUntilDestroyed(this._destroyRef))
                        .subscribe((submenuTpl: TemplateRef<any> | null) => {
                            this.selectItem(submenuTpl);
                        });
                    item.updateTitle.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((title: string | null) => {
                        this.updateTitle(title);
                    });
                });
            });
    }

    /**
     * Selects the item and sets the submenu template ref
     */
    selectItem(submenuTpl: TemplateRef<any> | null): void {
        this.submenu.set(submenuTpl);
    }

    /**
     * Updates the title of the selected item
     */
    updateTitle(title: string | null): void {
        this.selectedItemTitle.set(title);
    }

    /**
     * Clears the submenu template ref and the selected item title
     * Closes the submenu and returns to the main view
     */
    clearSubmenu(): void {
        this.submenu.set(null);
        this.selectedItemTitle.set(null);
    }

    /**
     * Closes the dialog in mobile mode
     */
    closeDialog(dialogRef): void {
        dialogRef.dismiss('Close');
        this.clearSubmenu();
    }

    /** @hidden */
    private _setupInteractionListeners(): void {
        this._refresh$.next();
        this._refresh$.complete();
        this._refresh$ = new Subject<void>();

        merge(...this._listItems.toArray().map((i) => i.focused))
            .pipe(takeUntil(this._refresh$), takeUntilDestroyed(this._destroyRef))
            .subscribe((focusedItem) => {
                this._listItems.forEach((item) => {
                    item._tabIndex$.set(-1);
                });
                focusedItem._tabIndex$.set(0);
                this._keyboardSupportService.keyManager.setActiveItem(focusedItem);
            });
    }
}
