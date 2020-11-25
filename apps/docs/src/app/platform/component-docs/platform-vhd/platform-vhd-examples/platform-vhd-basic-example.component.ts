import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DataProvider, ValueHelpDialogDataSource } from '@fundamental-ngx/platform';

const exampleDataSource = () => {
    const dataSource = Array(100).fill(null).map((_value, index) => {
        return {
            id: index + 1,
            name: `Name ${index}`,
            code: Math.floor(Math.random() * 99999),
            city: `City ${Math.floor(Math.random() * index)}`,
            zipcode: `zipcode ${Math.floor(Math.random() * index)}`,
            address: `Address ${Math.floor(Math.random() * index)}`,
            nickname: `Nickname ${Math.floor(Math.random() * index)}`
        }
    })
    return {
        dataSource: dataSource,
        filters: Object.keys(dataSource[0]).map((value, index) => {
            return {
                key: value,
                label: `Product ${value}`,
                advanced: index > 0,
                include: index >= 0,
                exclude: index >= 0
            }
        })
    }
}



class VhdDataProvider extends DataProvider<any> {
    constructor(public values: any) {
        super()
    }
    fetch(params: Map<string, string>): Observable<any> {
        console.log('fetch params: ', params);

        let data = this.values;
        const arrayParams = Array.from(params);
        const filterFn = (row: any) => {
            return arrayParams.every(([key, value]) => String(row[key]).toLowerCase().includes(value.toLowerCase()))
        };
        if (params.size) {
            data = this.values.filter(filterFn);
        }

        return of(data);
    }
}

@Component({
    selector: 'fdp-vhd-basic-example',
    templateUrl: './platform-vhd-basic-example.component.html'
})
export class PlatformVhdBasicExampleComponent implements OnInit {
    filters: any;
    dataSource: ValueHelpDialogDataSource<any>;
    hasAdvanced = false;

    selectedValue = null;

    ngOnInit(): void {
        const data = exampleDataSource();
        this.filters = data.filters;
        this.dataSource = new ValueHelpDialogDataSource(new VhdDataProvider(data.dataSource));
    }

    tokenizerFn = (row: { name: string; id: string | number; }) => {
        return `${row.name} (${row.id})`;
    }

    valueChange($event: {selected: any}): void {
        this.selectedValue = $event;
    }
}
