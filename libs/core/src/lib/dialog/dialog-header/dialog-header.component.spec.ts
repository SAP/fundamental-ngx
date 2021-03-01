import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogHeaderComponent } from './dialog-header.component';
import { Component, Type, ViewChild } from '@angular/core';
import { DialogConfig } from '../utils/dialog-config.class';
import { TemplateModule } from '../../utils/directives/template/template.module';
import { BarModule } from '../../bar/bar.module';

@Component({
    template: `
        <fd-dialog-header>
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
        </fd-dialog-header>
    `
})
class CustomHeaderTestComponent {
    @ViewChild(DialogHeaderComponent) dialogHeaderRef: DialogHeaderComponent;
}

@Component({
    template: `
        <fd-dialog-header>
            <h1 fd-title>Default Title</h1>
            <button fd-dialog-close-button></button>
        </fd-dialog-header>
    `
})
class DefaultHeaderTestComponent {
    @ViewChild(DialogHeaderComponent) dialogHeaderRef: DialogHeaderComponent;
}

describe('DialogHeaderComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DialogHeaderComponent, CustomHeaderTestComponent, DefaultHeaderTestComponent],
            imports: [BarModule, TemplateModule],
            providers: [DialogConfig]
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
        const { fixture, component } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);

        await wait(fixture);

        expect(component).toBeTruthy();
        expect(component.dialogHeaderRef).toBeTruthy();
    });

    it('should display in mobile mode', async () => {
        const { fixture, component } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);

        await wait(fixture);

        component.dialogHeaderRef.dialogConfig.mobile = true;

        await wait(fixture);
        const footerEl = fixture.nativeElement.querySelector('header');

        expect(footerEl).toHaveClass('fd-dialog__header');
        expect(footerEl).toHaveClass('fd-bar--cozy');
    });

    it('should use default template', async () => {
        const { fixture } = setup<DefaultHeaderTestComponent>(DefaultHeaderTestComponent);
        await wait(fixture);

        const buttonEl = fixture.nativeElement.querySelector('[fd-dialog-close-button]');
        const headerEl = fixture.nativeElement.querySelector('.fd-bar--header');

        expect(buttonEl).toBeTruthy();
        expect(headerEl).toBeTruthy();
    });

    it('should use custom templates', async () => {
        const { fixture, component } = setup<CustomHeaderTestComponent>(CustomHeaderTestComponent);
        await wait(fixture);

        const headerEl = fixture.nativeElement.querySelector('.fd-bar--header-with-subheader');
        const subheaderEl = fixture.nativeElement.querySelector('.fd-bar--subheader');

        expect(headerEl).toBeTruthy();
        expect(subheaderEl).toBeTruthy();
        expect(component.dialogHeaderRef.customTemplates.length).toEqual(2);

        const button = headerEl.querySelector('button');
        expect(button.textContent).toContain('Custom button');

        const input = subheaderEl.querySelector('input');
        expect(input.id).toContain('customInput');
    });
});
