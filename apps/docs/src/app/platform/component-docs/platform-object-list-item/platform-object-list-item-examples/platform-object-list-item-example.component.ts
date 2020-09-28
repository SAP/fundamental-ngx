import { Component } from '@angular/core';

@Component({
    selector: 'fdp-object-list-item-example',
    templateUrl: './platform-object-list-item-example.component.html'
})
export class PlatformObjectListItemExampleComponent {
    items: any[] = [
        { 'title': 'Action 1' },
        { 'title': 'Action 2' },
        { 'title': 'Action 3' },
        { 'title': 'Action 4' }];
}
