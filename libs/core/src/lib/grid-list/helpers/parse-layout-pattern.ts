interface ColumnsNumber {
    xl?: number;
    l?: number;
    m?: number;
    s?: number;
}

export function parseLayoutPattern(pattern: string, isBaseLayout = true): string | null {
    const validColumns = getValidLayoutPatternColumns(pattern, isBaseLayout);

    if (!validColumns) {
        return null;
    }

    const columnsNumber = getColumnsNumber(validColumns, isBaseLayout);

    return generateLayoutClasses(columnsNumber);
}

function getValidLayoutPatternColumns(pattern: string, isBaseLayout: boolean): string[] | null {
    const columnsNames = 'XL|L|M|S';
    const columnNumbers = isBaseLayout ? '12|6|4|3|2|1' : '12|11|10|9|8|7|6||4|3|2|1';
    const reg = new RegExp(`((?!\-)((${columnsNames})(${columnNumbers})))`, 'gi');

    return pattern.match(reg);
}

function getColumnsNumber(columns: string[], isBaseLayout: boolean): ColumnsNumber {
    return columns.reduce((res, item) => {
        const size = item.match(/[a-zA-Z]+/g)[0].toLocaleLowerCase();
        const num = +item.match(/\d+/g)[0];

        res[size] = isBaseLayout ? 12 / num : num;

        return res;
    }, {});
}

function generateLayoutClasses({ xl, l, m, s }: ColumnsNumber): string {
    let classes = 'fd-col';

    if (s) {
        classes += ` fd-col--${s}`;
    }

    if (m) {
        classes += ` fd-col-md--${m}`;
    }

    if (l) {
        classes += ` fd-col-lg--${l}`;
    }

    if (xl) {
        classes += ` fd-col-xl--${xl}`;
    }

    return classes;
}
