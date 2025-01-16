import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ListBylineDirective,
    ListContentDirective,
    ListIconDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { MultiInputComponent } from '@fundamental-ngx/core/multi-input';

@Component({
    selector: 'fd-multi-input-dropdown-width-example',
    templateUrl: './multi-input-dropdown-width-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MultiInputComponent,
        FormsModule,
        JsonPipe,
        ListIconDirective,
        ListTitleDirective,
        ListBylineDirective,
        ListContentDirective
    ]
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

    selected2 = ['Some long option to show title wrapping', 'Banana', 'Pineapple', 'Tomato', 'Kiwi'];
}
