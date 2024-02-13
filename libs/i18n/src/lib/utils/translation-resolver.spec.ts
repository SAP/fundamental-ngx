import { FdLanguageKeyArgs } from '../models';
import { TranslationResolver } from './translation-resolver';

describe('TranslationResolver', () => {
    let resolver: TranslationResolver;
    const lang: any = {
        something: 'double braces {{here}}',
        internalRef: 'here',
        testWithInternalReference: '{@@internalRef} is here',
        testWithMultipleInternalReferences: 'Number 1 {@@testWithInternalReference} and {@@internalRef} is here',
        testWithMultipleInternalReferencesAndContext: '{content} { @@testWithInternalReference } and { @@internalRef }',
        contextualized: '{ content }',
        pluralization: 'test {count, plural, =1 {one item} other {# items} }',
        internalRefWithContext: 'context is "{content}"',
        testWithInternalReferenceAndContext: '{@@internalRefWithContext} right here',
        parent: {
            child: 'child',
            withInternalRef: '{@@parent.child}'
        },
        internalRefInIcu: 'test {count, plural, =1 {one item {@@internalRef}} other {# items {@@internalRef}} }'
    };
    const resolve = (key: any, args?: FdLanguageKeyArgs): string => resolver.resolve(lang, key, args);
    beforeEach(() => {
        resolver = new TranslationResolver();
    });
    it('should resolve internal references', () => {
        expect(resolve('testWithInternalReference')).toBe('here is here');
    });
    it('should resolve multiple levels of internal references', () => {
        expect(resolve('testWithMultipleInternalReferences')).toBe('Number 1 here is here and here is here');
    });
    it('should respect context', () => {
        expect(resolve('contextualized', { content: 'test' })).toBe('test');
    });
    it('should resolve multiple internal references and context at the same time', () => {
        expect(resolve('testWithMultipleInternalReferencesAndContext', { content: 'test' })).toBe(
            'test here is here and here'
        );
    });
    it('should resolve pluralization', () => {
        expect(resolve('pluralization', { count: 1 })).toBe('test one item');
        expect(resolve('pluralization', { count: 2 })).toBe('test 2 items');
    });
    it('should throw error when no context is provided to the contextualized key', () => {
        expect(() => resolve('contextualized')).toThrow();
    });
    it('should throw when context does not match the required type', () => {
        expect(() => resolve('contextualized', { wrongNameForContent: 5 as any })).toThrow();
    });
    it('should pass down context to the internal references', () => {
        expect(resolve('testWithInternalReferenceAndContext', { content: 'test' })).toBe(
            'context is "test" right here'
        );
    });
    it('should resolve nested keys', () => {
        expect(resolve('parent.child')).toBe('child');
    });
    it('should resolve internal references in nested keys', () => {
        expect(resolve('parent.withInternalRef')).toBe('child');
    });
    it('should resolve internal references in ICU', () => {
        expect(resolve('internalRefInIcu', { count: 2 })).toBe('test 2 items here');
        expect(resolve('internalRefInIcu', { count: 1 })).toBe('test one item here');
    });
});
