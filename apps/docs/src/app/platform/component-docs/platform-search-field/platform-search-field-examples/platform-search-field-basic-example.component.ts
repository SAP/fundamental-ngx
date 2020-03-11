import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SuggestionItem } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-search-field-basic-example',
    templateUrl: './platform-search-field-basic-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PlatformSearchFieldBasicExampleComponent implements OnInit {

    public suggestions: SuggestionItem[];

    ngOnInit() {
        this.suggestions = [{
            value: 'Apple'
        }, {
            value: 'Banana'
        }, {
            value: 'Orange'
        }];
    }
}
