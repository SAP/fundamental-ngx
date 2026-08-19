import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, RouterLink, UrlTree, provideRouter } from '@angular/router';
import { Ui5RouterLinkBridgeDirective } from './ui5-router-link-bridge.directive';

@Component({ selector: 'fd-test-target', template: 'Target' })
class TargetComponent {}

@Component({
    selector: 'fd-test-host',
    template: `<div routerLink="/target" ui5RouterLinkBridge id="host"></div>`,
    imports: [RouterLink, Ui5RouterLinkBridgeDirective]
})
class TestHostComponent {}

function makeClickCustomEvent(
    overrides: Partial<{ button: number; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean; altKey: boolean }> = {}
): CustomEvent {
    return new CustomEvent('click', {
        bubbles: true,
        cancelable: true,
        detail: { button: 0, ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, ...overrides }
    });
}

describe('Ui5RouterLinkBridgeDirective', () => {
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideRouter([{ path: 'target', component: TargetComponent }])]
        }).compileComponents();
        router = TestBed.inject(Router);
    });

    describe('plain left-click (no modifiers, button 0)', () => {
        it('calls router.navigateByUrl() with the resolved /target URL', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
            tick();

            const navigateSpy = jest.spyOn(router, 'navigateByUrl');
            const host = fixture.nativeElement.querySelector('#host') as HTMLElement;
            host.dispatchEvent(makeClickCustomEvent({ button: 0 }));

            expect(navigateSpy).toHaveBeenCalled();
            const passedTree = navigateSpy.mock.calls[0][0];
            expect(router.serializeUrl(passedTree as UrlTree)).toBe('/target');
        }));

        it('calls event.preventDefault() to suppress shadow-DOM anchor navigation', fakeAsync(() => {
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
            tick();

            const host = fixture.nativeElement.querySelector('#host') as HTMLElement;
            const event = makeClickCustomEvent({ button: 0 });
            const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

            host.dispatchEvent(event);
            fixture.detectChanges();
            tick();

            expect(preventDefaultSpy).toHaveBeenCalled();
        }));
    });

    describe('modifier clicks (new-tab intent)', () => {
        it('does NOT call router.navigateByUrl() on Ctrl+click', fakeAsync(() => {
            const navigateSpy = jest.spyOn(router, 'navigateByUrl');
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
            tick();

            const host = fixture.nativeElement.querySelector('#host') as HTMLElement;
            host.dispatchEvent(makeClickCustomEvent({ button: 0, ctrlKey: true }));
            fixture.detectChanges();
            tick();

            expect(navigateSpy).not.toHaveBeenCalled();
        }));

        it('does NOT call router.navigateByUrl() on Meta+click', fakeAsync(() => {
            const navigateSpy = jest.spyOn(router, 'navigateByUrl');
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
            tick();

            const host = fixture.nativeElement.querySelector('#host') as HTMLElement;
            host.dispatchEvent(makeClickCustomEvent({ button: 0, metaKey: true }));
            fixture.detectChanges();
            tick();

            expect(navigateSpy).not.toHaveBeenCalled();
        }));

        it('does NOT call router.navigateByUrl() on middle-click (button 1)', fakeAsync(() => {
            const navigateSpy = jest.spyOn(router, 'navigateByUrl');
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
            tick();

            const host = fixture.nativeElement.querySelector('#host') as HTMLElement;
            host.dispatchEvent(makeClickCustomEvent({ button: 1 }));
            fixture.detectChanges();
            tick();

            expect(navigateSpy).not.toHaveBeenCalled();
        }));
    });

    describe('teardown', () => {
        it('removes the capture-phase click listener on destroy', fakeAsync(() => {
            const navigateSpy = jest.spyOn(router, 'navigateByUrl');
            const fixture = TestBed.createComponent(TestHostComponent);
            fixture.detectChanges();
            tick();

            const host = fixture.nativeElement.querySelector('#host') as HTMLElement;
            fixture.destroy();

            host.dispatchEvent(makeClickCustomEvent({ button: 0 }));
            tick();

            expect(navigateSpy).not.toHaveBeenCalled();
        }));
    });

    describe('without RouterLink on the host', () => {
        it('does nothing when RouterLink is absent', fakeAsync(() => {
            @Component({
                selector: 'fd-no-routerlink-host',
                template: `<div ui5RouterLinkBridge id="host"></div>`,
                imports: [Ui5RouterLinkBridgeDirective]
            })
            class NoRouterLinkHostComponent {}

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [NoRouterLinkHostComponent],
                providers: [provideRouter([])]
            }).compileComponents();

            const fixture = TestBed.createComponent(NoRouterLinkHostComponent);
            fixture.detectChanges();
            tick();

            const host = fixture.nativeElement.querySelector('#host') as HTMLElement;
            expect(() => host.dispatchEvent(makeClickCustomEvent())).not.toThrow();
        }));
    });
});
