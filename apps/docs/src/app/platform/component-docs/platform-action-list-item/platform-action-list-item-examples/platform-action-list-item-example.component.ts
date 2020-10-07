import { Component, HostListener } from '@angular/core';

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

    @HostListener('click', ['$event'])
    _deleteRow(event: any): void {
        if (event.target.tagName.toLowerCase() === 'button') {
            alert('invoked :' + event.target.getAttribute('title'));
        }
    }

    @HostListener('keyup', ['$event'])
    _onKeydown(event: any): void {
        if (event && (event.key === 'Enter' || event.key === 'Space')) {
            alert('invoked :' + event.target.parentNode.getAttribute('title'));
        }
    }
}
