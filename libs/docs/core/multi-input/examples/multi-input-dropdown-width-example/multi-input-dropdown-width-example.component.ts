import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-dropdown-width-example',
    templateUrl: './multi-input-dropdown-width-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MultiInputModule, FormsModule, JsonPipe]
})
export class MultiInputDropdownWidthExampleComponent {
    selected = [
        'SomeLongTextToShowThatWidthWillGrowWithTheContent',
        'Banana',
        'Pineapple',
        'Tomato',
        'Kiwi',
        'Strawberry',
        'Blueberry'
    ];
}
