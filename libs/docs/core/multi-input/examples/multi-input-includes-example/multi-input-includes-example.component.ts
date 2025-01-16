import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-includes-example',
    templateUrl: './multi-input-includes-example.component.html',
    imports: [MultiInputComponent, FormsModule, JsonPipe]
})
export class MultiInputIncludesExampleComponent {
    selected = [];
}
