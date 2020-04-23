import { Component } from '@angular/core';

@Component({
    selector: 'fdp-list-with-group-header-example',
    templateUrl: './platform-list-with-group-header-example.component.html'
})
export class PlatformListWithGroupHeaderExampleComponent {

    vegItems: any[] = [
        { 'title': 'Carrot' },
        { 'title': 'Beans' },
        { 'title': 'Onions' }];

    fruitItems: any[] = [
        { 'title': 'Mango' },
        { 'title': 'Orange' },
        { 'title': 'Apple' }];
}
