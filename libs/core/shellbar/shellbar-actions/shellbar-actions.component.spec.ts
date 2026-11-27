import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ShellbarGroupFlexOptions } from '../model/shellbar-sizes';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarModule } from '../shellbar.module';
import { FD_SHELLBAR_COMPONENT } from '../tokens';
import { ShellbarActionsComponent } from './shellbar-actions.component';

export class ShellbarMock {
    groupFlex: ShellbarGroupFlexOptions = {
        actions: {
            shrink: true,
            flexBasisAuto: true
        }
    };
}

@Component({
    template: `
        <fd-shellbar-actions [assistiveTools]="assistiveTools()">
            @if (actionCount() > 0) {
                <fd-shellbar-action ariaLabel="Action one"></fd-shellbar-action>
            }
            @if (actionCount() > 1) {
                <fd-shellbar-action ariaLabel="Action two"></fd-shellbar-action>
            }
        </fd-shellbar-actions>
        <fd-shellbar-actions>
            @if (buttonCount() > 0) {
                <button fd-button id="plain-one">Plain one</button>
            }
            @if (buttonCount() > 1) {
                <button fd-button id="plain-two">Plain two</button>
            }
        </fd-shellbar-actions>
        <fd-shellbar-actions>
            <fd-shellbar-action ariaLabel="Stable mixed action"></fd-shellbar-action>
            @if (mixedPlainButton()) {
                <button fd-button id="mixed-plain">Mixed plain button</button>
            }
        </fd-shellbar-actions>
    `,
    imports: [ShellbarActionsComponent, ShellbarActionComponent, ButtonComponent]
})
class DynamicActionsTestComponent {
    readonly actionCount = signal(0);
    readonly buttonCount = signal(0);
    readonly assistiveTools = signal(false);
    readonly mixedPlainButton = signal(false);
}

describe('ShellbarActionsComponent', () => {
    let component: ShellbarActionsComponent;
    let fixture: ComponentFixture<ShellbarActionsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarModule],
            providers: [
                {
                    provide: FD_SHELLBAR_COMPONENT,
                    useClass: ShellbarMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply modifier classes', async () => {
        await fixture.whenRenderingDone();

        expect(fixture.debugElement.nativeElement.classList).toContain('fd-shellbar__group');
        expect(fixture.debugElement.nativeElement.classList).toContain('fd-shellbar__group--actions');
    });
});

describe('ShellbarActionsComponent logical action semantics', () => {
    let dynamicFixture: ComponentFixture<DynamicActionsTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DynamicActionsTestComponent],
            providers: [{ provide: FD_SHELLBAR_COMPONENT, useClass: ShellbarMock }]
        }).compileComponents();
        dynamicFixture = TestBed.createComponent(DynamicActionsTestComponent);
        dynamicFixture.detectChanges();
        await dynamicFixture.whenStable();
    });

    it('updates action-component group semantics through one mounted 0 to 1 to 2 to 1 to 0 lifecycle', async () => {
        for (const [count, role] of [
            [0, null],
            [1, null],
            [2, 'toolbar'],
            [1, null],
            [0, null]
        ] as const) {
            dynamicFixture.componentInstance.actionCount.set(count);
            dynamicFixture.detectChanges();
            await dynamicFixture.whenStable();

            const actions = dynamicFixture.nativeElement.querySelectorAll('fd-shellbar-actions')[0] as HTMLElement;
            expect(actions.querySelectorAll('fd-shellbar-action')).toHaveLength(count);
            expect(actions.getAttribute('role')).toBe(role);
            expect(actions.getAttribute('aria-label')).toBe(role ? 'Shellbar' : null);
        }
    });

    it('updates plain fd-button group semantics through one mounted 0 to 1 to 2 to 1 to 0 lifecycle', async () => {
        for (const [count, role] of [
            [0, null],
            [1, null],
            [2, 'toolbar'],
            [1, null],
            [0, null]
        ] as const) {
            dynamicFixture.componentInstance.buttonCount.set(count);
            dynamicFixture.detectChanges();
            await dynamicFixture.whenStable();

            const actions = dynamicFixture.nativeElement.querySelectorAll('fd-shellbar-actions')[1] as HTMLElement;
            expect(actions.querySelectorAll('button')).toHaveLength(count);
            expect(actions.getAttribute('role')).toBe(role);
            expect(actions.getAttribute('aria-label')).toBe(role ? 'Shellbar' : null);
            if (count === 1) {
                expect(actions.querySelector('button')?.getAttribute('role')).not.toBe('toolbar');
            }
        }
    });

    it('reacts to a generated assistive entry while projected membership remains stable', async () => {
        dynamicFixture.componentInstance.actionCount.set(1);
        dynamicFixture.detectChanges();
        await dynamicFixture.whenStable();

        const actions = dynamicFixture.nativeElement.querySelectorAll('fd-shellbar-actions')[0] as HTMLElement;
        expect(actions.getAttribute('role')).toBeNull();

        dynamicFixture.componentInstance.assistiveTools.set(true);
        dynamicFixture.detectChanges();
        await dynamicFixture.whenStable();
        expect(actions.getAttribute('role')).toBe('toolbar');
        expect(actions.getAttribute('aria-label')).toBe('Shellbar');

        dynamicFixture.componentInstance.assistiveTools.set(false);
        dynamicFixture.detectChanges();
        await dynamicFixture.whenStable();
        expect(actions.getAttribute('role')).toBeNull();
        expect(actions.getAttribute('aria-label')).toBeNull();
    });

    it('counts mixed action and plain button projections once each', async () => {
        const actions = dynamicFixture.nativeElement.querySelectorAll('fd-shellbar-actions')[2] as HTMLElement;

        expect(actions.getAttribute('role')).toBeNull();
        dynamicFixture.componentInstance.mixedPlainButton.set(true);
        dynamicFixture.detectChanges();
        await dynamicFixture.whenStable();

        expect(actions.getAttribute('role')).toBe('toolbar');
        expect(actions.getAttribute('aria-label')).toBe('Shellbar');
        expect(actions.querySelector('fd-shellbar-action')).not.toBeNull();
        expect(actions.querySelector('#mixed-plain')).not.toBeNull();
    });
});
