import { ColumnLayout, ColumnLayoutGridClass } from '@fundamental-ngx/platform/shared';

/** @hidden */
export function normalizeColumnLayout(layout: ColumnLayout, defaultColumn = 12): Required<ColumnLayout> {
    layout['S'] = layout['S'] !== undefined ? layout['S'] : defaultColumn;
    layout['M'] = layout['M'] || layout['S'];
    layout['L'] = layout['L'] || layout['M'];
    layout['XL'] = layout['XL'] || layout['L'];

    return layout as Required<ColumnLayout>;
}

/** @hidden */
export function generateColumnClass(layout: ColumnLayout): string {
    return Object.entries(layout)
        .reduce((overall, value) => {
            overall.push(`fd-col-${ColumnLayoutGridClass[value[0]]}--${value[1]}`);
            return overall;
        }, [] as string[])
        .join(' ');
}
