import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentDensityGlobalKeyword } from '../content-density.types';
import { ContentDensityMode } from '../types/content-density.mode';
import { ContentDensityDirective } from './content-density.directive';

@Component({
    selector: 'fd-test-host',
    template: '<div [fdContentDensity]="density"></div>',
    imports: [ContentDensityDirective]
})
class TestHostComponent {
    density: string = ContentDensityMode.COZY;
}

@Component({
    selector: 'fd-test-host-compact',
    template: '<div fdCompact></div>',
    imports: [ContentDensityDirective]
})
class TestHostCompactComponent {}

describe('ContentDensityDirective', () => {
    describe('fdContentDensity input', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let component: TestHostComponent;
        let directive: ContentDensityDirective;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestHostComponent]
            });

            fixture = TestBed.createComponent(TestHostComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            directive = directiveEl.injector.get(ContentDensityDirective);
        });

        it('should be created', () => {
            expect(directive).toBeTruthy();
        });

        it('should have densityMode signal', () => {
            expect(directive.densityMode).toBeDefined();
            expect(typeof directive.densityMode).toBe('function');
        });

        it('should initialize with cozy density', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);
            expect(directive.value).toBe(ContentDensityMode.COZY);
        });

        it('should update density when input changes', () => {
            component.density = ContentDensityMode.COMPACT;
            fixture.detectChanges();

            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);
        });

        it('should fallback to global keyword for invalid values', () => {
            component.density = 'invalid-value';
            fixture.detectChanges();

            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });

        it('should update signal reactively when input changes', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);

            component.density = ContentDensityMode.CONDENSED;
            fixture.detectChanges();

            expect(directive.densityMode()).toBe(ContentDensityMode.CONDENSED);
        });
    });

    describe('fdCompact input', () => {
        let fixture: ComponentFixture<TestHostCompactComponent>;
        let directive: ContentDensityDirective;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestHostCompactComponent]
            });

            fixture = TestBed.createComponent(TestHostCompactComponent);
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            directive = directiveEl.injector.get(ContentDensityDirective);
        });

        it('should set compact density when fdCompact is used', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);
        });
    });
});
