import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'fdp-platform-color-palette-reactive-form-example',
    templateUrl: './platform-color-palette-reactive-form-example.component.html'
})
export class PlatformColorPaletteReactiveFormExampleComponent {
    customForm: FormGroup = new FormGroup({
        colorPalette3: new FormControl('rgba(45, 98, 225, 1)')
    });
}
