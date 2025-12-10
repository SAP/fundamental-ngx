import { Component, computed, signal } from '@angular/core';
import type { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { MultiComboBox } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box';
import { MultiComboBoxItem } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item';
import { MultiComboBoxItemGroup } from '@fundamental-ngx/ui5-webcomponents/multi-combo-box-item-group';

interface Technology {
    id: string;
    name: string;
    category: string;
}

@Component({
    selector: 'ui5-multi-combobox-grouped-items-sample',
    templateUrl: './grouped-items-sample.html',
    standalone: true,
    imports: [MultiComboBox, MultiComboBoxItem, MultiComboBoxItemGroup]
})
export class MultiComboBoxGroupedItemsExample {
    technologies = signal<Technology[]>([
        { id: 'angular', name: 'Angular', category: 'Frontend' },
        { id: 'react', name: 'React', category: 'Frontend' },
        { id: 'vue', name: 'Vue', category: 'Frontend' },
        { id: 'nodejs', name: 'Node.js', category: 'Backend' },
        { id: 'dotnet', name: '.NET', category: 'Backend' },
        { id: 'java', name: 'Java', category: 'Backend' },
        { id: 'postgres', name: 'PostgreSQL', category: 'Database' },
        { id: 'mongodb', name: 'MongoDB', category: 'Database' },
        { id: 'redis', name: 'Redis', category: 'Database' }
    ]);

    selected = signal<string[]>(['Angular', 'Node.js']);

    techCategories = computed(() => {
        const categories = new Set(this.technologies().map((t) => t.category));
        return Array.from(categories);
    });

    getTechsByCategory(category: string): Technology[] {
        return this.technologies().filter((t) => t.category === category);
    }

    onTechSelectionChange(event: UI5WrapperCustomEvent<MultiComboBox, 'ui5SelectionChange'>): void {
        const items = event.detail.items;
        this.selected.set(items.map((item) => item.text || ''));
    }
}
