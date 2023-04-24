import { ChangeDetectorRef } from '@angular/core';
import { delay, of } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage } from '../models';
import { FdTranslatePipe } from './fd-translate.pipe';

describe('FdTranslate pipe', () => {
    let pipe: FdTranslatePipe;
    const changeDetectorRefMock = { markForCheck: () => {} } as ChangeDetectorRef;

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
            const spy = jest.spyOn<any, any>(customLang.platformApprovalFlow, 'nodeMembersCount');
            pipe = new FdTranslatePipe(of(customLang), changeDetectorRefMock);
            expect(pipe.transform('platformApprovalFlow.nodeMembersCount', { count: 15 })).toBe('15 function members');
            expect(spy).toHaveBeenCalledWith({ count: 15 });
            expect(spy).toHaveBeenCalledTimes(1);
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
            const spy = jest.spyOn<any, any>(customLang.platformApprovalFlow, 'nodeMembersCount' as any);
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
