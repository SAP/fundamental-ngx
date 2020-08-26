import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'fdp-list-with-delete-button-example',
    templateUrl: './platform-list-with-delete-button-example.component.html'
})
export class PlatformListWithDeleteButtonExampleComponent {

    // Handle deletion of item via  mouseclick
    @HostListener('click', ['$event'])
    deleteRow(event: any): void {
        if (event.target.tagName.toLowerCase() === 'button' &&
            event.target.classList.contains('sap-icon--decline')) {
            event.target.parentNode.parentNode.style.display = 'none';
        }
    }
    // Handle deletion of item via keyboard 'Enter' or mouseclick
    @HostListener('keyup', ['$event']) onKeydown(event: any): void {
        if (event && event.key === 'Enter') {
            if (event.target.tagName.toLowerCase() === 'button' &&
                event.target.classList.contains('sap-icon--decline')) {
                event.target.parentNode.parentNode.style.display = 'none';
            }
        }
    }
}
