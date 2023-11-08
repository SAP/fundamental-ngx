import { SortDirection } from '../enums';
import { TableColumnSortingDirectionPipe } from './column-sorting-direction.pipe';

describe('TableColumnSortingDirectionPipe', () => {
    let pipe: TableColumnSortingDirectionPipe;
    beforeEach(() => {
        pipe = new TableColumnSortingDirectionPipe();
    });

    it('should transform empty sorting as none', () => {
        expect(pipe.transform(null)).toEqual('none');
        expect(pipe.transform(undefined)).toEqual('none');
        expect(pipe.transform({ field: 'field', direction: SortDirection.NONE })).toEqual('none');
    });

    it('should transform sorting', () => {
        expect(pipe.transform({ field: 'field', direction: SortDirection.ASC })).toEqual('ascending');
        expect(pipe.transform({ field: 'field', direction: SortDirection.DESC })).toEqual('descending');
    });
});
