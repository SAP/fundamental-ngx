import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { cloneDeep } from '@fundamental-ngx/cdk/utils';
import { IconTabBarComponent } from '@fundamental-ngx/platform/icon-tab-bar';
import { longTextTypeConfig } from '../config-for-examples/text-type.config';

@Component({
    selector: 'fdp-icon-tab-bar-two-click-area-example',
    imports: [IconTabBarComponent],
    templateUrl: './icon-tab-bar-two-click-area-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarTwoClickAreaExampleComponent {
    textItems = cloneDeep(longTextTypeConfig).map((item) => {
        item.closable = true;
        return item;
    });

    constructor() {
        this.textItems[3].subItems = [
            {
                label: 'Item 0',
                counter: null,
                color: 'critical',
                closable: true,
                subItems: [
                    {
                        label: 'Item 0.1',
                        counter: null,
                        color: null
                    },
                    {
                        label: 'Item 0.2',
                        counter: null,
                        color: null,
                        closable: true
                    }
                ]
            },
            {
                label: 'Item 1',
                counter: null,
                color: null
            },
            {
                label: 'Item 2',
                counter: null,
                color: null
            }
        ];
    }
}
