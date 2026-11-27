import { firstValueFrom } from 'rxjs';
import { CollectionStringFilter } from '../interfaces/collection-filter.interface';
import { TableRow } from '../models/table-row.model';
import { filterByString } from '../utils';
import { ArrayTableDataProvider } from './array-data-source';

interface Item {
    name: string;
    code: number | null;
    note?: string | null;
}

const items: Item[] = [
    { name: 'Alpha', code: 10, note: 'apple' },
    { name: 'Beta', code: 0, note: null },
    { name: 'Gamma', code: null }
];

const stringFilter = (field: string, strategy: string, value: string, exclude = false): CollectionStringFilter =>
    ({ field, strategy, value, type: 'string', exclude }) as CollectionStringFilter;

describe('ArrayTableDataProvider string filtering', () => {
    const filterNames = async (filter: CollectionStringFilter): Promise<string[]> => {
        const provider = new ArrayTableDataProvider(items);
        const result = await firstValueFrom(provider.fetch({ filterBy: [filter] } as any));
        return result.map((item) => item.name);
    };

    it('should skip empty values for "begins with" and "ends with"', async () => {
        expect(await filterNames(stringFilter('note', 'beginsWith', 'a'))).toEqual(['Alpha']);
        expect(await filterNames(stringFilter('note', 'endsWith', 'e'))).toEqual(['Alpha']);
        expect(await filterNames(stringFilter('note', 'beginsWith', 'a', true))).toEqual(['Beta', 'Gamma']);
    });

    it('should compare the text of non-string values', async () => {
        expect(await filterNames(stringFilter('code', 'contains', '1'))).toEqual(['Alpha']);
        expect(await filterNames(stringFilter('code', 'equalTo', '0'))).toEqual(['Beta']);
        expect(await filterNames(stringFilter('code', 'beginsWith', '0'))).toEqual(['Beta']);
        expect(await filterNames(stringFilter('code', 'endsWith', '0'))).toEqual(['Alpha', 'Beta']);
    });

    it('should keep filtering string values as before', async () => {
        expect(await filterNames(stringFilter('name', 'contains', 'MM'))).toEqual(['Gamma']);
        expect(await filterNames(stringFilter('name', 'beginsWith', 'b'))).toEqual(['Beta']);
        expect(await filterNames(stringFilter('name', 'equalTo', 'alpha'))).toEqual(['Alpha']);
        expect(await filterNames(stringFilter('name', 'contains', 'a', true))).toEqual([]);
    });
});

describe('filterByString', () => {
    const rows = items.map((value) => ({ value }) as TableRow<Item>);
    const names = (result: TableRow[]): string[] => result.map((row) => row.value.name);

    it('should skip rows without a value', () => {
        expect(names(filterByString(rows, stringFilter('note', 'contains', 'p')))).toEqual(['Alpha']);
        expect(names(filterByString(rows, stringFilter('note', 'beginsWith', 'a')))).toEqual(['Alpha']);
    });

    it('should compare the text of non-string values', () => {
        expect(names(filterByString(rows, stringFilter('code', 'equalTo', '0')))).toEqual(['Beta']);
        expect(names(filterByString(rows, stringFilter('code', 'beginsWith', '1')))).toEqual(['Alpha']);
        expect(names(filterByString(rows, stringFilter('code', 'contains', '0')))).toEqual(['Alpha', 'Beta']);
    });

    it('should keep filtering string values as before', () => {
        expect(names(filterByString(rows, stringFilter('name', 'equalTo', 'beta')))).toEqual(['Beta']);
        expect(names(filterByString(rows, stringFilter('name', 'endsWith', 'A')))).toEqual(['Alpha', 'Beta', 'Gamma']);
        expect(names(filterByString(rows, stringFilter('name', 'between', 'b')))).toEqual([]);
    });
});
