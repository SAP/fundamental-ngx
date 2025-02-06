import { Component } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';

@Component({
    selector: 'fd-split-button-behaviors-example',
    templateUrl: './split-button-behaviors-example.component.html',
    styles: [
        `
            fd-split-button {
                margin-right: 12px;
            }
        `
    ],
    imports: [FormLabelComponent, SplitButtonModule, MenuModule]
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
