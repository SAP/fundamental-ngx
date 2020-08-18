import { Component } from '@angular/core';
import { ListDataSource, DataProvider } from '@fundamental-ngx/platform';
import { Observable, of } from 'rxjs';

const LIST_ELEMENTS: ListItem[] = [{ title: 'Item1', templateType: 'standard' },
{ title: 'Item2', templateType: 'standard' }];
@Component({
    selector: 'fdp-borderless-list-example',
    templateUrl: './platform-borderless-list-example.component.html'
})
export class PlatformListBorderLessExampleComponent {

    // items: any[] = [
    //     { 'title': 'Item1' },
    //     { 'title': 'Item2' },
    //     { 'title': 'Item3' },
    //     { 'title': 'Item4' }];

    dataSource = new ListDataSource<ListItem>(new ListDataProvider());

}
// it is from application point of to show as example,they refer internal structurs in general
export interface ListItem {
    title: string;
    templateType: string;
}


export class ListDataProvider extends DataProvider<string> {
    constructor() {
        super();
    }

    fetch(params: Map<string, string>): Observable<string[]> {
        let data = LIST_ELEMENTS;
        if (!!params.get('title')) {
            const keyword = params.get('title').toLowerCase();
            data = data.filter((item) => item.title.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data.map((item) => item.title));
    }
}
