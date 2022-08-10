import { TestBed, waitForAsync } from '@angular/core/testing';

import { MatchingStrategy } from '@fundamental-ngx/platform/shared';
import { MultiComboboxHighlightPipe } from './highlight.pipe';
import { MultiComboboxConfig } from '../multi-combobox.config';

describe('Pipe: MultiComboboxHighlightPipe', () => {
    let pipe: MultiComboboxHighlightPipe;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [MultiComboboxConfig]
        }).compileComponents();

        const multiComboboxConfig = TestBed.inject(MultiComboboxConfig);
        pipe = new MultiComboboxHighlightPipe(multiComboboxConfig);
    }));

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('highlight with STARTS_WITH_PER_TERM strategy', () => {
        const result = pipe.transform('Apple test message', 'ap', MatchingStrategy.STARTS_WITH_PER_TERM);
        expect(result).toEqual('<strong>Ap</strong>ple test message');

        const result2 = pipe.transform('Apple test text message', 'T', MatchingStrategy.STARTS_WITH_PER_TERM);
        expect(result2).toEqual('Apple <strong>t</strong>est <strong>t</strong>ext message');

        const result3 = pipe.transform('Apple test message', 'mes', MatchingStrategy.STARTS_WITH_PER_TERM);
        expect(result3).toEqual('Apple test <strong>mes</strong>sage');

        const result4 = pipe.transform('Apple', 'a', MatchingStrategy.STARTS_WITH_PER_TERM);
        expect(result4).toEqual('<strong>A</strong>pple');

        const result5 = pipe.transform('Apple test message', 'p', MatchingStrategy.STARTS_WITH_PER_TERM);
        expect(result5).toEqual('Apple test message');
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
