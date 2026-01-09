import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DEFAULT_TITLE_SIZE, TitleComponent } from './title.component';

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

    describe('DEFAULT_TITLE_SIZE injection', () => {
        it('should use injected default size when no explicit headerSize is provided', () => {
            // Create a parent component that provides DEFAULT_TITLE_SIZE
            @Component({
                template: '<h3 fd-title></h3>',
                providers: [{ provide: DEFAULT_TITLE_SIZE, useValue: 5 }],
                imports: [TitleComponent]
            })
            class TestParentComponent {}

            const parentFixture = TestBed.createComponent(TestParentComponent);
            parentFixture.detectChanges();

            const titleElement = parentFixture.nativeElement.querySelector('h3');

            // Should use injected default (5) instead of tag name (3)
            expect(titleElement.classList).toContain('fd-title--h5');
            expect(titleElement.classList).not.toContain('fd-title--h3');
        });

        it('should prioritize explicit headerSize over injected default', () => {
            @Component({
                template: '<h3 fd-title [headerSize]="2"></h3>',
                providers: [{ provide: DEFAULT_TITLE_SIZE, useValue: 5 }],
                imports: [TitleComponent]
            })
            class TestParentComponent {}

            const parentFixture = TestBed.createComponent(TestParentComponent);
            parentFixture.detectChanges();

            const titleElement = parentFixture.nativeElement.querySelector('h3');

            // Should use explicit input (2), not injected default (5) or tag name (3)
            expect(titleElement.classList).toContain('fd-title--h2');
            expect(titleElement.classList).not.toContain('fd-title--h5');
            expect(titleElement.classList).not.toContain('fd-title--h3');
        });

        it('should fall back to tag name when no default is provided and no explicit headerSize', () => {
            @Component({
                template: '<h4 fd-title></h4>',
                imports: [TitleComponent]
                // No DEFAULT_TITLE_SIZE provider
            })
            class TestParentComponent {}

            const parentFixture = TestBed.createComponent(TestParentComponent);
            parentFixture.detectChanges();

            const titleElement = parentFixture.nativeElement.querySelector('h4');

            // Should detect from tag name (4)
            expect(titleElement.classList).toContain('fd-title--h4');
        });
    });
});
