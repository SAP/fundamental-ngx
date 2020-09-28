import { Component } from '@angular/core';

@Component({
    selector: 'fdp-action-list-item-example',
    templateUrl: './platform-action-list-item-example.component.html'
})
export class PlatformActionListItemExampleComponent {
    items: any[] = [
        { 'title': 'Action 1' },
        { 'title': 'Action 2' },
        { 'title': 'Action 3' },
        { 'title': 'Action 4' }];
}
