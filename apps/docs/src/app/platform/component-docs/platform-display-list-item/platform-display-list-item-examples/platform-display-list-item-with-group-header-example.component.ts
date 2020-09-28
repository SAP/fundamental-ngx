import { Component } from '@angular/core';

@Component({
    selector: 'fdp-display-list-item-with-group-header-example',
    templateUrl: './platform-display-list-item-with-group-header-example.component.html'
})
export class PlatformDisplayListItemtWithGroupHeaderExampleComponent {

    vegItems: any[] = [
        { 'title': 'Carrot', 'secondary': 'Second text' },
        { 'title': 'Beans', 'secondary': 'Second text' },
        { 'title': 'Onions', 'secondary': 'Second text' }];

    fruitItems: any[] = [
        { 'title': 'Mango', 'secondary': 'Second text' },
        { 'title': 'Orange', 'secondary': 'Second text' },
        { 'title': 'Apple', 'secondary': 'Second text' }];
}
