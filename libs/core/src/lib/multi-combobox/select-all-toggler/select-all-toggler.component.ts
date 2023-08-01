import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    HostListener,
    inject,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { ListFocusItem } from '@fundamental-ngx/core/list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'fd-multi-combobox-select-all-toggler',
    template: `
        <fd-toolbar>
            <div fd-form-item class="fd-multi-combobox-select-all__form-item">
                <fd-checkbox tabIndexValue="-1" [ngModel]="checkboxValue" [tristate]="true">
                    {{
                        'coreMultiComboBox.selectAllLabel'
                            | fdTranslate : { selectedItems: selectedItems.length, totalItems: flatItems.length }
                    }}
                </fd-checkbox>
            </div>
        </fd-toolbar>
    `,
    styleUrls: ['./select-all-toggler.component.scss'],
    providers: [
        {
            provide: ListFocusItem,
            useExisting: SelectAllTogglerComponent
        }
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
    get allAreSelected(): boolean {
        return this.selectedItems.length === this.flatItems.length;
    }

    /** @hidden */
    get someAreSelected(): boolean {
        return this.selectedItems.length > 0 && !this.allAreSelected;
    }

    /** @hidden */
    get checkboxValue(): boolean | null {
        if (this.allAreSelected) {
            return true;
        }
        if (this.someAreSelected) {
            return null;
        }
        return false;
    }

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /** @hidden */
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    onKeyDown($event: KeyboardEvent): void {
        $event.preventDefault();
        this.change(!this.checkboxValue);
    }

    /** @hidden */
    @HostListener('click')
    onClick(): void {
        this.elementRef.nativeElement.focus();
        this.change(!this.checkboxValue);
    }

    /** @hidden */
    ngOnInit(): void {
        this.tabindex = 0;
        this.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.changeDetector.detectChanges();
        });
    }

    /** @hidden */
    change(value: boolean): void {
        this.selectAllHandler(value);
    }
}
