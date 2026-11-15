import { Component, QueryList, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { ShellbarActionsComponent } from '../shellbar-actions/shellbar-actions.component';
import { FD_SHELLBAR_COMPONENT } from '../tokens';
import { ShellbarActionsMobileComponent } from './shellbar-actions-mobile.component';

@Component({
    template: `
        <fd-shellbar-actions>
            @for (action of actions(); track action.id) {
                <fd-shellbar-action [label]="action.id" [notificationCount]="action.count"></fd-shellbar-action>
            }
        </fd-shellbar-actions>
    `,
    imports: [ShellbarActionsComponent, ShellbarActionComponent],
    providers: [{ provide: FD_SHELLBAR_COMPONENT, useValue: {} }]
})
class ProjectedMobileMembershipTestComponent {
    readonly actions = signal([{ id: 'One', count: 1 }]);
}

describe('mounted mobile actions and projected membership', () => {
    let membershipFixture: ComponentFixture<ProjectedMobileMembershipTestComponent>;
    let parentActions: ShellbarActionsComponent;
    let mobile: ShellbarActionsMobileComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [ProjectedMobileMembershipTestComponent] }).compileComponents();
        membershipFixture = TestBed.createComponent(ProjectedMobileMembershipTestComponent);
        membershipFixture.detectChanges();
        await membershipFixture.whenStable();
        parentActions = membershipFixture.debugElement.query(
            (de) => de.componentInstance instanceof ShellbarActionsComponent
        ).componentInstance;
        // Hidden branding remains a legitimate overflow reason after the last action is removed.
        parentActions.setTitleHidden(true, 'Application', null, '');
        parentActions._handleOverflow(true);
        membershipFixture.detectChanges();
        await membershipFixture.whenStable();
        mobile = membershipFixture.debugElement.query(
            (de) => de.componentInstance instanceof ShellbarActionsMobileComponent
        ).componentInstance;
    });

    function badge(): string | null {
        return (
            membershipFixture.nativeElement
                .querySelector('fd-shellbar-actions-mobile button .fd-button__badge')
                ?.textContent.trim() ?? null
        );
    }

    async function renderActions(actions: { id: string; count: number }[]): Promise<void> {
        membershipFixture.componentInstance.actions.set(actions);
        membershipFixture.detectChanges();
        await membershipFixture.whenStable();
        expect(parentActions.shellbarActions.map((action) => action.label())).toEqual(
            actions.map((action) => action.id)
        );
        expect(Array.from(membershipFixture.nativeElement.querySelectorAll('fd-shellbar-action')).length).toBe(
            actions.length
        );
        expect(
            membershipFixture.debugElement.query((de) => de.componentInstance instanceof ShellbarActionsMobileComponent)
                .componentInstance
        ).toBe(mobile);
    }

    it('renders 1 → 6 → 1 → absent without resize or remount', async () => {
        const history = [badge()];
        const one = { id: 'One', count: 1 };
        const five = { id: 'Five', count: 5 };
        for (const actions of [[one, five], [one], []]) {
            await renderActions(actions);
            history.push(badge());
        }
        expect(history).toEqual(['1', '6', '1', null]);
    });

    it('updates the badge when an existing action count changes', async () => {
        expect(badge()).toBe('1');
        await renderActions([{ id: 'One', count: 4 }]);
        expect(badge()).toBe('4');
    });

    it('tracks added action counts and reordering', async () => {
        await renderActions([
            { id: 'One', count: 1 },
            { id: 'Five', count: 5 }
        ]);
        await renderActions([
            { id: 'Five', count: 5 },
            { id: 'One', count: 1 }
        ]);
        expect(badge()).toBe('6');
        await renderActions([
            { id: 'Five', count: 7 },
            { id: 'One', count: 1 }
        ]);
        expect(badge()).toBe('8');
    });
});

describe('exported QueryList replacement and destruction controls', () => {
    it('ignores former-list membership/count notifications and releases list observers on destruction', async () => {
        await TestBed.configureTestingModule({
            imports: [ShellbarActionsMobileComponent, ShellbarActionComponent]
        }).compileComponents();
        const oldAction = TestBed.createComponent(ShellbarActionComponent);
        oldAction.componentRef.setInput('notificationCount', 1);
        const currentAction = TestBed.createComponent(ShellbarActionComponent);
        currentAction.componentRef.setInput('notificationCount', 5);
        const oldList = new QueryList<ShellbarActionComponent>();
        oldList.reset([oldAction.componentInstance]);
        const currentList = new QueryList<ShellbarActionComponent>();
        currentList.reset([currentAction.componentInstance]);
        const replacementFixture = TestBed.createComponent(ShellbarActionsMobileComponent);
        replacementFixture.componentRef.setInput('shellbarActions', oldList);
        replacementFixture.detectChanges();
        await replacementFixture.whenStable();
        const badgeText = (): string =>
            replacementFixture.nativeElement.querySelector('button .fd-button__badge').textContent.trim();
        expect(badgeText()).toBe('1');
        replacementFixture.componentRef.setInput('shellbarActions', currentList);
        replacementFixture.detectChanges();
        await replacementFixture.whenStable();
        expect(badgeText()).toBe('5');
        oldAction.componentRef.setInput('notificationCount', 9);
        oldList.reset([]);
        oldList.notifyOnChanges();
        replacementFixture.detectChanges();
        await replacementFixture.whenStable();
        expect(badgeText()).toBe('5');
        expect((oldList.changes as Subject<unknown>).observed).toBe(false);
        replacementFixture.destroy();
        currentList.notifyOnChanges();
        expect((currentList.changes as Subject<unknown>).observed).toBe(false);
    });
});
