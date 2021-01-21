import { HighlightPipe } from './highlight.pipe';
import { ComboboxConfig, MatchingStrategy } from '../combobox.config';
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('Pipe: Highlight', () => {
    let pipe: HighlightPipe;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [ComboboxConfig]
        }).compileComponents();

        const comboboxConfig = TestBed.inject(ComboboxConfig);
        pipe = new HighlightPipe(comboboxConfig);
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
