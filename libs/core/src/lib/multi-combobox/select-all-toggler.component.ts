import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    inject,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { Observable, takeUntil } from 'rxjs';
import { ListFocusItem } from '@fundamental-ngx/core/list';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'li[fd-multi-combobox-select-all-toggler]',
    template: `
        <fd-checkbox
            [label]="'coreMultiComboBox.selectAllLabel' | fdTranslate"
            [ngModel]="checkboxValue"
            [tristate]="true"
        ></fd-checkbox>
    `,
    styles: [
        `
            li[fd-multi-combobox-select-all-toggler].fd-list__item {
                display: block;
                background-color: var(--sapBackgroundColor);
            }
        `
    ],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[class.fd-list__item]': 'true'
    },
    providers: [
        {
            provide: ListFocusItem,
            useExisting: SelectAllTogglerComponent
        },
        DestroyedService
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectAllTogglerComponent extends ListFocusItem implements OnInit {
    /**
     * Handler for the select all items
     * */
    @Input() selectAllHandler: (select: boolean) => void;

    /**
     * Stream for receiving information about the value changes,
     */
    @Input() valueChanges: Observable<unknown>;

    /** @hidden */
    @Input()
    selectedItems: Array<unknown> = [];

    /** @hidden */
    @Input()
    flatItems: Array<unknown> = [];

    /** @hidden */
    get allIsSelected(): boolean {
        return this.selectedItems.length === this.flatItems.length;
    }

    /** @hidden */
    get someAreSelected(): boolean {
        return this.selectedItems.length > 0 && !this.allIsSelected;
    }

    /** @hidden */
    get checkboxValue(): boolean | null {
        if (this.allIsSelected) {
            return true;
        }
        if (this.someAreSelected) {
            return null;
        }
        return false;
    }

    /** @hidden */
    private destroy$ = inject(DestroyedService);

    /** @hidden */
    private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /** @hidden */
    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.change(!this.checkboxValue);
    }

    /** @hidden */
    ngOnInit(): void {
        this.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.changeDetector.detectChanges();
        });
    }

    /** @hidden */
    change(value: boolean): void {
        this.selectAllHandler(value);
    }
}
