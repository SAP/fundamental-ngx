import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-behaviors-example',
    templateUrl: './split-button-behaviors-example.component.html',
    styles: [
        `
            fd-split-button {
                margin-right: 12px;
            }
        `
    ]
})
export class ButtonSplitBehaviorsComponent {
    mainActionObject = {
        mainActionTitle: 'Main Action',
        callback: () => {
            window.alert('main action clicked');
        }
    };

    alert(message: string): void {
        window.alert(message);
    }
}
