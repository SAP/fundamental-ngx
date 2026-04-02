import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    ReadonlyBehaviorDirective,
    SelectableItemDirective,
    SelectableListDirective
} from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fdk-selectable-list-readonly-example',
    templateUrl: './readonly-example.component.html',
    styles: [
        `
            [fdkSelectableList] {
                border: 1px dashed #dedede;
            }

            [fdkSelectableItem] {
                cursor: pointer;
            }

            [fdkSelectableItem].selected {
                background-color: #dedede;
            }

            [fdkReadonly='true'] [fdkSelectableItem] {
                cursor: not-allowed;
                opacity: 0.6;
            }

            .toggle-row {
                margin-bottom: 1rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SelectableListDirective, SelectableItemDirective, ReadonlyBehaviorDirective, FormsModule]
})
export class ReadonlyExampleComponent {
    selectableItems = new Array(5).fill(undefined);
    selectedItemIndex = 2;
    readonly = signal(false);
}
