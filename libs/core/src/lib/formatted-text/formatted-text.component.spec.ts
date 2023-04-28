import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormattedTextComponent } from './formatted-text.component';
import { HtmlSanitizer } from './utils/html-sanitizer';
import { Subject } from 'rxjs';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';

describe('FormattedTextComponent', () => {
    let component: FormattedTextComponent;
    let fixture: ComponentFixture<FormattedTextComponent>;
    const destroy$ = new Subject<void>();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormattedTextComponent],
            providers: [
                {
                    provide: DestroyedService,
                    useValue: destroy$
                }
            ]
        }).compileComponents();
        jest.spyOn<any, any>(HtmlSanitizer.prototype, '_supportsSandbox').mockReturnValue(true);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormattedTextComponent);
        fixture.autoDetectChanges(true);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        jest.restoreAllMocks();
        destroy$.next();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add height class and style height', () => {
        component.htmlText = 'Test embed code';
        component.height = '100px';
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-formatted-text-with-height')).toBeTruthy();
        expect(fixture.nativeElement.style.height).toEqual('100px');
    });

    it('should add width class and style width', () => {
        component.htmlText = 'Test embed code';
        component.width = '100px';
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-formatted-text-with-width')).toBeTruthy();
        expect(fixture.nativeElement.style.width).toEqual('100px');
    });

    it('should have expected html on render', () => {
        const embedCode = `Sample text
        <a>Tag text</a>
        <abbr>Tag text</abbr>
        <blockquote>Tag text</blockquote>
        <cite>Tag text</cite>
        <code>Tag text</code>
        <dl>
        <br>
        <dt>Tag text</dt>
        <dd>Tag text</dd>
        </dl>
        <em>Tag text</em>
        <h1>Tag text</h1>
        <h2>Tag text</h2>
        <h3>Tag text</h3>
        <h4>Tag text</h4>
        <h5>Tag text</h5>
        <h6>Tag text</h6>
        <p>Tag text</p>
        <pre>Tag text</pre>
        <strong>Tag text</strong>
        <span>Tag text</span>
        <u>Tag text</u>
        <ul>
        <li>Tag  text</li>
        </ul>
        <ol>
        <li>Tag text</li>
        </ol>`.replace(/\n|\r/gi, '');

        component.htmlText = embedCode;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual(embedCode);
    });

    it('should skip unsupported tags', () => {
        component.htmlText = `<p>Sample text</p><script>alert(1);</script><form>Sample form</form>`;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<p>Sample text</p>');
    });

    it('should skip unsupported attributes on tag', () => {
        component.htmlText = '<p class="test" style="color: red" href="http://www.sap.com">Sample text</p>';
        fixture.detectChanges();
        expect(fixture.nativeElement.innerHTML).toEqual('<p class="test" style="color: red">Sample text</p>');
    });
});
