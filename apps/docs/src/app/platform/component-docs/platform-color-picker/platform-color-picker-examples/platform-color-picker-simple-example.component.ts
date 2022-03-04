import { Component } from '@angular/core';

@Component({
    selector: 'fdp-platform-color-picker-simple-example',
    templateUrl: './platform-color-picker-simple-example.component.html',
    styleUrls: ['./platform-color-picker-simple-example.component.scss']
})
export class PlatformColorPickerExamplesComponent {
    colorChanged(event): any {
        console.log(event);
    }
}
