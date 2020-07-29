import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fd-table-toolbar-example',
    templateUrl: './table-toolbar-example.component.html'
})
export class TableToolbarExampleComponent implements OnInit {
    tableRows: any[];
    displayedRows: any[];
    searchTerm = '';
    confirmationReason: string;
    myForm: FormGroup;

    constructor(private _dialogService: DialogService, private _fb: FormBuilder) {}

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
        if (event) {
            this.displayedRows = this.tableRows.filter(row => {
                return JSON.stringify(row).toLowerCase().indexOf(event.toLowerCase()) !== -1;
            });
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
                    column1: this.myForm.get('nameInput').value,
                    column2: this.myForm.get('typeInput').value,
                    region: this.myForm.get('regionInput').value
                });
                this.searchInputChanged(this.searchTerm);
                this.myForm.setValue({nameInput: '', typeInput: '', regionInput: ''});
            },
            (error) => {
                this.confirmationReason = 'Dialog dismissed with result: ' + error;
            }
        );
    }

}
