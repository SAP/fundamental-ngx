import { Pipe, PipeTransform } from '@angular/core';
import { ColumnAlign } from '../enums';
import { TableColumn } from '../components/table-column/table-column';

@Pipe({ name: 'tableCellStyles' })
export class TableCellStylesPipe implements PipeTransform {
    /** @hidden */
    transform(
        column: TableColumn,
        isRtl: boolean,
        semanticHighlightingColumnWidth: number,
        selectionColumnWidth: number,
        isFrozenColumn: boolean,
        isFrozenEndColumn: boolean,
        prevColumnWidthPx: number,
        columnWidth: string,
        nextColumnWidthPx: number
    ): Record<string, number | string> {
        const styles: { [property: string]: number | string } = {};

        if (isFrozenColumn) {
            const key = isRtl ? 'right.px' : 'left.px';
            styles[key] = semanticHighlightingColumnWidth + selectionColumnWidth + prevColumnWidthPx;
        }

        if (isFrozenEndColumn) {
            const key = isRtl ? 'left.px' : 'right.px';
            styles[key] = nextColumnWidthPx.toString();
        }

        styles['min-width'] = columnWidth;
        styles['max-width'] = columnWidth;
        styles['width'] = columnWidth;

        // The "start" value does align left when you are using a LTR browser.
        // In RTL browsers, the "start" value aligns right.
        // Since we want to dynamically apply alignment only depending on the service value, we are using "left"/"right" as values instead
        switch (column.align) {
            case ColumnAlign.START:
                styles['text-align'] = isRtl ? 'right' : 'left';
                break;
            case ColumnAlign.END:
                styles['text-align'] = isRtl ? 'left' : 'right';
                break;
            default:
                styles['text-align'] = 'center';
                break;
        }

        return styles;
    }
}
