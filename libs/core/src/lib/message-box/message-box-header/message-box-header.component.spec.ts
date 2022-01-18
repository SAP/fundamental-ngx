import { Component, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarModule } from '@fundamental-ngx/core/bar';
import { MessageBoxConfig, MessageBoxHeaderComponent, MessageBoxModule } from '@fundamental-ngx/core/message-box';
import { whenStable } from '@fundamental-ngx/core/tests';

@Component({
    template: `
        <fd-message-box-header>
            <ng-template fdTemplate="header">
                <div fd-bar-right>
                    <fd-bar-element>
                        <button>Custom button</button>
                    </fd-bar-element>
                </div>
            </ng-template>
            <ng-template fdTemplate="subheader">
                <div fd-bar-middle>
                    <fd-bar-element>
                        <input id="customInput" />
                    </fd-bar-element>
                </div>
            </ng-template>
        </fd-message-box-header>
    `
})
class CustomHeaderTestComponent {
    @ViewChild(MessageBoxHeaderComponent) messageBoxHeader: MessageBoxHeaderComponent;
}

@Component({
    template: `
        <fd-message-box-header>
            <h1 fd-title>Default Title</h1>
        </fd-message-box-header>
    `
})
class DefaultHeaderTestComponent {
    @ViewChild(MessageBoxHeaderComponent) messageBoxHeader: MessageBoxHeaderComponent;
}

describe('MessageBoxHeaderComponent', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [BarModule, MessageBoxModule],
                declarations: [CustomHeaderTestComponent, DefaultHeaderTestComponent],
                providers: [{ provide: MessageBoxConfig, useValue: { ...new MessageBoxConfig(), mobile: true } }]
            }).compileComponents();
        })
    );

    function setup<V>(testComponent): { fixture: ComponentFixture<V>; component: V } {
        const fixture = TestBed.createComponent(testComponent as any as Type<V>);
        const component = fixture.componentInstance;

        return { fixture, component };
    }

    it('should create', async () => {
        const { fixture, component } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);

        await whenStable(fixture);

        expect(component).toBeTruthy();
        expect(component.messageBoxHeader).toBeTruthy();
    });

    it('should display in mobile mode', async () => {
        const { fixture } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);

        await whenStable(fixture);

        const headerEl = fixture.nativeElement.querySelector('.fd-bar');

        expect(headerEl).toHaveClass('fd-message-box__header');
        expect(headerEl).toHaveClass('fd-bar--cozy');
    });

    it('should use default template', async () => {
        const { fixture } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);
        await whenStable(fixture);

        const headerEl = fixture.nativeElement.querySelector('.fd-bar--header');

        expect(headerEl).toBeTruthy();
    });

    it('should use custom templates', async () => {
        const { fixture, component } = setup<CustomHeaderTestComponent>(CustomHeaderTestComponent);
        await whenStable(fixture);

        const headerEl = fixture.nativeElement.querySelector('.fd-bar--header-with-subheader');
        const subheaderEl = fixture.nativeElement.querySelector('.fd-bar--subheader');

        expect(headerEl).toBeTruthy();
        expect(subheaderEl).toBeTruthy();
        expect(component.messageBoxHeader.customTemplates.length).toEqual(2);

        const button = headerEl.querySelector('button');
        expect(button.textContent).toContain('Custom button');

        const input = subheaderEl.querySelector('input');
        expect(input.id).toContain('customInput');
    });
});
