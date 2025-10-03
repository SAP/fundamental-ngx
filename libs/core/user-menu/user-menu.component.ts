import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    contentChild,
    contentChildren,
    effect,
    ElementRef,
    EventEmitter,
    inject,
    input,
    OnInit,
    Output,
    Renderer2,
    signal,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeyboardSupportService, RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogRef,
    DialogService
} from '@fundamental-ngx/core/dialog';

import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

import { UserMenuBodyComponent } from './components/user-menu-body.component';
import { UserMenuControlComponent } from './components/user-menu-control.component';
import { UserMenuListItemComponent } from './components/user-menu-list-item.component';
import { UserMenuControlElementDirective } from './directives/user-menu-control-element.directive';

@Component({
    selector: 'fd-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrl: './user-menu.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-user-menu'
    },
    imports: [
        CommonModule,
        PopoverComponent,
        PopoverBodyComponent,
        PopoverControlComponent,
        DialogComponent,
        DialogBodyComponent,
        DialogFooterComponent
    ],
    providers: [KeyboardSupportService, contentDensityObserverProviders()]
})
export class UserMenuComponent implements OnInit, AfterViewInit {
    /** Event thrown, when the user menu is opened or closed */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ContentChild(UserMenuControlComponent)
    userMenuControl: UserMenuControlComponent;

    /** @hidden */
    listItems = contentChildren(UserMenuListItemComponent, { descendants: true });

    /** @hidden */
    userMenuBody = contentChild(UserMenuBodyComponent, { descendants: true });

    /** @hidden */
    userMenuControlElement = contentChild(UserMenuControlElementDirective, { descendants: true, read: ElementRef });

    /** Whether the user menu is in mobile mode */
    mobile = input(false, { transform: booleanAttribute });

    /** Whether the user menu is open */
    isOpen = signal(false);

    /** @hidden */
    protected navigationArrow$: Observable<string>;

    /** @hidden */
    private _rtlService = inject(RtlService);

    /** @hidden */
    private _dialogService = inject(DialogService);

    /** @hidden */
    private _changeDetectionRef = inject(ChangeDetectorRef);

    /** @hidden */
    private _renderer = inject(Renderer2);

    /** @hidden */
    private _dialogRef: DialogRef | undefined;

    /** @hidden */
    constructor() {
        effect(() => {
            const isMobile = this.mobile();
            this.listItems()?.forEach((item) => item.mobile.set(isMobile));
        });
    }

    /** @hidden */
    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'navigation-right-arrow' : 'navigation-left-arrow'))
        );
    }

    /** @hidden */
    ngAfterViewInit(): void {
        const isMobile = this.mobile();
        this.listItems()?.forEach((item) => item.mobile.set(isMobile));
    }

    /** Method that opens the user menu */
    open(): void {
        this.isOpenChangeHandle(true);
    }

    /** Method that closes the user menu */
    close(): void {
        this.isOpenChangeHandle(false);

        if (this.listItems().length > 0) {
            this.listItems().forEach((item) => {
                item.isOpen.set(false);
                item._elementRef?.nativeElement.querySelector('.fd-menu__link')?.classList.remove('is-active');
            });

            this.listItems()[0]?._tabIndex$.set(0);
        }

        this._clearSubmenu();
        this._dialogRef?.close();
    }

    /** Method that opens the user menu in dialog (for mobile mode) */
    openDialog(dialogTemplate: TemplateRef<any>): void {
        this._dialogRef = this._dialogService.open(dialogTemplate, {
            mobile: true,
            verticalPadding: false,
            horizontalPadding: false,
            ariaLabelledBy: 'fd-user-menu-header',
            ariaDescribedBy: 'fd-user-menu-body',
            contentDensity: ContentDensityMode.COZY
        });

        const refSub = this._dialogRef.afterClosed.subscribe({
            next: () => {
                this.userMenuControl.focus();
                refSub.unsubscribe();
            },
            error: (type) => {
                if (type === 'escape') {
                    this._clearSubmenu();
                    refSub.unsubscribe();
                }
            }
        });
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        if (this.isOpen() === isOpen) {
            return;
        }

        this.isOpen.set(isOpen);
        this.isOpenChange.emit(isOpen);

        if (!isOpen && !this.mobile()) {
            this.userMenuControl.focus();
        }

        const userMenuControlEl = this.userMenuControlElement()?.nativeElement;

        this.userMenuControlElement()?.nativeElement &&
            (isOpen
                ? this._renderer.addClass(userMenuControlEl, 'is-active')
                : this._renderer.removeClass(userMenuControlEl, 'is-active'));

        this._changeDetectionRef.detectChanges();
    }

    /** @hidden */
    private _clearSubmenu(): void {
        const userMenuBody = this.userMenuBody();
        if (userMenuBody) {
            userMenuBody.clearSubmenu();
        }
    }
}
