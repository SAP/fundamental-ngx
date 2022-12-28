import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-multi-input-dropdown-width-example',
    templateUrl: './multi-input-dropdown-width-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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
