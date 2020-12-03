export function parseLayoutPattern(pattern: string): string {
    const [xl, lg, md, s] = pattern.split('-');
    const xlColumnsNumber = parseInt(xl.slice(2, xl.length), 10);
    const lgColumnsNumber = parseInt(lg.slice(1, lg.length), 10);
    const mdColumnsNumber = parseInt(md.slice(1, md.length), 10);
    const sColumnsNumber = parseInt(s.slice(1, s.length), 10);

    if (isNaN(xlColumnsNumber) || isNaN(lgColumnsNumber) || isNaN(mdColumnsNumber) || isNaN(sColumnsNumber)) {
        throw new Error('Input a valid number for columns');
    } else if (xlColumnsNumber > 12 || lgColumnsNumber > 12 || mdColumnsNumber > 12 || sColumnsNumber > 12) {
        throw new Error('Columns cannot be more than 12');
    } else {
        const xlCol = Math.round(Math.abs(12 / xlColumnsNumber));
        const lgCol = Math.round(Math.abs(12 / lgColumnsNumber));
        const mdCol = Math.round(Math.abs(12 / mdColumnsNumber));
        const sCol = Math.round(Math.abs(12 / sColumnsNumber));

        return `fd-col--${sCol} fd-col-md--${mdCol} fd-col-lg--${lgCol} fd-col-xl--${xlCol}`
    }
}

export function parseItemLayoutPattern(pattern: string): string {
    const [xl, lg, md, s] = pattern.split('-');
    const xlColumnsNumber = parseInt(xl.slice(2, xl.length), 10);
    const lgColumnsNumber = parseInt(lg.slice(1, lg.length), 10);
    const mdColumnsNumber = parseInt(md.slice(1, md.length), 10);
    const sColumnsNumber = parseInt(s.slice(1, s.length), 10);

    if (isNaN(xlColumnsNumber) || isNaN(lgColumnsNumber) || isNaN(mdColumnsNumber) || isNaN(sColumnsNumber)) {
        throw new Error('Input a valid number for columns');
    } else if (xlColumnsNumber > 12 || lgColumnsNumber > 12 || mdColumnsNumber > 12 || sColumnsNumber > 12) {
        throw new Error('Columns cannot be more than 12');
    } else {
        const xlCol = Math.round(Math.abs(xlColumnsNumber));
        const lgCol = Math.round(Math.abs(lgColumnsNumber));
        const mdCol = Math.round(Math.abs(mdColumnsNumber));
        const sCol = Math.round(Math.abs(sColumnsNumber));

        return `fd-col--${sCol} fd-col-md--${mdCol} fd-col-lg--${lgCol} fd-col-xl--${xlCol}`
    }
}
