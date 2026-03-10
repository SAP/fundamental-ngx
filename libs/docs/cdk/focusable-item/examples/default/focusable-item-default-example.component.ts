import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FocusableItemDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fdk-focusable-item-default-example',
    templateUrl: './focusable-item-default-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: `
        .focusable-items-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-width: 300px;
        }

        .focusable-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
        }

        .focusable-item:focus {
            outline: 2px solid #0070f2;
            outline-offset: 2px;
        }
    `,
    imports: [FocusableItemDirective, ListModule, ButtonComponent]
})
export class FocusableItemDefaultExampleComponent {
    items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
}
