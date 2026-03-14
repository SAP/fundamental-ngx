import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconTabBarComponent, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';
import { textTypeConfig } from '../config-for-examples/text-type.config';

@Component({
    selector: 'fdp-platform-icon-tab-bar-dynamic-overflow-example',
    templateUrl: './platform-icon-tab-bar-dynamic-overflow-example.component.html',
    imports: [IconTabBarComponent, ButtonComponent]
})
export class PlatformIconTabBarDynamicOverflowExampleComponent implements OnInit {
    items: TabConfig[];

    /** Whether the long labels variant is active. */
    useLongLabels = false;

    ngOnInit(): void {
        this.items = structuredClone(textTypeConfig);
    }

    /** Toggle tab labels between short and long text to simulate a structure change (e.g. language switch). */
    toggleLabels(): void {
        this.useLongLabels = !this.useLongLabels;
        const base = structuredClone(textTypeConfig);
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
