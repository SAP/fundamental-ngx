import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IconTabBarComponent } from '@fundamental-ngx/platform/icon-tab-bar';
import { longIconTypeConfig } from '../config-for-examples/icon-type-config';

@Component({
    selector: 'fdp-icon-tab-bar-closable-tabs-example',
    imports: [IconTabBarComponent],
    templateUrl: './icon-tab-bar-closable-tabs-example.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconTabBarClosableTabsExampleComponent {
    textItems = structuredClone(longIconTypeConfig).map((item) => {
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
