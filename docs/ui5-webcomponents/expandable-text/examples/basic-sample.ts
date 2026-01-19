import { Component, signal } from '@angular/core';
import { ExpandableText } from '@fundamental-ngx/ui5-webcomponents/expandable-text';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';
import { Table } from '@fundamental-ngx/ui5-webcomponents/table';
import { TableCell } from '@fundamental-ngx/ui5-webcomponents/table-cell';
import { TableHeaderCell } from '@fundamental-ngx/ui5-webcomponents/table-header-cell';
import { TableHeaderRow } from '@fundamental-ngx/ui5-webcomponents/table-header-row';
import { TableRow } from '@fundamental-ngx/ui5-webcomponents/table-row';
import { Text } from '@fundamental-ngx/ui5-webcomponents/text';

@Component({
    selector: 'ui5-expandable-text-basic-example',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [ExpandableText, Table, TableRow, TableHeaderRow, TableCell, TableHeaderCell, Label, Text]
})
export class ExpandableTextBasicExample {
    readonly sampleText = signal(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    );

    readonly shortText = signal(
        'This is a short text that will not be truncated because it is under the character limit.'
    );

    readonly longText = signal(
        'This is a much longer text that demonstrates the expandable text functionality. ' +
            'When text exceeds the maximum character limit, it will be truncated with an ellipsis and show a "More" link. ' +
            'Users can click the "More" link to expand and see the full content. After expansion, a "Less" link allows ' +
            'users to collapse the text back to its truncated state. This provides a clean and user-friendly way to ' +
            'handle long content without overwhelming the interface. The component is particularly useful in scenarios ' +
            'like product descriptions, news articles, comments, or any content that might vary significantly in length.'
    );
}
