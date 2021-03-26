import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { FdSelectChange } from '@fundamental-ngx/core';

interface ListData {
    title?: string;
    value?: number;
    change?: number;
}

@Component({
    selector: 'fd-card-list-example',
    templateUrl: 'card-list-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListExampleComponent implements OnInit {
    selectedValue = 'By Supplier';
    options: string[] = ['By Supplier', 'By Zone'];
    showData: ListData[] = [];

    bySupplierData: ListData[] = [
        { title: 'Delbont Industries', value: 91, change: 4 },
        { title: 'Brazil Technologies', value: 52, change: 3 },
        { title: 'Anav Ideon', value: 23, change: 1 },
        { title: 'Loremt', value: 21, change: 1 }
    ];

    byZoneData: ListData[] = [
        { title: 'North Zone', value: 91, change: 14 },
        { title: 'West Zone', value: 80, change: 9 },
        { title: 'South Zone', value: 45, change: 12 },
        { title: 'east Zone', value: 21, change: 9 }
    ];

    constructor(private _cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.showData = this.bySupplierData;
    }

    onValueChange(event: FdSelectChange): void {
        this.showData = this.selectedValue === this.options[0] ? this.bySupplierData : this.byZoneData;
        this._cd.markForCheck();
    }
}
