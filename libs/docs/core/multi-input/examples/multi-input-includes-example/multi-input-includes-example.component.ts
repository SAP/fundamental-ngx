import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
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
