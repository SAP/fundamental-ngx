import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { AutoDismissMessageStripDirective, MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { SelectModule } from '@fundamental-ngx/core/select';

@Component({
    selector: 'fd-select-mode-example',
    templateUrl: './select-mode-example.component.html',
    imports: [
        SelectModule,
        ContentDensityDirective,
        MessageStripComponent,
        AutoDismissMessageStripDirective,
        ButtonComponent
    ]
})
export class SelectModeExampleComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue1: string;
    selectedValue2: string;
    selectedValue3: string;
    selectedValue4 = this.options[2];
    selectedValue5 = this.options[0];

    readonly showBanner = signal(false);

    addBanner(): void {
        this.showBanner.set(true);
        setTimeout(() => this.showBanner.set(false), 5000);
    }
}
