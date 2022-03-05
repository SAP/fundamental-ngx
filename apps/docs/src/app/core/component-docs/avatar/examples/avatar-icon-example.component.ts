import { Component } from '@angular/core';

@Component({
    selector: 'fd-avatar-icon-example',
    templateUrl: './avatar-icon-example.component.html',
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ]
})
export class AvatarIconExampleComponent {
    onAvatarClicked(num: number): void {
        alert('avatar ' + num + ' clicked!');
    }
}
