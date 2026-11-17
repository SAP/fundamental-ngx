import { SearchHighlightPipe } from './search-highlight.pipe';

describe('SearchHighlightPipe', () => {
    let pipe: SearchHighlightPipe;

    /** Renders the pipe output the same way `[innerHTML]` does and returns the text and the highlighted part. */
    function render(html: string): { text: string; highlighted: string | null } {
        const container = document.createElement('div');
        container.innerHTML = html;
        return {
            text: container.textContent ?? '',
            highlighted: container.querySelector('strong')?.textContent ?? null
        };
    }

    beforeEach(() => {
        pipe = new SearchHighlightPipe();
    });

    it('should highlight the first case-insensitive match of the search term', () => {
        expect(pipe.transform('Apple Pie', 'pie')).toBe('Apple <strong>Pie</strong>');
    });

    it('should escape HTML in the value', () => {
        expect(pipe.transform('<b>Bold</b>', 'bold')).toBe('&lt;b&gt;<strong>Bold</strong>&lt;/b&gt;');
    });

    it('should highlight a search term that contains HTML special characters', () => {
        const result = render(pipe.transform('Research & Development', '& dev'));

        expect(result.text).toBe('Research & Development');
        expect(result.highlighted).toBe('& Dev');
    });

    it('should not highlight inside an escaped character when the term matches the entity name', () => {
        const result = render(pipe.transform('Sales & Marketing', 'm'));

        expect(result.text).toBe('Sales & Marketing');
        expect(result.highlighted).toBe('M');
    });

    it('should not break "<" and ">" when the term matches "lt" or "gt"', () => {
        expect(render(pipe.transform('a < b', 'l')).text).toBe('a < b');
        expect(render(pipe.transform('x > y (gt)', 'gt'))).toEqual({ text: 'x > y (gt)', highlighted: 'gt' });
    });

    it('should return the escaped value when the term is not found', () => {
        expect(pipe.transform('Q&A', 'xyz')).toBe('Q&amp;A');
    });

    it('should return the escaped value when highlighting is not active', () => {
        expect(pipe.transform('Sales & Marketing', 'm', false)).toBe('Sales &amp; Marketing');
    });

    it('should wrap the result in a span when includeSpans is set', () => {
        expect(pipe.transform('Apple', 'app', true, true)).toBe('<span><strong>App</strong>le</span>');
    });
});
