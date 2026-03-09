import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage, FdLanguageKeyArgs, FdLanguageKeyIdentifier } from '../models';
import { FD_LANGUAGE_SIGNAL } from '../utils/tokens';
import { FdTranslatePipe } from './fd-translate.pipe';

const lang: FdLanguage = {
    ...FD_LANGUAGE_ENGLISH,
    platformApprovalFlow: {
        ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
        nodeMembersCount: (params) => `${params['count']} members`
    }
};

@Component({
    template: `{{ (testKey | fdTranslate: testArgs)() }}`,
    standalone: true,
    imports: [FdTranslatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
    @Input() testKey: FdLanguageKeyIdentifier;
    @Input() testArgs: FdLanguageKeyArgs;
}

describe('FdTranslate pipe', () => {
    let langSignal: ReturnType<typeof signal<FdLanguage>>;
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
        langSignal = signal<FdLanguage>(lang);
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [
                {
                    provide: FD_LANGUAGE_SIGNAL,
                    useValue: langSignal
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
            langSignal.set({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    nodeMembersCount
                }
            });
            testComponentFixture.detectChanges();
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 15 });
            expectValueToBe('15 function members');
            expect(nodeMembersCount).toHaveBeenCalledWith({ count: 15 });
            expect(nodeMembersCount).toHaveBeenCalledTimes(1);
        });
        it('should fall back to English dictionary if function value throws', () => {
            const nodeMembersCount = jest.fn(() => {
                throw new Error('Oops');
            });
            langSignal.set({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    nodeMembersCount
                }
            });
            testComponentFixture.detectChanges();
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 15 });
            expectValueToBe('15 members');
            expect(nodeMembersCount).toHaveBeenCalled();
        });
        it('should fall back to English dictionary if value was not found', () => {
            const customLang = {
                ...FD_LANGUAGE_ENGLISH
            };
            delete (<any>customLang).platformApprovalFlow;
            langSignal.set(customLang);
            testComponentFixture.detectChanges();
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 15 });
            expectValueToBe('15 members');
        });
    });

    describe('pipe reactivity with signal changes', () => {
        beforeEach(async () => {
            beforeEachTest();
            await TestBed.compileComponents();
            testComponentFixture = TestBed.createComponent(TestComponent);
        });

        it('should update translation when language signal changes', () => {
            setCtx('platformApprovalFlow.defaultWatchersLabel');
            expectValueToBe('Watchers');

            // Change language
            langSignal.set({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    defaultWatchersLabel: 'Updated Watchers'
                }
            });
            testComponentFixture.detectChanges();
            expectValueToBe('Updated Watchers');
        });

        it('should update translation with params when language changes', () => {
            setCtx('platformApprovalFlow.nodeMembersCount', { count: 10 });
            expectValueToBe('10 members');

            // Change language
            langSignal.set({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    nodeMembersCount: (params) => `${params['count']} updated members`
                }
            });
            testComponentFixture.detectChanges();
            expectValueToBe('10 updated members');
        });
    });
});
