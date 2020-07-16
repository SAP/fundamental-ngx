import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, MenuComponent } from '@fundamental-ngx/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fd-table-toolbar-example',
    templateUrl: './table-toolbar-example.component.html'
})
export class TableToolbarExampleComponent implements OnInit {
    produceRows: any[];
    kitchenwareRows: any[];
    displayedRows: any[];
    searchTerm: string = '';
    confirmationReason: string;
    myForm: FormGroup;
    selectedVariant: string = 'Produce';
    variants: string[] = [
        'Produce',
        'Kitchenware'
    ];

    @ViewChild('variantMenu')
    variantMenu: MenuComponent;

    constructor(private _dialogService: DialogService, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.produceRows = [
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
        this.kitchenwareRows = [
            {
                column1: 'Fork',
                column2: 'Utensils',
                region: 'France'
            },
            {
                column1: 'Wok',
                column2: 'Cookware',
                region: 'China'
            }
        ];
        this.displayedRows = this.produceRows;

        this.myForm = this._fb.group({
            nameInput: new FormControl(''),
            typeInput: new FormControl(''),
            regionInput: new FormControl('')
        });
    }

    searchInputChanged(event: string): void {
        if (event) {
            this.displayedRows = this.getSelectedVariantRows().filter(row => {
                return JSON.stringify(row).toLowerCase().indexOf(event.toLowerCase()) !== -1;
            });
        } else {
            this.displayedRows = this.getSelectedVariantRows();
        }
    }

    resetSearch(): void {
        this.displayedRows = this.getSelectedVariantRows();
        this.searchTerm = '';
    }

    openDialog(dialog: TemplateRef<any>): void {
        const dialogRef = this._dialogService.open(dialog, { responsivePadding: true });

        dialogRef.afterClosed.subscribe(
            (result) => {
                this.confirmationReason = 'Dialog closed with result: ' + result;
                this.getSelectedVariantRows().push({
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

    variantChange(value: string): void {
        this.variantMenu.close();
        this.selectedVariant = value;
        this.searchTerm = '';
        if (value === 'Produce') {
            this.displayedRows = this.produceRows;
        } else if (value === 'Kitchenware') {
            this.displayedRows = this.kitchenwareRows;
        }
    }

    getSelectedVariantRows(): any[] {
        return this.selectedVariant === 'Produce' ? this.produceRows : this.kitchenwareRows;
    }

}
