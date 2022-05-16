interface ParseLayout {
    [key: string]: {
        pattern: string;
        value: number;
        size: string;
    };
}

export function parseLayoutPattern(pattern: string | undefined, isBaseLayout = true): string[] {
    const parseLayout = pattern && validateAndParseLayoutPattern(pattern, isBaseLayout);

    if (!parseLayout) {
        throw new Error('Invalid layoutPattern.');
    }

    return generateLayoutClasses(parseLayout);
}

function validateAndParseLayoutPattern(pattern: string, isBaseLayout: boolean): ParseLayout | undefined {
    const columnsNames = 'XL|L|M|S';
    const columnNumbers = isBaseLayout ? '12|6|4|3|2|1' : '12|11|10|9|8|7|6|5|4|3|2|1';
    const reg = new RegExp(`(?!-)((${columnsNames})(${columnNumbers}))`, 'gi');
    const match = pattern.match(reg);
    if (!match) {
        return;
    }

    return match.reduce((res, item) => {
        const size = item.replace(reg, '$2').toLocaleLowerCase();
        const num = +item.replace(reg, '$3');

        res[size] = {
            pattern: item,
            size,
            value: isBaseLayout ? 12 / num : num
        };

        return res;
    }, {});
}

function generateLayoutClasses({ xl, l, m, s }: ParseLayout): string[] {
    const classes: string[] = ['fd-col'];

    if (s) {
        classes.push(`fd-col--${s.value}`);
    }

    if (m) {
        classes.push(`fd-col-md--${m.value}`);
    }

    if (l) {
        classes.push(`fd-col-lg--${l.value}`);
    }

    if (xl) {
        classes.push(`fd-col-xl--${xl.value}`);
    }

    return classes;
}
