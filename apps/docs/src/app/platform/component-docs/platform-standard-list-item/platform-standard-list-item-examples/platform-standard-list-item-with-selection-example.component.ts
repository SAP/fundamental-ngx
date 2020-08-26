import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListDataSource, DataProvider } from '@fundamental-ngx/platform';


const LIST_ELEMENTS: Address[] = [
    {
        img: 'https://placeimg.com/400/400/nature',
        imgInfo: 'nature',
        name: 'Green',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    },
    {
        img: 'https://placeimg.com/400/400/nature',
        imgInfo: 'nature',
        name: 'Yello',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    },
    {
        img: 'https://placeimg.com/400/400/nature',
        imgInfo: 'nature',
        name: 'Purple',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    },
    {
        img: 'https://placeimg.com/400/400/nature',
        imgInfo: 'nature',
        name: 'Orange',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    }];
export interface Address {
    name: string;
    img: string;
    description: string;
    imgInfo: string;
    info: string;

}

export class ListDataProvider extends DataProvider<Address> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<Address[]> {
        let data = LIST_ELEMENTS;
        if (!!params.get(name)) {
            const keyword = params.get(name).toLowerCase();
            data = data.filter((city) => city.name.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
@Component({
    selector: 'fdp-standard-list-item-with-selection-example',
    templateUrl: './platform-standard-list-item-with-selection-example.component.html'
})
export class PlatformStandardListItemWithSelectionExampleComponent {
    dataSource = new ListDataSource<Address>(new ListDataProvider());
    selectedItems: any[] = [];

    showItemInfo(event: any): void {
        this.selectedItems = event.selectedItems;
    }

}
