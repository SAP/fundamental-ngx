import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component, Type, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarMiddleDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogButtonClass, DialogFooterComponent } from './dialog-footer.component';

@Component({
    template: `
        <fd-dialog-footer>
            <ng-template fdkTemplate="footer">
                <div fd-bar-middle>
                    <button>Custom button</button>
                </div>
            </ng-template>
        </fd-dialog-footer>
    `,
    imports: [DialogFooterComponent, TemplateDirective, BarMiddleDirective, ButtonBarComponent]
})
class CustomFooterTestComponent {
    dialogFooterRef = viewChild.required(DialogFooterComponent);
}

@Component({
    template: `
        <fd-dialog-footer>
            <fd-button-bar label="Default button">Default button</fd-button-bar>
        </fd-dialog-footer>
    `,
    imports: [DialogFooterComponent, BarMiddleDirective, ButtonBarComponent]
})
class DefaultFooterTestComponent {
    dialogFooterRef = viewChild.required(DialogFooterComponent);
}

@Component({
    template: `
        <fd-dialog-footer [role]="customRole" [ariaLabel]="customAriaLabel">
            <fd-button-bar label="Custom button">Custom button</fd-button-bar>
        </fd-dialog-footer>
    `,
    imports: [DialogFooterComponent, ButtonBarComponent]
})
class CustomAttributesFooterTestComponent {
    dialogFooterRef = viewChild.required(DialogFooterComponent);
    customRole = 'contentinfo';
    customAriaLabel = 'Custom footer label';
}

describe('DialogFooterComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CustomFooterTestComponent, DefaultFooterTestComponent, CustomAttributesFooterTestComponent],
            providers: [DialogConfig]
        }).overrideComponent(DialogFooterComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Eager
            }
        });
    }));

    function setup<V>(testComponent): { fixture: ComponentFixture<V>; component: V } {
        const fixture = TestBed.createComponent(testComponent as any as Type<V>);
        const component = fixture.componentInstance;

        return { fixture, component };
    }

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', async () => {
        const { fixture, component } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);

        await wait(fixture);

        expect(component).toBeTruthy();
        expect(component.dialogFooterRef()).toBeTruthy();
    });

    it('should use default template', async () => {
        const { fixture } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);
        await wait(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(button.textContent).toContain('Default button');
    });

    it('should add class to buttons in default template', async () => {
        const { fixture } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);
        await wait(fixture);

        const dialogComponent = fixture.componentInstance.dialogFooterRef();

        dialogComponent.ngAfterViewInit();

        fixture.detectChanges();

        const buttonBars = dialogComponent.buttons();
        const buttonComponent = buttonBars[0]?.buttonComponent();
        const buttonElement = buttonComponent?.elementRef.nativeElement;

        expect(buttonElement?.classList.contains(DialogButtonClass)).toBeTruthy();
    });

    it('should use custom template', async () => {
        const { fixture, component } = setup<CustomFooterTestComponent>(CustomFooterTestComponent);
        await wait(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(component.dialogFooterRef().customTemplates().length).toEqual(1);
        expect(button.textContent).toContain('Custom button');
    });

    it('should have default role attribute', async () => {
        const { fixture } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);
        await wait(fixture);

        const footerElement = fixture.debugElement.query(By.directive(DialogFooterComponent)).nativeElement;
        expect(footerElement.getAttribute('role')).toBe('region');
    });

    it('should allow custom role attribute', async () => {
        const { fixture } = setup<CustomAttributesFooterTestComponent>(CustomAttributesFooterTestComponent);
        await wait(fixture);

        const footerElement = fixture.debugElement.query(By.directive(DialogFooterComponent)).nativeElement;
        expect(footerElement.getAttribute('role')).toBe('contentinfo');
    });

    it('should have default aria-label from translation', async () => {
        const { fixture } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);
        await wait(fixture);

        const footerElement = fixture.debugElement.query(By.directive(DialogFooterComponent)).nativeElement;
        expect(footerElement.getAttribute('aria-label')).toBe('Footer');
    });

    it('should allow custom aria-label', async () => {
        const { fixture } = setup<CustomAttributesFooterTestComponent>(CustomAttributesFooterTestComponent);
        await wait(fixture);

        const footerElement = fixture.debugElement.query(By.directive(DialogFooterComponent)).nativeElement;
        expect(footerElement.getAttribute('aria-label')).toBe('Custom footer label');
    });
});
