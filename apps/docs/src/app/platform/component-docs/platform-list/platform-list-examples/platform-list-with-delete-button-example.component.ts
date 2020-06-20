import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'fdp-list-with-delete-button-example',
    templateUrl: './platform-list-with-delete-button-example.component.html'
})
export class PlatformListWithDeleteButtonExampleComponent {
    items: any[] = [
        { 'title': 'Item1', 'secondayIcons': [{ 'icon': 'decline', 'isButton': 'true' }] },
        { 'title': 'Item2', 'secondayIcons': [{ 'icon': 'decline', 'isButton': 'true' }] },
        { 'title': 'Item3', 'secondayIcons': [{ 'icon': 'decline', 'isButton': 'true' }] },
        { 'title': 'Item4' }
    ];

    // Handle deletion of item via  mouseclick
    @HostListener('click', ['$event'])
    deleteRow(event: any) {
        if (event.target.parentNode.tagName.toLowerCase() === 'fdp-button') {
            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        }
    }

    // Handle deletion of item via keyboard 'Enter' or mouseclick
    @HostListener('keyup', ['$event']) onKeydown(event: any) {
        if (event && event.key === 'Enter') {
            if (event.target.parentNode.tagName.toLowerCase() === 'fdp-button') {
                event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
            }
        }
    }
}
