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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { ListFocusItem } from '@fundamental-ngx/core/list';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Observable } from 'rxjs';

@Component({
    selector: 'fd-multi-combobox-select-all-toggler',
    template: `
        <fd-toolbar>
            <div fd-form-item class="fd-multi-combobox-select-all__form-item">
                <fd-checkbox tabIndexValue="-1" [ngModel]="checkboxValue" [tristate]="true">
                    {{
                        'coreMultiComboBox.selectAllLabel'
                            | fdTranslate: { selectedItems: selectedItems.length, totalItems: flatItems.length }
                    }}
                </fd-checkbox>
            </div>
        </fd-toolbar>
    `,
    styleUrl: './select-all-toggler.component.scss',
    providers: [
        {
            provide: ListFocusItem,
            useExisting: SelectAllTogglerComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ToolbarComponent, FormItemComponent, CheckboxComponent, FormsModule, FdTranslatePipe]
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

    /** @ignore */
    @Input()
    selectedItems: Array<unknown> = [];

    /** @ignore */
    @Input()
    flatItems: Array<unknown> = [];

    /** @ignore */
    get allAreSelected(): boolean {
        return this.selectedItems.length === this.flatItems.length;
    }

    /** @ignore */
    get someAreSelected(): boolean {
        return this.selectedItems.length > 0 && !this.allAreSelected;
    }

    /** @ignore */
    get checkboxValue(): boolean | null {
        if (this.allAreSelected) {
            return true;
        }
        if (this.someAreSelected) {
            return null;
        }
        return false;
    }

    /** @ignore */
    private _destroyRef = inject(DestroyRef);

    /** @ignore */
    private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /** @ignore */
    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    onKeyDown($event: KeyboardEvent): void {
        $event.preventDefault();
        this.change(!this.checkboxValue);
    }

    /** @ignore */
    @HostListener('click')
    onClick(): void {
        this.elementRef.nativeElement.focus();
        this.change(!this.checkboxValue);
    }

    /** @ignore */
    ngOnInit(): void {
        this.tabindex = 0;
        this.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.changeDetector.detectChanges();
        });
    }

    /** @ignore */
    change(value: boolean): void {
        this.selectAllHandler(value);
    }
}
