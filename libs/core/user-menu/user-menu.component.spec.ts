import { ApplicationRef, Component, ElementRef, EmbeddedViewRef, signal, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { UserMenuBodyComponent } from './components/user-menu-body.component';
import { UserMenuContentContainerComponent } from './components/user-menu-content-container.component';
import { UserMenuControlComponent } from './components/user-menu-control.component';
import { UserMenuListItemComponent } from './components/user-menu-list-item.component';
import { UserMenuListComponent } from './components/user-menu-list.component';
import { UserMenuComponent } from './user-menu.component';

@Component({
    template: `
        <fd-user-menu #elRef [mobile]="mobile" (isOpenChange)="stateChanged($event)">
            <fd-user-menu-control>
                <fd-avatar label="Lisa Miller" ariaLabel="Lisa Miller" />
            </fd-user-menu-control>
            <fd-user-menu-body>
                <div fd-user-menu-content-container>
                    <fd-user-menu-list>
                        <li fd-user-menu-list-item text="Item 1"></li>
                        <li fd-user-menu-list-item text="Item 2"></li>
                        <li fd-user-menu-list-item text="Item 3"></li>
                    </fd-user-menu-list>
                </div>
            </fd-user-menu-body>
        </fd-user-menu>
    `,
    standalone: true,
    imports: [
        AvatarComponent,
        UserMenuComponent,
        UserMenuControlComponent,
        UserMenuBodyComponent,
        UserMenuContentContainerComponent,
        UserMenuListComponent,
        UserMenuListItemComponent
    ]
})
class TestComponentWithItems {
    @ViewChild('elRef', { read: ElementRef })
    elRef: ElementRef;

    @ViewChild(UserMenuComponent)
    userMenuComponent: UserMenuComponent;

    mobile = false;
    stateChanged = jest.fn();
}

describe('UserMenuComponent', () => {
    let component: TestComponentWithItems;
    let fixture: ComponentFixture<TestComponentWithItems>;
    let userMenu: UserMenuComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponentWithItems],
            providers: [RtlService, DialogService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWithItems);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        userMenu = component.userMenuComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.elRef.nativeElement.classList).toContain('fd-user-menu');
    });

    describe('initial focus behavior', () => {
        it('should focus first list item (not first focusable element) when popover opens in non-mobile mode', fakeAsync(() => {
            const listItems = userMenu['_listItems']();

            expect(listItems.length).toBeGreaterThan(0);

            const firstItemFocusSpy = jest.spyOn(listItems[0], 'focus');

            // Open the menu in non-mobile mode (popover)
            userMenu.open();
            fixture.detectChanges();

            // Wait for requestAnimationFrame
            tick(20);

            // Verify the first list item's focus() method was called explicitly
            // (not relying on default popover focus behavior which would focus first focusable element)
            expect(firstItemFocusSpy).toHaveBeenCalled();
        }));
    });

    describe('focus reset on close', () => {
        it('should reset list focus when menu closes', () => {
            const listItems = userMenu['_listItems']();

            // Open the menu first
            userMenu.open();
            fixture.detectChanges();

            // Simulate roving tabindex where second item was focused
            listItems[0]._tabIndex$.set(-1);
            listItems[1]._tabIndex$.set(0);
            listItems[2]._tabIndex$.set(-1);

            // Close the menu
            userMenu.close();
            fixture.detectChanges();

            // Should reset to first item having tabindex 0
            expect(listItems[0]._tabIndex$()).toBe(0);
            expect(listItems[1]._tabIndex$()).toBe(-1);
            expect(listItems[2]._tabIndex$()).toBe(-1);
        });

        it('should restore focus to control when closing in popover mode', () => {
            const control = userMenu['userMenuControl']();
            const controlFocusSpy = jest.spyOn(control!, 'focus');

            // Open first
            userMenu.open();
            fixture.detectChanges();

            // Then close
            userMenu.close();
            fixture.detectChanges();

            expect(controlFocusSpy).toHaveBeenCalled();
        });
    });
});

class ControlledDialogReceipt extends DialogRef {
    override readonly isLoaded = signal(false);

    override loaded(): void {
        super.loaded();
        this.isLoaded.set(true);
    }
}

// The input and control are real; only DialogService's lifecycle receipt is controlled.
describe('UserMenuComponent bound mobile lifecycle', () => {
    let fixture: ComponentFixture<TestComponentWithItems>;
    let menu: UserMenuComponent;
    let trigger: HTMLElement;
    let receipt: DialogRef;
    let openSpy: jest.SpyInstance;
    let views: EmbeddedViewRef<unknown>[];
    let outputSpy: jest.Mock;
    let unsubscribe: () => void;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TestComponentWithItems], providers: [RtlService, DialogService] });
        views = [];
        openSpy = jest.spyOn(TestBed.inject(DialogService), 'open').mockImplementation((content, config) => {
            const previouslyFocusedElement = document.activeElement as HTMLElement;
            receipt = new ControlledDialogReceipt();
            // A normal afterClosed receipt may follow close() later.
            jest.spyOn(receipt, 'close').mockImplementation(() => undefined);
            const view = (content as TemplateRef<unknown>).createEmbeddedView({
                $implicit: receipt,
                dialogConfig: Object.assign(new DialogConfig(), config)
            });
            TestBed.inject(ApplicationRef).attachView(view);
            fixture.nativeElement.append(...view.rootNodes);
            view.detectChanges();
            views.push(view);
            // Match DialogService: destroy the dialog before delivering afterClosed.
            receipt._endClose$.subscribe(() => {
                view.destroy();
                // DialogService also restores its captured focus target on dismissal.
                previouslyFocusedElement.focus();
            });
            return receipt;
        });
        fixture = TestBed.createComponent(TestComponentWithItems);
        fixture.componentInstance.mobile = true;
        fixture.detectChanges();
        TestBed.tick();
        menu = fixture.componentInstance.userMenuComponent;
        trigger = fixture.nativeElement.querySelector('fd-user-menu-control');
        outputSpy = jest.fn();
        const subscription = menu.isOpenChange.subscribe(outputSpy);
        unsubscribe = () => subscription.unsubscribe();
    });

    afterEach(() => {
        unsubscribe();
        views.forEach((view) => view.destroy());
        fixture.destroy();
        jest.restoreAllMocks();
    });

    function activate(key?: string): void {
        trigger.focus();
        if (key) {
            trigger.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        } else {
            trigger.click();
        }
        fixture.detectChanges();
        TestBed.tick();
        expect(menu.mobile()).toBe(true);
        expect(openSpy).toHaveBeenCalledTimes(1);
        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
    }

    function expectState(states: boolean[]): void {
        expect({
            open: menu.isOpen(),
            expanded: trigger.getAttribute('aria-expanded'),
            events: outputSpy.mock.calls.map(([value]) => value),
            boundEvents: fixture.componentInstance.stateChanged.mock.calls.map(([value]) => value)
        }).toEqual({
            open: states.at(-1) ?? false,
            expanded: String(states.at(-1) ?? false),
            events: states,
            boundEvents: states
        });
    }

    it('provides a reachable bound-mobile control and a loaded normal-close receipt with settled focus', fakeAsync(() => {
        activate();
        const firstAction = fixture.nativeElement.querySelector('.fd-menu__link');
        expect(firstAction).toBeTruthy();
        receipt.loaded();
        fixture.detectChanges();
        TestBed.tick();
        tick(20);
        expect(document.activeElement).toBe(firstAction);
        DialogRef.prototype.close.call(receipt);
        fixture.detectChanges();
        TestBed.tick();
        tick(20);
        expect(document.activeElement).toBe(trigger);
    }));

    it('loads a dialog through pointer activation and focuses its first action', fakeAsync(() => {
        expectState([]);
        activate();
        const firstAction = fixture.nativeElement.querySelector('.fd-menu__link');
        expect(firstAction).toBeTruthy();
        trigger.focus();
        receipt.loaded();
        fixture.detectChanges();
        TestBed.tick();
        tick(20);
        expect(document.activeElement).toBe(firstAction);
        expectState([true]);
    }));

    it('normal close receipt synchronizes state once and restores trigger focus', fakeAsync(() => {
        activate('Enter');
        receipt.loaded();
        TestBed.tick();
        tick(20);
        DialogRef.prototype.close.call(receipt);
        fixture.detectChanges();
        TestBed.tick();
        tick(20);
        expect(document.activeElement).toBe(trigger);
        expectState([true, false]);
    }));

    it('Close followed by its normal receipt emits one false event', fakeAsync(() => {
        activate(' ');
        menu.close();
        expect(receipt.close).toHaveBeenCalledTimes(1);
        DialogRef.prototype.close.call(receipt);
        fixture.detectChanges();
        TestBed.tick();
        tick(20);
        expect(document.activeElement).toBe(trigger);
        expectState([true, false]);
    }));

    it.each(['escape', 'backdrop'])(
        'dismissal %s synchronizes state and allows Space reopening',
        fakeAsync((reason: string) => {
            activate('Enter');
            receipt.loaded();
            TestBed.tick();
            tick(20);
            receipt.dismiss(reason);
            fixture.detectChanges();
            TestBed.tick();
            tick(20);
            expect(document.activeElement).toBe(trigger);
            trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));
            fixture.detectChanges();
            TestBed.tick();
            expect(openSpy).toHaveBeenCalledTimes(2);
            expectState([true, false, true]);
        })
    );
});
