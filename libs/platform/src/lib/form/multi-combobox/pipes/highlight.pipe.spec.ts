import { TestBed, waitForAsync } from '@angular/core/testing';

import { MatchingStrategy } from '@fundamental-ngx/platform/shared';
import { HighlightPipe } from './highlight.pipe';
import { MultiComboboxConfig } from '../multi-combobox.config';

describe('Pipe: Highlight', () => {
    let pipe: HighlightPipe;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [MultiComboboxConfig]
        }).compileComponents();

        const multiComboboxConfig = TestBed.inject(MultiComboboxConfig);
        pipe = new HighlightPipe(multiComboboxConfig);
    }));

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('highlight with STARTS_WITH strategy', () => {
        const result = pipe.transform('Apple', 'a', MatchingStrategy.STARTS_WITH);
        expect(result).toEqual('<strong>A</strong>pple');

        const result2 = pipe.transform('Apple', 'p', MatchingStrategy.STARTS_WITH);
        expect(result2).toEqual('Apple');
    });

    it('highlight with CONTAINS strategy', () => {
        const result = pipe.transform('Apple', 'p', MatchingStrategy.CONTAINS);
        expect(result).toEqual('A<strong>p</strong><strong>p</strong>le');
    });
});
