import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconTabBarComponent, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
import { longTextTypeConfig, textTypeConfig } from '../config-for-examples/text-type.config';

@Component({
    selector: 'fdp-platform-icon-tab-bar-text-type-example',
    templateUrl: './platform-icon-tab-bar-text-type-example.component.html',
    imports: [IconTabBarComponent, ButtonComponent]
})
export class PlatformIconTabBarTextTypeExampleComponent implements OnInit {
    @Input()
    textTypeLayoutMode: 'row' | 'column' = 'row';

    @Input()
    enableTabReordering = false;

    @Input()
    withOverflowExample = false;

    @Input()
    nested = false;

    items: TabConfig[];

    /** Whether the long labels variant is active. */
    useLongLabels = false;

    ngOnInit(): void {
        this.items = this.withOverflowExample ? structuredClone(longTextTypeConfig) : structuredClone(textTypeConfig);
        if (this.nested) {
            this.items[3].subItems = [
                {
                    label: 'Item 0',
                    counter: null,
                    color: 'critical',
                    subItems: [
                        {
                            label: 'Item 0.1',
                            counter: null,
                            color: null
                        },
                        {
                            label: 'Item 0.2',
                            counter: null,
                            color: null
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

    /** Toggle tab labels between short and long text to simulate a structure change (e.g. language switch). */
    toggleLabels(): void {
        this.useLongLabels = !this.useLongLabels;
        const base = this.withOverflowExample ? structuredClone(longTextTypeConfig) : structuredClone(textTypeConfig);
        if (this.useLongLabels) {
            base.forEach((item) => {
                item.label = `Very Long Label For ${item.label} With Extra Text`;
            });
        }
        this.items = base;
    }

    /** Add five more tabs dynamically to force overflow. */
    addMoreTabs(): void {
        const startIndex = this.items.length;
        const extra: TabConfig[] = Array.from({ length: 5 }, (_, i) => ({
            label: `New Tab ${startIndex + i}`,
            counter: Math.floor(Math.random() * 100),
            color: null
        }));
        this.items = [...this.items, ...extra];
    }
}
