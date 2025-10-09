import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    HostListener,
    OnInit,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    contentChild,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { Observable, Subject, map, startWith } from 'rxjs';
import { UserMenuUserNameDirective } from '../directives/user-menu-user-name.directive';
import { UserMenuListItemComponent } from './user-menu-list-item.component';

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
    providers: [contentDensityObserverProviders()]
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
     * Signal indicating whether the user name element is currently visible
     * within the user menu. This updates automatically as the element
     * enters or leaves the viewport.
     *
     * Used by the template to conditionally render the sticky header.
     */
    readonly isUserNameVisible = signal(true);

    /**
     * Signal storing the HTML content of the user name element.
     * When the original element scrolls out of view, this content
     * is displayed in the sticky header.
     */
    readonly userNameContent = signal('');

    /**
     * Template ref to the header of the user menu body.
     * Needed in mobile mode
     */
    readonly bodyHeader = viewChild<TemplateRef<any>>('bodyHeader');

    /** @hidden */
    protected readonly userNameEl = contentChild(UserMenuUserNameDirective, { read: ElementRef });

    /** @hidden */
    private _rtlService = inject(RtlService);

    /** @hidden */
    private _refresh$ = new Subject<void>();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden */
    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
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

        const el = this.userNameEl()?.nativeElement;

        if (!el) {
            return;
        }

        // logic for showing/hiding the popover header with user name on scroll
        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                this.isUserNameVisible.set(entries[0].isIntersecting);
            },
            { root: null, threshold: 1, rootMargin: '-20px 0px 0px 0px' }
        );

        intersectionObserver.observe(el);

        // Initialize
        this.userNameContent.set(el.innerHTML.trim());

        // Watch for changes in projected content
        const mutationObserver = new MutationObserver(() => {
            this.userNameContent.set(el.innerHTML.trim());
        });

        mutationObserver.observe(el, {
            childList: true,
            characterData: true,
            subtree: true
        });

        this._destroyRef.onDestroy(() => {
            intersectionObserver.disconnect();
            mutationObserver.disconnect();
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
}
