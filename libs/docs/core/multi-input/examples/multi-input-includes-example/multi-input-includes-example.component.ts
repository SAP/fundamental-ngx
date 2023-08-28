import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-includes-example',
    templateUrl: './multi-input-includes-example.component.html',
    standalone: true,
    imports: [MultiInputModule, FormsModule, JsonPipe]
})
export class MultiInputIncludesExampleComponent {
    selected = [];
}
