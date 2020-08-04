import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFooterComponent } from './dialog-footer.component';
import { Component, Type, ViewChild } from '@angular/core';
import { BarModule } from '../../bar/bar.module';
import { TemplateModule } from '../../utils/directives/template/template.module';
import { DIALOG_CONFIG, DialogConfig } from '../dialog-utils/dialog-config.class';

@Component({
    template: `
        <fd-dialog-footer>
            <ng-template fdTemplate="footer">
                <div fd-bar-middle>
                    <button fd-dialog-decisive-button>Custom button</button>
                </div>
            </ng-template>
        </fd-dialog-footer>
    `
})
class CustomFooterTestComponent {
    @ViewChild(DialogFooterComponent) dialogFooterRef: DialogFooterComponent;
}

@Component({
    template: `
        <fd-dialog-footer>
            <button fd-dialog-decisive-button>Default button</button>
        </fd-dialog-footer>
    `
})
class DefaultFooterTestComponent {
    @ViewChild(DialogFooterComponent) dialogFooterRef: DialogFooterComponent;
}

describe('DialogFooterComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogFooterComponent, CustomFooterTestComponent, DefaultFooterTestComponent],
            imports: [BarModule, TemplateModule],
            providers: [{ provide: DIALOG_CONFIG, useClass: DialogConfig }]
        });
    }));

    function setup<V>(testComponent): { fixture: ComponentFixture<V>; component: V } {
        const fixture = TestBed.createComponent((testComponent as any) as Type<V>);
        const component = fixture.componentInstance;

        return { fixture: fixture, component: component };
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

        await wait(fixture);
        const footerEl = fixture.nativeElement.querySelector('footer');

        expect(footerEl).toHaveClass('fd-dialog__footer');
        expect(footerEl).toHaveClass('fd-bar--cosy');
    });

    it('should use default template', async () => {
        const { fixture } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);
        await wait(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(button.textContent).toContain('Default button');
    });

    it('should use custom template', async () => {
        const { fixture, component } = setup<CustomFooterTestComponent>(CustomFooterTestComponent);
        await wait(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(component.dialogFooterRef.customTemplates.length).toEqual(1);
        expect(button.textContent).toContain('Custom button');
    });
});
