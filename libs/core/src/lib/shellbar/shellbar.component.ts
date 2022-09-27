import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    forwardRef,
    Input,
    OnInit,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ComboboxComponent } from '@fundamental-ngx/core/combobox';
import { SelectComponent } from '@fundamental-ngx/core/select';
import { debounceTime, fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
import { ShellbarActionsComponent } from './shellbar-actions/shellbar-actions.component';

export type ShellbarSizes = 's' | 'm' | 'l' | 'xl';

/**
 * The shellbar offers consistent, responsive navigation across all products and applications.
 * Includes support for branding, product navigation, search, notifications, and user settings.
 * Shellbar is a composite component comprised of mandatory and optional elements.
 */
@Component({
    selector: 'fd-shellbar',
    templateUrl: './shellbar.component.html',
    styleUrls: ['./shellbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellbarComponent implements AfterContentInit, AfterViewInit, OnInit {
    /** Size of Shellbar component 's' | 'm' | 'l' | 'xl' */
    @Input()
    size: ShellbarSizes = 'm';

    @Input()
    responsive = false;

    @Input()
    sizesWidth = {
        s: 320,
        m: 720,
        l: 1024,
        xl: 1400
    };

    /**
     * Whether the Shellbar is used with Side Navigation
     * When set to true, the responsive paddings are not applied
     */
    @Input()
    sideNav = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    @ContentChild(ComboboxComponent, { static: false })
    comboboxComponent: ComboboxComponent;

    /** @hidden */
    @ContentChild(ShellbarActionsComponent)
    shellbarActionsComponent: ShellbarActionsComponent;

    /** @hidden */
    @ContentChild(SelectComponent, { static: false })
    selectComponent: SelectComponent;

    /** @hidden */
    @ContentChildren(forwardRef(() => ButtonComponent))
    buttons: QueryList<ButtonComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngOnInit(): void {
        this._attachResizeListener();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._applyShellbarModeToButtons();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._onResize();
        this._applyShellbarModeToCombobox();
        this._applyShellbarModeToSelect();
    }

    /** to apply view change on select menu open */
    handleSelectIsOpenChange(): void {
        this._subscriptions.add(
            this.selectComponent.isOpenChange.subscribe((isOpen) => {
                if (isOpen) {
                    setTimeout(() => {
                        this.selectComponent._controlElementRef.nativeElement.classList.remove('is-expanded');
                        this.selectComponent._controlElementRef.nativeElement.setAttribute('aria-expanded', 'false');
                    });
                }
            })
        );
    }

    /** @hidden */
    _applyShellbarModeToSelect(): void {
        if (this.selectComponent) {
            this.selectComponent._controlElementRef.nativeElement.style.margin = '0';
            this.selectComponent._controlElementRef.nativeElement.classList.add('fd-shellbar__input-group');

            this.selectComponent._controlElementRef.nativeElement.children[0].classList.add(
                'fd-shellbar__input-group-input'
            );
            this.selectComponent._controlElementRef.nativeElement.children[0].classList.add(
                'fd-shellbar__input-group-input--select'
            );
            this.selectComponent._controlElementRef.nativeElement.children[1].classList.add(
                'fd-shellbar__input-group-addon'
            );
            this.selectComponent._controlElementRef.nativeElement.children[1].children[0].classList.add(
                'fd-shellbar__button'
            );

            this.handleSelectIsOpenChange();
        }
    }

    /** @hidden */
    _applyShellbarModeToCombobox(): void {
        if (this.comboboxComponent && this.comboboxComponent.inputGroup) {
            this.comboboxComponent.searchInputElement.nativeElement.classList.add('fd-shellbar__input-group-input');
            this.comboboxComponent.buttons.forEach((button) => {
                button.elementRef().nativeElement.classList.add('fd-shellbar__button');
            });

            this.comboboxComponent.inputGroup
                .elementRef()
                .nativeElement.children[0].classList.add('fd-shellbar__input-group');

            this.comboboxComponent.inputGroup.inputGroupAddon.nativeElement.classList.add(
                'fd-shellbar__input-group-addon'
            );
            this.comboboxComponent.inputGroup.buttons.forEach((button) => {
                button.elementRef().nativeElement.classList.add('fd-shellbar__button');
            });
        }
    }

    /** @hidden */
    _applyShellbarModeToButtons(): void {
        if (this.buttons && this.buttons.length) {
            this.buttons.forEach((button) => {
                button.elementRef().nativeElement.classList.add('fd-shellbar__button');
            });
        }
    }

    /** @hidden */
    _handleSizeChange(currentSize: ShellbarSizes): void {
        // if size changed and changed to 's' with combobox open.
        if (currentSize !== this.size && this.size === 's') {
            if (this.comboboxComponent && this.shellbarActionsComponent.showCombobox) {
                this.shellbarActionsComponent.showFullWidthCombobox(true);
            }
        }
        // if size was 's' and changed to any other size with combobox open.
        else if (currentSize === 's' && currentSize !== this.size) {
            if (this.comboboxComponent && this.shellbarActionsComponent.showCombobox) {
                this.shellbarActionsComponent.showFullWidthCombobox(false);
                this.shellbarActionsComponent.onSearchButtonClick(false);
            }
        }
    }

    /** @hidden */
    private _onResize(): void {
        if (this.responsive) {
            const currentSize = this.size;
            if (this._elementRef.nativeElement.offsetWidth > this.sizesWidth.l && currentSize !== 'xl') {
                this.size = 'xl';
            } else if (this._elementRef.nativeElement.offsetWidth > this.sizesWidth.m && currentSize !== 'l') {
                this.size = 'l';
            } else if (this._elementRef.nativeElement.offsetWidth > this.sizesWidth.s && currentSize !== 'm') {
                this.size = 'm';
            } else if (this._elementRef.nativeElement.offsetWidth < this.sizesWidth.s && currentSize !== 's') {
                this.size = 's';
            }
            this._handleSizeChange(currentSize);
            this._cdr.detectChanges();
        }
    }

    /** @hidden */
    private _attachResizeListener(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(10), takeUntil(this._onDestroy$))
            .subscribe(() => this._onResize());
    }
}
