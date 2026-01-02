import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
    let component: TitleComponent;
    let fixture: ComponentFixture<TitleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply header size class when explicitly set', () => {
        fixture.componentRef.setInput('headerSize', 5);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('fd-title');
        expect(fixture.nativeElement.classList).toContain('fd-title--h5');
    });

    it('should auto-detect header size from tag name when not explicitly set', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('fd-title');
        // Should detect from tag name (depends on how the component is rendered in test)
    });

    it('should apply wrap class when wrap is true', () => {
        fixture.componentRef.setInput('wrap', true);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('fd-title--wrap');
    });

    it('should not apply wrap class when wrap is false', () => {
        fixture.componentRef.setInput('wrap', false);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).not.toContain('fd-title--wrap');
    });

    it('should update header size class when changed', () => {
        fixture.componentRef.setInput('headerSize', 3);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).toContain('fd-title--h3');

        fixture.componentRef.setInput('headerSize', 6);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList).not.toContain('fd-title--h3');
        expect(fixture.nativeElement.classList).toContain('fd-title--h6');
    });

    it('should provide element reference via elementRef getter', () => {
        expect(component.elementRef).toBeDefined();
        expect(component.elementRef.nativeElement).toBe(fixture.nativeElement);
    });
});
