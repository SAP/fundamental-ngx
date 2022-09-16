import { Component } from '@angular/core';

@Component({
    selector: 'fd-avatar-zoom-icon-example',
    templateUrl: './avatar-zoom-icon-example.component.html',
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ]
})
export class AvatarZoomIconExampleComponent {
    onZoomGlyphClick(num: number): void {
        alert('avatar ' + num + ' clicked!');
    }
}
