import { Component } from '@angular/core';

@Component({
    selector: 'fd-card-list-example',
    templateUrl: 'card-list-example.component.html'
})
export class CardListExampleComponent {
    selectedValue: string;
    options: string[] = ['By Supplier', 'By Zone'];
}
