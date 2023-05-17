import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'fd-multi-combobox-select-all-toggler',
    template: `
        <fd-checkbox
            [label]="'coreMultiComboBox.selectAllLabel' | fdTranslate"
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
export class SelectAllTogglerComponent implements OnInit {
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
