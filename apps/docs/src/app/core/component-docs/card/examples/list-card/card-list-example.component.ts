import { Component, OnInit } from '@angular/core';
import { FdSelectChange } from '@fundamental-ngx/core';

interface ListData {
    title?: string;
    value?: number;
    change?: number;
    color?: string;
}

@Component({
    selector: 'fd-card-list-example',
    templateUrl: 'card-list-example.component.html'
})
export class CardListExampleComponent implements OnInit {
    selectedValue = 'By Supplier';
    options: string[] = ['By Supplier', 'By Zone'];
    showData: ListData[] = [];

    bySupplierData: ListData[] = [
        { title: 'Delbont Industries', value: 91, change: 4, color: '#1866b4' },
        { title: 'Brazil Technologies', value: 52, change: 3, color: '#da5a1b' },
        { title: 'Anav Ideon', value: 23, change: 1, color: '#c67a0c' },
        { title: 'Loremt', value: 21, change: 1, color: '#358a4d' }
    ];

    byZoneData: ListData[] = [
        { title: 'North Zone', value: 91, change: 14, color: '#1866b4' },
        { title: 'West Zone', value: 80, change: 9, color: '#358a4d' },
        { title: 'South Zone', value: 45, change: 12, color: '#da5a1b' },
        { title: 'east Zone', value: 21, change: 9, color: '#c67a0c' }
    ];

    ngOnInit(): void {
        this.showData = this.bySupplierData;
    }

    onValueChange(event: FdSelectChange): void {
        this.showData = this.selectedValue === this.options[0] ? this.bySupplierData : this.byZoneData;
    }
}
