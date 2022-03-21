import { ChangeDetectorRef } from '@angular/core';
import { delay, of } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage } from '../models';
import { FdTranslatePipe } from './fd-translate.pipe';

describe('FdTranslate pipe', () => {
    let pipe: FdTranslatePipe;
    const changeDetectorRefMock = { markForCheck: () => {} } as ChangeDetectorRef;

    describe('interpolation', () => {
        beforeEach(() => {
            pipe = new FdTranslatePipe(of(FD_LANGUAGE_ENGLISH), changeDetectorRefMock);
        });

        const cases: [unprocessed: string, args: Record<string, any> | undefined, result: string][] = [
            ['{{ count }} items', { count: 5 }, '5 items'],
            ['{{ count }} items', { count: 'some' }, 'some items'],
            ['{{ count }} items', { count: {} }, '[object Object] items'],
            ['{{ another_count }} items', { another_count: 5 }, '5 items'],
            ['{{ anotherCount }} items', { anotherCount: 5 }, '5 items'],
            ['{{ anothercount }} items', { anotherCount: 5 }, ' items'],
            ['{{ }} items', { count: 5 }, ' items'],
            ['{{ count }} items', {}, ' items'],
            ['{{ count }} items', undefined, ' items'],
            ['{{    count    }} items', { count: 5 }, '5 items'],
            ['{{count}} items', { count: 5 }, '5 items'],
            ['{{count }} items', { count: 5 }, '5 items'],
            [' {{ count }} items', { count: 5 }, ' 5 items'],
            ['another {{ count }} items', { count: 5 }, 'another 5 items'],
            ['{{{ count }}} items', { count: 5 }, '{5} items'],
            ['{{{{ count }}}} items', { count: 5 }, '{{5}} items'],
            ['{{{ count }} items', { count: 5 }, '{5 items'],
            ['{{ count }}} items', { count: 5 }, '5} items'],
            ['{{ two words }} items', { two: 5, words: 10 }, '{{ two words }} items'],
            ['{{ before }} {{ count }} items', { count: 5, before: 'awesome' }, 'awesome 5 items']
        ];

        cases.forEach(([unprocessed, args, result]) => {
            it(`"${unprocessed}" should be processed as "${result}"`, () => {
                expect(pipe._interpolate(unprocessed, args)).toBe(result);
            });
        });
    });

    describe('pipe functionality', () => {
        beforeEach(() => {
            pipe = new FdTranslatePipe(of(FD_LANGUAGE_ENGLISH), changeDetectorRefMock);
        });

        it("should return value by key, if it's available", () => {
            pipe = new FdTranslatePipe(of(FD_LANGUAGE_ENGLISH), changeDetectorRefMock);
            expect(pipe.transform('platformApprovalFlow.defaultWatchersLabel')).toBe('Watchers');
            expect(pipe.transform('platformApprovalFlow.nodeMembersCount', { count: 10 })).toBe('10 members');
        });

        it('should return empty string if value is not found', () => {
            expect(pipe.transform('wrong')).toBe('');
        });

        it('should work with function values', () => {
            const customLang = {
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    nodeMembersCount: (params: { count: number }) => `${params.count} function members`
                }
            } as FdLanguage;
            const spy = spyOn(customLang.platformApprovalFlow, 'nodeMembersCount' as any).and.callThrough();
            pipe = new FdTranslatePipe(of(customLang), changeDetectorRefMock);
            expect(pipe.transform('platformApprovalFlow.nodeMembersCount', { count: 15 })).toBe('15 function members');
            expect(spy).toHaveBeenCalledOnceWith({ count: 15 });
        });
        it('should fall back to English dictionary if function value throws', () => {
            const customLang = {
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    nodeMembersCount: () => {
                        throw new Error('Oops');
                    }
                }
            } as FdLanguage;
            const spy = spyOn(customLang.platformApprovalFlow, 'nodeMembersCount' as any).and.callThrough();
            pipe = new FdTranslatePipe(of(customLang), changeDetectorRefMock);
            expect(pipe.transform('platformApprovalFlow.nodeMembersCount', { count: 15 })).toBe('15 members');
            expect(spy).toHaveBeenCalled();
        });
        it('should fall back to English dictionary if value was not found', () => {
            const customLang = {
                ...FD_LANGUAGE_ENGLISH
            } as FdLanguage;
            delete (<any>customLang).platformApprovalFlow;
            pipe = new FdTranslatePipe(of(customLang), changeDetectorRefMock);
            expect(pipe.transform('platformApprovalFlow.nodeMembersCount', { count: 15 })).toBe('15 members');
        });
    });

    describe('pipe functionality with async values', () => {
        // cannot use fakeAsync, because rxjs delays are not taken into account with it
        // https://github.com/angular/angular/issues/44351
        const DELAY = 5;

        beforeEach(() => {
            pipe = new FdTranslatePipe(of(FD_LANGUAGE_ENGLISH).pipe(delay(DELAY)), changeDetectorRefMock);
        });

        it('without params', (done) => {
            expect(pipe.transform('platformApprovalFlow.defaultWatchersLabel')).toBe('');
            setTimeout(() => {
                expect(pipe.transform('platformApprovalFlow.defaultWatchersLabel')).toBe('Watchers');
                done();
            }, DELAY + 1);
        });
        it('with params', (done) => {
            expect(pipe.transform('platformApprovalFlow.nodeMembersCount', { count: 10 })).toBe('');
            setTimeout(() => {
                expect(pipe.transform('platformApprovalFlow.nodeMembersCount', { count: 10 })).toBe('10 members');
                done();
            }, DELAY + 1);
        });
    });
});
