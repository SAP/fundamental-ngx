import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component, Type, ViewChild } from '@angular/core';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
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
    imports: [DialogFooterComponent, TemplateDirective, BarModule]
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
    imports: [DialogFooterComponent, BarModule]
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

    it('should display in mobile mode', async () => {
        const { fixture, component } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);

        await wait(fixture);

        component.dialogFooterRef.dialogConfig.mobile = true;
        component.dialogFooterRef.dialogConfig.contentDensity = ContentDensityMode.COZY;

        await wait(fixture);
        const footerEl = fixture.nativeElement.querySelector('footer');

        expect(footerEl.classList).toContain('fd-dialog__footer');
        expect(footerEl.classList).toContain('is-cozy');
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

        const buttonClassNames = dialogComponent.buttons.first._buttonComponent.class;

        expect(buttonClassNames.includes(DialogButtonClass)).toBeTruthy();
    });

    it('should use custom template', async () => {
        const { fixture, component } = setup<CustomFooterTestComponent>(CustomFooterTestComponent);
        await wait(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(component.dialogFooterRef.customTemplates.length).toEqual(1);
        expect(button.textContent).toContain('Custom button');
    });
});
