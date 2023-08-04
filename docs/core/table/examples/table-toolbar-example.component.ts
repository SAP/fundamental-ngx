import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-table-toolbar-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './table-toolbar-example.component.html'
})
export class TableToolbarExampleComponent implements OnInit {
    tableRows: any[];
    displayedRows: any[];
    searchTerm = '';
    confirmationReason: string;
    myForm: FormGroup;
    loading = false;

    constructor(private _dialogService: DialogService, private _fb: FormBuilder, private _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.tableRows = [
            {
                column1: 'Apple',
                column2: 'Fruit',
                region: 'Virginia'
            },
            {
                column1: 'Banana',
                column2: 'Fruit',
                region: 'Costa Rica'
            },
            {
                column1: 'Kale',
                column2: 'Vegetable',
                region: 'Colorado'
            },
            {
                column1: 'Kiwi',
                column2: 'Fruit',
                region: 'New Zealand'
            },
            {
                column1: 'Spinach',
                column2: 'Vegetable',
                region: 'California'
            }
        ];
        this.displayedRows = this.tableRows;

        this.myForm = this._fb.group({
            nameInput: new FormControl(''),
            typeInput: new FormControl(''),
            regionInput: new FormControl('')
        });
    }

    searchInputChanged(event: string): void {
        const filterRows = (row): boolean => {
            const keys = Object.keys(row);
            return !!keys.find((key) => row[key].toLowerCase().includes(event.toLowerCase()));
        };

        if (event) {
            this.displayedRows = this.tableRows.filter((row) => filterRows(row));
        } else {
            this.displayedRows = this.tableRows;
        }
    }

    resetSearch(): void {
        this.displayedRows = this.tableRows;
        this.searchTerm = '';
    }

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, { responsivePadding: true });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Dialog closed with result: ' + result;
                this.tableRows.push({
                    column1: this.myForm.get('nameInput')?.value,
                    column2: this.myForm.get('typeInput')?.value,
                    region: this.myForm.get('regionInput')?.value
                });
                this.searchInputChanged(this.searchTerm);
                this.myForm.setValue({ nameInput: '', typeInput: '', regionInput: '' });
                this._cdr.detectChanges();
            },
            (error) => {
                this.confirmationReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
