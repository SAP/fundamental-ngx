import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { takeUntil } from 'rxjs';
import { MultiComboboxComponent } from './multi-combobox.component';

@Component({
    selector: 'fd-multi-combobox-select-all-toggler',
    template: `
        <fd-checkbox
            [label]="'Select All'"
            [ngModel]="checkboxValue"
            (ngModelChange)="change($event)"
            [tristate]="true"
        ></fd-checkbox>
    `,
    styles: [
        `
            fd-multi-combobox-select-all-toggler.fd-list__item {
                display: block;
                background-color: var(--sapBackgroundColor);
            }
        `
    ],
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        '[class.fd-list__item]': 'true'
    },
    providers: [DestroyedService],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectAllTogglerComponent {
    /** @hidden */
    get allIsSelected(): boolean {
        return this.comboboxComponent._selectedSuggestions.length === this.comboboxComponent._flatSuggestions.length;
    }

    /** @hidden */
    get someAreSelected(): boolean {
        return this.comboboxComponent._selectedSuggestions.length > 0 && !this.allIsSelected;
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
    private comboboxComponent: MultiComboboxComponent = inject(MultiComboboxComponent);
    /** @hidden */
    private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /** @hidden */
    constructor() {
        this.comboboxComponent.selectionChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.changeDetector.detectChanges();
        });
    }

    /** @hidden */
    change(value: boolean): void {
        this.comboboxComponent._handleSelectAllItems(value);
    }
}
