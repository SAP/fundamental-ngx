import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, delay } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage, FdLanguageKeyArgs, FdLanguageKeyIdentifier } from '../models';
import { FD_LANGUAGE } from '../utils/tokens';
import { FdTranslatePipe } from './fd-translate.pipe';

const lang: FdLanguage = {
    ...FD_LANGUAGE_ENGLISH,
    platformApprovalFlow: {
        ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
        nodeMembersCount: (params) => `${params['count']} members`
    }
};

@Component({
    template: `{{ testKey | fdTranslate: testArgs }}`,
    standalone: true,
    imports: [FdTranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
    @Input() testKey: FdLanguageKeyIdentifier;
    @Input() testArgs: FdLanguageKeyArgs;
}

describe('FdTranslate pipe', () => {
    let lang$: BehaviorSubject<FdLanguage>;
    let testComponentFixture: ComponentFixture<TestComponent>;

    function getTranslatedValue(): string {
        return testComponentFixture.nativeElement.textContent.trim();
    }

    function setCtx(key: FdLanguageKeyIdentifier | null, args?: FdLanguageKeyArgs): void {
        testComponentFixture.componentRef.setInput('testKey', key);
        testComponentFixture.componentRef.setInput('testArgs', args);
        testComponentFixture.detectChanges();
    }

    function expectValueToBe(v: string): void {
        expect(getTranslatedValue()).toBe(v);
    }

    const beforeEachTest = (): void => {
        lang$ = new BehaviorSubject<FdLanguage>(lang);
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [
                {
                    provide: FD_LANGUAGE,
                    useValue: lang$
                }
            ]
        });
    };

    describe('pipe functionality', () => {
        beforeEach(async () => {
            beforeEachTest();
            await TestBed.compileComponents();
            testComponentFixture = TestBed.createComponent(TestComponent);
        });
        it("should return value by key, if it's available", () => {
            setCtx('platformApprovalFlow.defaultWatchersLabel');
            expectValueToBe('Watchers');
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 10 });
            expectValueToBe('10 members');
        });

        it('should return empty string if value is not found', () => {
            // @ts-expect-error: testing wrong key
            setCtx('wrong');
            expectValueToBe('');
        });

        it('should return an empty string if null is passed', () => {
            setCtx(null);
            expectValueToBe('');
        });

        it('should work with function values', () => {
            const nodeMembersCount = jest.fn((params) => `${params['count']} function members`);
            lang$.next({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    nodeMembersCount
                }
            });
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 15 });
            expectValueToBe('15 function members');
            expect(nodeMembersCount).toHaveBeenCalledWith({ count: 15 });
            expect(nodeMembersCount).toHaveBeenCalledTimes(1);
        });
        it('should fall back to English dictionary if function value throws', () => {
            const nodeMembersCount = jest.fn(() => {
                throw new Error('Oops');
            });
            lang$.next({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    nodeMembersCount
                }
            });
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 15 });
            expectValueToBe('15 members');
            expect(nodeMembersCount).toHaveBeenCalled();
        });
        it('should fall back to English dictionary if value was not found', () => {
            const customLang = {
                ...FD_LANGUAGE_ENGLISH
            };
            delete (<any>customLang).platformApprovalFlow;
            lang$.next(customLang);
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 15 });
            expectValueToBe('15 members');
        });
    });

    describe('pipe functionality with async values', () => {
        // cannot use fakeAsync, because rxjs delays are not taken into account with it
        // https://github.com/angular/angular/issues/44351
        const DELAY = 5;
        beforeEach(async () => {
            beforeEachTest();
            TestBed.overrideProvider(FD_LANGUAGE, {
                useValue: lang$.pipe(delay(DELAY))
            });
            await TestBed.compileComponents();
            testComponentFixture = TestBed.createComponent(TestComponent);
        });

        it('without params', (done) => {
            setCtx('platformApprovalFlow.defaultWatchersLabel');
            expectValueToBe('');
            setTimeout(() => {
                testComponentFixture.detectChanges();
                expectValueToBe('Watchers');
                done();
            }, DELAY + 1);
        });

        it('with params', (done) => {
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 10 });
            expectValueToBe('');
            setTimeout(() => {
                testComponentFixture.detectChanges();
                expectValueToBe('10 members');
                done();
            }, DELAY + 1);
        });
    });
});
