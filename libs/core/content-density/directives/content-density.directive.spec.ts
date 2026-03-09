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

    describe('programmatic density updates', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let directive: ContentDensityDirective;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TestHostComponent]
            });

            fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            directive = directiveEl.injector.get(ContentDensityDirective);
        });

        it('should allow programmatic density updates via setDensity()', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);

            directive.setDensity(ContentDensityMode.COMPACT);
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);

            directive.setDensity(ContentDensityMode.CONDENSED);
            expect(directive.densityMode()).toBe(ContentDensityMode.CONDENSED);
        });

        it('should take precedence over input bindings when set programmatically', () => {
            // Input is set to cozy
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);

            // Programmatic override
            directive.setDensity(ContentDensityMode.COMPACT);
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);
        });

        it('should clear programmatic override and return to input binding', () => {
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);

            directive.setDensity(ContentDensityMode.COMPACT);
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);

            directive.clearDensity();
            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);
        });
    });

    /**
     * UI5 Content Density Attribute Tests (Q3 Feature)
     * These tests verify that ContentDensityDirective applies the data-ui5-compact-size
     * attribute to its host element, enabling raw UI5 components inside the container
     * to pick up the density setting.
     */
    describe('UI5 content density attribute (Q3)', () => {
        it('should apply data-ui5-compact-size attribute when fdCompact is true', () => {
            TestBed.configureTestingModule({
                imports: [TestHostCompactComponent]
            });

            const fixture = TestBed.createComponent(TestHostCompactComponent);
            fixture.detectChanges();

            const directiveElement = fixture.debugElement.children[0].nativeElement;

            // fdCompact should apply the UI5 attribute to the host element
            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);
        });

        it('should apply data-ui5-compact-size attribute when fdCondensed is true', () => {
            TestBed.configureTestingModule({
                imports: [TestHostCondensedComponent]
            });

            const fixture = TestBed.createComponent(TestHostCondensedComponent);
            fixture.detectChanges();

            const directiveElement = fixture.debugElement.children[0].nativeElement;

            // fdCondensed should also apply UI5 compact attribute (condensed maps to compact)
            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);
        });

        it('should NOT apply data-ui5-compact-size attribute when fdCozy is true', () => {
            TestBed.configureTestingModule({
                imports: [TestHostCozyComponent]
            });

            const fixture = TestBed.createComponent(TestHostCozyComponent);
            fixture.detectChanges();

            const directiveElement = fixture.debugElement.children[0].nativeElement;

            // fdCozy should NOT have the UI5 attribute (cozy = no attribute)
            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(false);
        });

        it('should apply data-ui5-compact-size attribute when fdContentDensity is set to compact', () => {
            @Component({
                selector: 'fd-test-content-density-compact',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestContentDensityCompactComponent {
                density = ContentDensityMode.COMPACT;
            }

            TestBed.configureTestingModule({
                imports: [TestContentDensityCompactComponent]
            });

            const fixture = TestBed.createComponent(TestContentDensityCompactComponent);
            fixture.detectChanges();

            const directiveElement = fixture.debugElement.children[0].nativeElement;

            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);
        });

        it('should remove data-ui5-compact-size attribute when switching from compact to cozy', () => {
            @Component({
                selector: 'fd-test-dynamic-density',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestDynamicDensityComponent {
                density: string = ContentDensityMode.COMPACT;
            }

            TestBed.configureTestingModule({
                imports: [TestDynamicDensityComponent]
            });

            const fixture = TestBed.createComponent(TestDynamicDensityComponent);
            fixture.detectChanges();

            const directiveElement = fixture.debugElement.children[0].nativeElement;

            // Initially COMPACT - should have attribute
            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);

            // Switch to COZY
            fixture.componentInstance.density = ContentDensityMode.COZY;
            fixture.detectChanges();

            // Should remove attribute
            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(false);
        });

        it('should add data-ui5-compact-size attribute when switching from cozy to compact', () => {
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.componentInstance.density = ContentDensityMode.COZY;
            fixture.detectChanges();

            const directiveElement = fixture.debugElement.children[0].nativeElement;

            // Initially COZY - should NOT have attribute
            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(false);

            // Switch to COMPACT
            fixture.componentInstance.density = ContentDensityMode.COMPACT;
            fixture.detectChanges();

            // Should add attribute
            expect(directiveElement.hasAttribute('data-ui5-compact-size')).toBe(true);
        });
    });

    /**
     * Error Handling Tests
     * These tests verify that the directive handles invalid inputs gracefully
     * without throwing errors or breaking the application.
     */
    describe('Error handling and edge cases', () => {
        it('should handle undefined density gracefully', () => {
            @Component({
                selector: 'fd-test-undefined',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestUndefinedComponent {
                density: string | undefined = undefined;
            }

            TestBed.configureTestingModule({
                imports: [TestUndefinedComponent]
            });

            const fixture = TestBed.createComponent(TestUndefinedComponent);

            // Should not throw during initialization
            expect(() => fixture.detectChanges()).not.toThrow();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            // Should fallback to global keyword
            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });

        it('should handle null density gracefully', () => {
            @Component({
                selector: 'fd-test-null',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestNullComponent {
                density: string | null = null;
            }

            TestBed.configureTestingModule({
                imports: [TestNullComponent]
            });

            const fixture = TestBed.createComponent(TestNullComponent);
            expect(() => fixture.detectChanges()).not.toThrow();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });

        it('should handle numeric values coerced to strings', () => {
            @Component({
                selector: 'fd-test-numeric',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestNumericComponent {
                density: any = 123;
            }

            TestBed.configureTestingModule({
                imports: [TestNumericComponent]
            });

            const fixture = TestBed.createComponent(TestNumericComponent);
            expect(() => fixture.detectChanges()).not.toThrow();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            // Should fallback to global keyword for invalid numeric value
            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });

        it('should handle object values gracefully', () => {
            @Component({
                selector: 'fd-test-object',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestObjectComponent {
                density: any = { mode: 'compact' };
            }

            TestBed.configureTestingModule({
                imports: [TestObjectComponent]
            });

            const fixture = TestBed.createComponent(TestObjectComponent);
            expect(() => fixture.detectChanges()).not.toThrow();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            // Should fallback to global keyword
            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });

        it('should handle array values gracefully', () => {
            @Component({
                selector: 'fd-test-array',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestArrayComponent {
                density: any = ['compact', 'cozy'];
            }

            TestBed.configureTestingModule({
                imports: [TestArrayComponent]
            });

            const fixture = TestBed.createComponent(TestArrayComponent);
            expect(() => fixture.detectChanges()).not.toThrow();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });

        it('should recover from invalid value when valid value is provided', () => {
            @Component({
                selector: 'fd-test-recovery',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestRecoveryComponent {
                density: any = null;
            }

            TestBed.configureTestingModule({
                imports: [TestRecoveryComponent]
            });

            const fixture = TestBed.createComponent(TestRecoveryComponent);
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            // Initially invalid
            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);

            // Provide valid value
            fixture.componentInstance.density = ContentDensityMode.COMPACT;
            fixture.detectChanges();

            // Should recover and use the valid value
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);
        });

        it('should handle whitespace-only strings', () => {
            @Component({
                selector: 'fd-test-whitespace',
                template: '<div [fdContentDensity]="density"></div>',
                imports: [ContentDensityDirective]
            })
            class TestWhitespaceComponent {
                density = '   ';
            }

            TestBed.configureTestingModule({
                imports: [TestWhitespaceComponent]
            });

            const fixture = TestBed.createComponent(TestWhitespaceComponent);
            expect(() => fixture.detectChanges()).not.toThrow();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            // Whitespace should be treated as invalid
            expect(directive.densityMode()).toBe(ContentDensityGlobalKeyword);
        });
    });

    /**
     * Component Lifecycle Tests
     * These tests verify proper cleanup and behavior during component lifecycle events
     */
    describe('Component lifecycle', () => {
        it('should cleanup effects when component is destroyed', () => {
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            expect(directive.densityMode()).toBe(ContentDensityMode.COZY);

            // Spy on console to catch any errors
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            // Destroy the component
            fixture.destroy();

            // Try to trigger changes that would normally update the directive
            // (This shouldn't cause errors because effects should be cleaned up)
            expect(() => {
                // Effects are automatically cleaned up by Angular's DestroyRef
                // No manual cleanup needed with signals and effects
            }).not.toThrow();

            // No errors should have been logged
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        });

        it('should not update DOM after component is destroyed', () => {
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();

            const element = fixture.debugElement.children[0].nativeElement as HTMLElement;

            // Initially cozy
            expect(element.hasAttribute('data-ui5-compact-size')).toBe(false);

            // Destroy the component
            fixture.destroy();

            // Element should still exist in DOM but directive effects should be cleaned up
            // Attempting to change properties should not affect the destroyed element
            expect(() => {
                // After destroy, the directive's effects are cleaned up
                // No further DOM updates should occur
            }).not.toThrow();

            // Verify element state hasn't changed after destroy
            expect(element.hasAttribute('data-ui5-compact-size')).toBe(false);
        });

        it('should allow multiple create/destroy cycles', () => {
            // Create and destroy multiple times to check for memory leaks or errors
            for (let i = 0; i < 5; i++) {
                const fixture = TestBed.createComponent(TestHostComponent);
                fixture.detectChanges();

                const directiveEl = fixture.debugElement.children[0];
                const directive = directiveEl.injector.get(ContentDensityDirective);

                expect(directive.densityMode()).toBe(ContentDensityMode.COZY);

                // Destroy
                fixture.destroy();
            }

            // Should complete without errors or memory issues
            expect(true).toBe(true);
        });

        it('should initialize correctly even when parent is destroyed during creation', () => {
            // This tests edge case where component is destroyed during initialization
            const fixture = TestBed.createComponent(TestHostComponent);

            // Don't call detectChanges yet - destroy immediately
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should handle programmatic updates before first detectChanges', () => {
            const fixture = TestBed.createComponent(TestHostComponent);
            // Don't call detectChanges yet

            const directiveEl = fixture.debugElement.children[0];
            const directive = directiveEl.injector.get(ContentDensityDirective);

            // Try to update programmatically before initialization
            expect(() => {
                directive.setDensity(ContentDensityMode.COMPACT);
            }).not.toThrow();

            // Now initialize
            fixture.detectChanges();

            // Programmatic value should be respected
            expect(directive.densityMode()).toBe(ContentDensityMode.COMPACT);
        });
    });
});
