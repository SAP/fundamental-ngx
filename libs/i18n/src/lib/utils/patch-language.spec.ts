import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FD_LANGUAGE_ENGLISH } from '../languages/english';
import { FdLanguage, FdLanguagePatch } from '../models';
import { patchedObj, patchLanguage } from './patch-language';
import { FD_LANGUAGE_SIGNAL } from './tokens';

describe('patchLanguage', () => {
    let langSignal: ReturnType<typeof signal<FdLanguage>>;

    beforeEach(() => {
        langSignal = signal<FdLanguage>(FD_LANGUAGE_ENGLISH);
    });

    describe('patchedObj helper', () => {
        it('should return patch object directly when patch is not a function', () => {
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    defaultWatchersLabel: 'Custom Watchers'
                }
            };

            const result = patchedObj(FD_LANGUAGE_ENGLISH, patch);

            expect(result).toBe(patch);
            expect(result.platformApprovalFlow?.defaultWatchersLabel).toBe('Custom Watchers');
        });

        it('should call patch function and return result when patch is a function', () => {
            const patchFn = jest.fn(
                (lang: FdLanguage): FdLanguagePatch => ({
                    platformApprovalFlow: {
                        defaultWatchersLabel: `Modified ${lang.platformApprovalFlow.defaultWatchersLabel}`
                    }
                })
            );

            const result = patchedObj(FD_LANGUAGE_ENGLISH, patchFn);

            expect(patchFn).toHaveBeenCalledWith(FD_LANGUAGE_ENGLISH);
            expect(patchFn).toHaveBeenCalledTimes(1);
            expect(result.platformApprovalFlow?.defaultWatchersLabel).toBe('Modified Watchers');
        });

        it('should handle empty patch object', () => {
            const patch: FdLanguagePatch = {};

            const result = patchedObj(FD_LANGUAGE_ENGLISH, patch);

            expect(result).toEqual({});
        });

        it('should handle nested patch objects', () => {
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    defaultWatchersLabel: 'Nested Custom',
                    defaultTitle: 'Nested Title'
                }
            };

            const result = patchedObj(FD_LANGUAGE_ENGLISH, patch);

            expect(result.platformApprovalFlow?.defaultWatchersLabel).toBe('Nested Custom');
            expect(result.platformApprovalFlow?.defaultTitle).toBe('Nested Title');
        });

        it('should handle function patch that uses original language values', () => {
            const patchFn = (lang: FdLanguage): FdLanguagePatch => ({
                platformApprovalFlow: {
                    // Use original value
                    defaultWatchersLabel: lang.platformApprovalFlow.defaultWatchersLabel.toUpperCase()
                }
            });

            const result = patchedObj(FD_LANGUAGE_ENGLISH, patchFn);

            expect(result.platformApprovalFlow?.defaultWatchersLabel).toBe('WATCHERS');
        });
    });

    describe('patchLanguage provider', () => {
        it('should return a FactoryProvider with correct structure', () => {
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    defaultWatchersLabel: 'Provider Test'
                }
            };

            const provider = patchLanguage(patch);

            expect(provider.provide).toBe(FD_LANGUAGE_SIGNAL);
            expect(provider.useFactory).toBeDefined();
            expect(typeof provider.useFactory).toBe('function');
            expect(provider.deps).toBeDefined();
            expect(Array.isArray(provider.deps)).toBe(true);
        });

        it('should patch language with static object', () => {
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    defaultWatchersLabel: 'Patched Watchers'
                }
            };

            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true,
                providers: [patchLanguage(patch)]
            })
            class TestComponent {}

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE_SIGNAL,
                        useValue: langSignal
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const patchedLangSignal = fixture.debugElement.injector.get(FD_LANGUAGE_SIGNAL);

            const language = patchedLangSignal();

            expect(language.platformApprovalFlow.defaultWatchersLabel).toBe('Patched Watchers');
            // Other values should remain
            expect(language.platformApprovalFlow.defaultTitle).toBe('Approval process');
        });

        it('should patch language with function', () => {
            const patchFn = (lang: FdLanguage): FdLanguagePatch => ({
                platformApprovalFlow: {
                    defaultWatchersLabel: `${lang.platformApprovalFlow.defaultWatchersLabel} (Modified)`
                }
            });

            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true,
                providers: [patchLanguage(patchFn)]
            })
            class TestComponent {}

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE_SIGNAL,
                        useValue: langSignal
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const patchedLangSignal = fixture.debugElement.injector.get(FD_LANGUAGE_SIGNAL);

            const language = patchedLangSignal();

            expect(language.platformApprovalFlow.defaultWatchersLabel).toBe('Watchers (Modified)');
        });

        it('should react to parent language changes', () => {
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    defaultWatchersLabel: 'Always Patched'
                }
            };

            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true,
                providers: [patchLanguage(patch)]
            })
            class TestComponent {}

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE_SIGNAL,
                        useValue: langSignal
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const patchedLangSignal = fixture.debugElement.injector.get(FD_LANGUAGE_SIGNAL);

            // Initial value
            expect(patchedLangSignal().platformApprovalFlow.defaultWatchersLabel).toBe('Always Patched');

            // Change parent language
            langSignal.set({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    defaultTitle: 'Changed Title'
                }
            });

            // Should reactively update with patch applied
            fixture.detectChanges();
            expect(patchedLangSignal().platformApprovalFlow.defaultWatchersLabel).toBe('Always Patched');
            expect(patchedLangSignal().platformApprovalFlow.defaultTitle).toBe('Changed Title');
        });

        it('should not mutate original language object', () => {
            const originalLabel = FD_LANGUAGE_ENGLISH.platformApprovalFlow.defaultWatchersLabel;
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    defaultWatchersLabel: 'Mutated?'
                }
            };

            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true,
                providers: [patchLanguage(patch)]
            })
            class TestComponent {}

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE_SIGNAL,
                        useValue: langSignal
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const patchedLangSignal = fixture.debugElement.injector.get(FD_LANGUAGE_SIGNAL);

            patchedLangSignal();

            // Original should be unchanged
            expect(FD_LANGUAGE_ENGLISH.platformApprovalFlow.defaultWatchersLabel).toBe(originalLabel);
        });

        it('should handle partial patches without losing other translations', () => {
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    defaultWatchersLabel: 'Only This Changed'
                    // defaultTitle is NOT patched
                }
            };

            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true,
                providers: [patchLanguage(patch)]
            })
            class TestComponent {}

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE_SIGNAL,
                        useValue: langSignal
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const patchedLangSignal = fixture.debugElement.injector.get(FD_LANGUAGE_SIGNAL);

            const language = patchedLangSignal();

            // Patched value
            expect(language.platformApprovalFlow.defaultWatchersLabel).toBe('Only This Changed');
            // Original value preserved
            expect(language.platformApprovalFlow.defaultTitle).toBe('Approval process');
            // Deep nested value preserved
            expect(language.platformApprovalFlow.nextButtonAriaLabel).toBe('Go to next slide');
        });

        it('should handle function values in patch', () => {
            const customFn = jest.fn((params) => `Custom count: ${params.count}`);
            const patch: FdLanguagePatch = {
                platformApprovalFlow: {
                    nodeMembersCount: customFn
                }
            };

            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true,
                providers: [patchLanguage(patch)]
            })
            class TestComponent {}

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE_SIGNAL,
                        useValue: langSignal
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const patchedLangSignal = fixture.debugElement.injector.get(FD_LANGUAGE_SIGNAL);

            const language = patchedLangSignal();

            // Function should be callable
            const result = (language.platformApprovalFlow.nodeMembersCount as any)({ count: 42 });
            expect(result).toBe('Custom count: 42');
            expect(customFn).toHaveBeenCalledWith({ count: 42 });
        });
    });
});
