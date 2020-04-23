import { Component } from '@angular/core';

@Component({
    selector: 'fdp-standard-list-item-with-group-header-example',
    templateUrl: './platform-standard-list-item-with-group-header-example.component.html'
})
export class PlatformStandardListItemtWithGroupHeaderExampleComponent {

    vegItems: any[] = [
        { 'title': 'Carrot', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)' },
        { 'title': 'Beans', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)' },
        { 'title': 'Onions', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)' }];

    fruitItems: any[] = [
        { 'title': 'Mango', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)' },
        { 'title': 'Orange', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)' },
        { 'title': 'Apple', 'description': 'First text item in Byline (Standard text item)', 'secondary': 'Second text item in Byline (Can be semantic (Status) or not)' }];
}
