import {
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {
    SearchInput,
    ValueLabelItem,
    SearchFieldDataSource
} from '@fundamental-ngx/platform';
import { SearchFieldDataProvider } from './platform-search-field-example.service';

@Component({
    selector: 'fdp-platform-search-field-data-source-example',
    templateUrl: './platform-search-field-data-source-example.component.html',
    styleUrls: ['./platform-search-field-data-source-example.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlatformSearchFieldDataSourceExampleComponent implements OnInit {

    public categories: ValueLabelItem[];

    public searchTerm = '';
    public searchCategory = '';
    public inputText = '';
    public inputCategory = '';

    public dataSource: SearchFieldDataSource<any>;

    ngOnInit() {
        this.dataSource = new SearchFieldDataSource(new SearchFieldDataProvider());
        this.categories = [{
            value: 'red',
            label: 'Red'
        }, {
            value: 'orange',
            label: 'Orange'
        }, {
            value: 'yellow',
            label: 'Yellow'
        }, {
            value: 'green',
            label: 'Green'
        }, {
            value: 'blue',
            label: 'Blue'
        }, {
            value: 'indigo',
            label: 'Indigo'
        }, {
            value: 'violet',
            label: 'Violet'
        }];
    }

    onSearchSubmit($event: SearchInput) {
        this.searchTerm = $event.text;
        this.searchCategory = $event.category;
    }

    onInputChange($event: SearchInput) {
        this.inputText = $event.text;
        this.inputCategory = $event.category;
    }
}
