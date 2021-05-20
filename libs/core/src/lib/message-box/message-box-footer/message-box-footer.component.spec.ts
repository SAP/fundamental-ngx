import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, Type, ViewChild } from '@angular/core';

import { TemplateModule } from '../../utils/directives/template/template.module';
import { MessageBoxFooterComponent, MessageBoxButtonClass } from './message-box-footer.component';
import { MessageBoxConfig } from '../utils/message-box-config.class';
import { BarModule } from '../../bar/bar.module';
import { whenStable } from '../../utils/tests';


@Component({
    template: `
        <fd-message-box-footer>
            <ng-template fdTemplate="footer">
                <div fd-bar-middle>
                    <button>Custom button</button>
                </div>
            </ng-template>
        </fd-message-box-footer>
    `
})
class CustomFooterTestComponent {
    @ViewChild(MessageBoxFooterComponent) messageBoxFooter: MessageBoxFooterComponent;
}

@Component({
    template: `
        <fd-message-box-footer>
            <fd-button-bar label="Default button">Default button</fd-button-bar>
        </fd-message-box-footer>
    `
})
class DefaultFooterTestComponent {
    @ViewChild(MessageBoxFooterComponent) messageBoxFooter: MessageBoxFooterComponent;
}

describe('MessageBoxFooterComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MessageBoxFooterComponent, CustomFooterTestComponent, DefaultFooterTestComponent],
            imports: [BarModule, TemplateModule],
            providers: [MessageBoxConfig]
        });
    }));

    function setup<V>(testComponent): { fixture: ComponentFixture<V>; component: V } {
        const fixture = TestBed.createComponent((testComponent as any) as Type<V>);
        const component = fixture.componentInstance;

        return { fixture: fixture, component: component };
    }

    it('should create', async () => {
        const { fixture, component } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);

        await whenStable(fixture);

        expect(component).toBeTruthy();
        expect(component.messageBoxFooter).toBeTruthy();
    });

    it('should display in mobile mode', async () => {
        const { fixture, component } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);

        await whenStable(fixture);

        component.messageBoxFooter.messageBoxConfig.mobile = true;

        await whenStable(fixture);
        const footerEl = fixture.nativeElement.querySelector('footer');

        expect(footerEl).toHaveClass('fd-message-box__footer');
        expect(footerEl).toHaveClass('fd-bar--cozy');
    });

    it('should use default template', async () => {
        const { fixture } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);
        await whenStable(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(button.textContent).toContain('Default button');
    });

    it('should add class to buttons in default template', async () => {
        const { fixture } = setup<DefaultFooterTestComponent>(DefaultFooterTestComponent);
        await whenStable(fixture);

        const dialogComponent = fixture.componentInstance.messageBoxFooter;

        dialogComponent.ngAfterViewInit();

        fixture.detectChanges();

        const buttonClassNames = dialogComponent.buttons.first._buttonComponent.class;

        expect(buttonClassNames.includes(MessageBoxButtonClass)).toBeTruthy();
    });

    it('should use custom template', async () => {
        const { fixture, component } = setup<CustomFooterTestComponent>(CustomFooterTestComponent);
        await whenStable(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(component.messageBoxFooter.customTemplates.length).toEqual(1);
        expect(button.textContent).toContain('Custom button');
    });
});
