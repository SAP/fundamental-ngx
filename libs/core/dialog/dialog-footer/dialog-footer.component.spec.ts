import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component, Type, ViewChild } from '@angular/core';
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
    standalone: true,
    imports: [DialogFooterComponent, TemplateDirective, BarMiddleDirective, ButtonBarComponent]
})
class CustomFooterTestComponent {
    @ViewChild(DialogFooterComponent) dialogFooterRef: DialogFooterComponent;
}

@Component({
    template: `
        <fd-dialog-footer>
            <fd-button-bar label="Default button">Default button</fd-button-bar>
        </fd-dialog-footer>
    `,
    standalone: true,
    imports: [DialogFooterComponent, BarMiddleDirective, ButtonBarComponent]
})
class DefaultFooterTestComponent {
    @ViewChild(DialogFooterComponent) dialogFooterRef: DialogFooterComponent;
}

describe('DialogFooterComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CustomFooterTestComponent, DefaultFooterTestComponent],
            providers: [DialogConfig]
        }).overrideComponent(DialogFooterComponent, {
            set: {
                changeDetection: ChangeDetectionStrategy.Default
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
        expect(component.dialogFooterRef).toBeTruthy();
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

        const dialogComponent = fixture.componentInstance.dialogFooterRef;

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

        expect(component.dialogFooterRef.customTemplates().length).toEqual(1);
        expect(button.textContent).toContain('Custom button');
    });
});
