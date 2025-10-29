import { Component, signal } from '@angular/core';
import { ExpandableText } from '@fundamental-ngx/ui5-webcomponents/expandable-text';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Option } from '@fundamental-ngx/ui5-webcomponents/option';
import { Select } from '@fundamental-ngx/ui5-webcomponents/select';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';
import 'fundamental-styles/dist/paddings.css';

@Component({
    selector: 'ui5-expandable-text-overflow-mode-popover-example',
    templateUrl: './overflow-mode-popover.html',
    standalone: true,
    imports: [ExpandableText, Table, TableCell, TableRow, TableHeaderCell, TableHeaderRow, Label, Select, Option]
})
export class ExpandableTextOverflowModePopoverExample {
    readonly selectedOverflowMode = signal<'InPlace' | 'Popover'>('InPlace');

    readonly sampleText = signal(
        'This is a demonstration of the different overflow modes available in the Expandable Text component. ' +
            'The "InPlace" mode expands the text directly within the current container, pushing down any content below it. ' +
            'The "Popover" mode shows the full text in a popup overlay when the "More" link is clicked, which is useful ' +
            'when you want to preserve the layout and not push other content around. Both modes provide a clean and ' +
            'intuitive way for users to access additional content when needed.'
    );

    onOverflowModeChange(event: any): void {
        const selectedValue = (event.target as any).selectedOption?.value;
        if (selectedValue === 'InPlace' || selectedValue === 'Popover') {
            this.selectedOverflowMode.set(selectedValue);
        }
    }
}
