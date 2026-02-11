import { Component, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarMiddleDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { whenStable } from '@fundamental-ngx/core/tests';
import { MessageBoxConfig, MessageBoxHost } from '../utils/message-box-config.class';
import { MessageBoxButtonClass, MessageBoxFooterComponent } from './message-box-footer.component';

@Component({
    template: `
        <fd-message-box-footer>
            <ng-template fdkTemplate="footer">
                <div fd-bar-middle>
                    <button>Custom button</button>
                </div>
            </ng-template>
        </fd-message-box-footer>
    `,
    standalone: true,
    imports: [MessageBoxFooterComponent, BarMiddleDirective, TemplateDirective]
})
class CustomFooterTestComponent {
    @ViewChild(MessageBoxFooterComponent) messageBoxFooter: MessageBoxFooterComponent;
}

@Component({
    template: `
        <fd-message-box-footer>
            <fd-button-bar label="Default button">Default button</fd-button-bar>
        </fd-message-box-footer>
    `,
    standalone: true,
    imports: [MessageBoxFooterComponent, ButtonBarComponent]
})
class DefaultFooterTestComponent {
    @ViewChild(MessageBoxFooterComponent) messageBoxFooter: MessageBoxFooterComponent;
}

describe('MessageBoxFooterComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CustomFooterTestComponent, DefaultFooterTestComponent],
            providers: [{ provide: MessageBoxHost, useValue: { _messageBoxConfig: new MessageBoxConfig() } }]
        });
    }));

    function setup<V>(testComponent): { fixture: ComponentFixture<V>; component: V } {
        const fixture = TestBed.createComponent(testComponent as any as Type<V>);
        const component = fixture.componentInstance;

        return { fixture, component };
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

        expect(footerEl.classList).toContain('fd-message-box__footer');
        expect(footerEl.classList).toContain('is-cozy');
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

        const buttonComponent = dialogComponent.buttons.first.buttonComponent();
        const buttonElement = buttonComponent?.elementRef.nativeElement;

        expect(buttonElement?.classList.contains(MessageBoxButtonClass)).toBeTruthy();
    });

    it('should use custom template', async () => {
        const { fixture, component } = setup<CustomFooterTestComponent>(CustomFooterTestComponent);
        await whenStable(fixture);

        const button = fixture.nativeElement.querySelector('button');

        expect(component.messageBoxFooter.customTemplates.length).toEqual(1);
        expect(button.textContent).toContain('Custom button');
    });
});
