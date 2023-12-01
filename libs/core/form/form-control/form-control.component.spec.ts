import { Component, DebugElement, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    ContentDensityMode,
    ContentDensityModule,
    mockedLocalContentDensityDirective
} from '@fundamental-ngx/core/content-density';
import { FormControlComponent } from './form-control.component';

const { contentDensityDirectiveProvider, setContentDensity } = mockedLocalContentDensityDirective(
    ContentDensityMode.COMPACT
);

@Component({
    selector: 'fd-test-component',
    template: `
        <div fd-form-control="">FormControl</div>
        <textarea fd-form-control=""></textarea>
        <input fd-form-control="" />
    `,
    imports: [FormControlComponent, ContentDensityModule],
    providers: [contentDensityDirectiveProvider],
    standalone: true
})
export class TestComponent {
    @ViewChildren(FormControlComponent)
    controls: QueryList<FormControlComponent>;
}

describe('FormControlComponent', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent, debugElement: DebugElement;

    let directive, componentInstance;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(FormControlComponent));
        componentInstance = directive.injector.get(FormControlComponent);

        jest.spyOn(componentInstance, 'buildComponentCssClass');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        componentInstance.ngOnInit();
        expect(componentInstance.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should add appropriate classes', () => {
        componentInstance.ngOnChanges();
        expect(componentInstance.buildComponentCssClass).toHaveBeenCalled();

        component.controls.forEach((control) => {
            const tagName = control.elementRef.nativeElement.tagName.toLowerCase();
            if (tagName === 'input') {
                expect(control.elementRef.nativeElement.classList).toContain('fd-input');
                expect(control.elementRef.nativeElement.classList).not.toContain('fd-textarea');
            } else if (tagName === 'textarea') {
                expect(control.elementRef.nativeElement.classList).toContain('fd-textarea');
                expect(control.elementRef.nativeElement.classList).not.toContain('fd-input');
            } else {
                expect(control.elementRef.nativeElement.classList).not.toContain(['fd-input', 'fd-textarea']);
            }
        });
    });

    it('should be able to change the contentDensity to "compact"', async () => {
        setContentDensity(ContentDensityMode.COMPACT);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.debugElement.query(By.directive(FormControlComponent)).nativeElement.classList).toContain(
            'is-compact'
        );
    });
});
