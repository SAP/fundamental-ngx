import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentDensityGlobalKeyword } from '../content-density.types';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
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
    template: '<div [fdCompact]="isCompact"></div>',
    imports: [ContentDensityDirective]
})
class TestHostCompactComponent {
    isCompact = true;
}

@Component({
    selector: 'fd-test-host-condensed',
    template: '<div [fdCondensed]="isCondensed"></div>',
    imports: [ContentDensityDirective]
})
class TestHostCondensedComponent {
    isCondensed = true;
}

@Component({
    selector: 'fd-test-host-cozy',
    template: '<div [fdCozy]="isCozy"></div>',
    imports: [ContentDensityDirective]
})
class TestHostCozyComponent {
    isCozy = true;
}

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
        let component: TestHostCompactComponent;
        let directive: ContentDensityDirective;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestHostCompactComponent]
            });

            fixture = TestBed.createComponent(TestHostCompactComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            directive = directiveEl.injector.get(ContentDensityDirective);
        });

        it('should set compact density when fdCompact is true', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);
        });

        it('should reset to global keyword when fdCompact is set to false', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);

            component.isCompact = false;
            fixture.detectChanges();

            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });
    });

    describe('fdCondensed input', () => {
        let fixture: ComponentFixture<TestHostCondensedComponent>;
        let component: TestHostCondensedComponent;
        let directive: ContentDensityDirective;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestHostCondensedComponent]
            });

            fixture = TestBed.createComponent(TestHostCondensedComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            directive = directiveEl.injector.get(ContentDensityDirective);
        });

        it('should set condensed density when fdCondensed is true', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.CONDENSED);
        });

        it('should reset to global keyword when fdCondensed is set to false', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.CONDENSED);

            component.isCondensed = false;
            fixture.detectChanges();

            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });
    });

    describe('fdCozy input', () => {
        let fixture: ComponentFixture<TestHostCozyComponent>;
        let component: TestHostCozyComponent;
        let directive: ContentDensityDirective;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestHostCozyComponent]
            });

            fixture = TestBed.createComponent(TestHostCozyComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            directive = directiveEl.injector.get(ContentDensityDirective);
        });

        it('should set cozy density when fdCozy is true', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);
        });

        it('should reset to global keyword when fdCozy is set to false', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);

            component.isCozy = false;
            fixture.detectChanges();

            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });
    });

    describe('empty string handling', () => {
        it('should treat empty string as global keyword without warning', () => {
            @Component({
                selector: 'fd-test-empty',
                template: '<div fdContentDensity=""></div>',
                imports: [ContentDensityDirective]
            })
            class TestHostEmptyComponent {}

            TestBed.configureTestingModule({
                imports: [TestHostEmptyComponent]
            });

            const fixture = TestBed.createComponent(TestHostEmptyComponent);
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });
    });

    describe('CONTENT_DENSITY_DIRECTIVE token', () => {
        it('should be injectable via CONTENT_DENSITY_DIRECTIVE token', () => {
            TestBed.configureTestingModule({
                imports: [TestHostComponent]
            });

            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            const injectedDirective = directiveEl.injector.get(CONTENT_DENSITY_DIRECTIVE);

            expect(injectedDirective).toBeTruthy();
            expect(injectedDirective.densityMode).toBeDefined();
            expect(typeof injectedDirective.densityMode).toBe('function');
        });
    });
});
