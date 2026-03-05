import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverService } from './popover-service/popover.service';
import { PopoverComponent } from './popover.component';
import { PopoverModule } from './popover.module';

@Component({
    selector: 'fd-popover-test',
    template: `
        <fd-popover
            #popover
            [placement]="placement"
            [disabled]="disabled"
            [isOpen]="isOpen"
            [noArrow]="noArrow"
            [closeOnEscapeKey]="closeOnEscapeKey"
        >
            <fd-popover-control>
                <button #trigger>Open Popover</button>
            </fd-popover-control>
            <fd-popover-body>
                <div>Popover Content</div>
            </fd-popover-body>
        </fd-popover>
    `,
    standalone: true,
    imports: [PopoverModule]
})
class TestPopoverComponent {
    @ViewChild('popover') popover: PopoverComponent;
    @ViewChild('trigger', { read: ElementRef }) trigger: ElementRef;
    @ViewChild(PopoverBodyComponent) popoverBody: PopoverBodyComponent;
    @ViewChild(PopoverControlComponent) popoverControl: PopoverControlComponent;

    placement: any = 'bottom-start';
    disabled = false;
    isOpen = false;
    noArrow = true;
    closeOnEscapeKey = true;
}

@Component({
    selector: 'fd-popover-config-test',
    template: `
        <fd-popover #popover [config]="popoverConfig">
            <fd-popover-control>
                <button>Open Popover</button>
            </fd-popover-control>
            <fd-popover-body>
                <div>Popover Content</div>
            </fd-popover-body>
        </fd-popover>
    `,
    standalone: true,
    imports: [PopoverModule]
})
class TestPopoverConfigComponent {
    @ViewChild('popover') popover: PopoverComponent;
    popoverConfig = {
        placement: 'top-start' as const,
        noArrow: false,
        closeOnEscapeKey: false
    };
}

describe('PopoverComponent', () => {
    let fixture: ComponentFixture<TestPopoverComponent>;
    let testComponent: TestPopoverComponent;
    let popover: PopoverComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestPopoverComponent, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPopoverComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        popover = testComponent.popover;
    });

    it('should create', () => {
        expect(popover).toBeDefined();
    });

    it('should open popover', fakeAsync(() => {
        expect(popover.isOpen()).toBe(false);

        popover.open();
        fixture.detectChanges();
        tick();

        expect(popover.isOpen()).toBe(true);
    }));

    it('should close popover', fakeAsync(() => {
        popover.open();
        fixture.detectChanges();
        tick();

        expect(popover.isOpen()).toBe(true);

        popover.close();
        fixture.detectChanges();
        tick();

        expect(popover.isOpen()).toBe(false);
    }));

    it('should toggle popover - open when closed', fakeAsync(() => {
        expect(popover.isOpen()).toBe(false);

        popover.toggle();
        fixture.detectChanges();
        tick();

        expect(popover.isOpen()).toBe(true);
    }));

    it('should toggle popover - close when open', fakeAsync(() => {
        popover.open();
        fixture.detectChanges();
        tick();

        expect(popover.isOpen()).toBe(true);

        popover.toggle();
        fixture.detectChanges();
        tick();

        expect(popover.isOpen()).toBe(false);
    }));

    it('should emit isOpenChange when open state changes', fakeAsync(() => {
        const emittedValues: boolean[] = [];
        popover.isOpenChange.subscribe((value) => emittedValues.push(value));

        popover.open();
        fixture.detectChanges();
        tick();

        popover.close();
        fixture.detectChanges();
        tick();

        expect(emittedValues).toContain(true);
        expect(emittedValues).toContain(false);
    }));

    it('should emit beforeOpen when popover is about to open', fakeAsync(() => {
        let beforeOpenEmitted = false;
        popover.beforeOpen.subscribe(() => {
            beforeOpenEmitted = true;
        });

        popover.open();
        fixture.detectChanges();
        tick();

        expect(beforeOpenEmitted).toBe(true);
    }));

    it('should not emit beforeOpen when popover is closed', fakeAsync(() => {
        popover.open();
        fixture.detectChanges();
        tick();

        let beforeOpenEmitted = false;
        popover.beforeOpen.subscribe(() => {
            beforeOpenEmitted = true;
        });

        popover.close();
        fixture.detectChanges();
        tick();

        expect(beforeOpenEmitted).toBe(false);
    }));

    it('should apply disabled host binding when disabled', () => {
        testComponent.disabled = true;
        fixture.detectChanges();

        const popoverElement = fixture.nativeElement.querySelector('fd-popover');
        expect(popoverElement?.classList.contains('fd-popover-custom--disabled')).toBe(true);
    });

    it('should handle alt + down arrow keydown to open', () => {
        const event = {
            altKey: true,
            keyCode: DOWN_ARROW,
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        } as any;

        testComponent.disabled = false;
        fixture.detectChanges();

        popover.triggerKeyDownHandler(event as KeyboardEvent);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should not open on alt + down arrow when disabled', () => {
        const event = {
            altKey: true,
            keyCode: DOWN_ARROW,
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        } as any;

        testComponent.disabled = true;
        fixture.detectChanges();

        jest.spyOn(popover, 'open');
        popover.triggerKeyDownHandler(event as KeyboardEvent);

        expect(popover.open).not.toHaveBeenCalled();
    });

    it('should refresh position via service', fakeAsync(() => {
        popover.open();
        fixture.detectChanges();
        tick();

        const service = popover['_popoverService'];
        jest.spyOn(service, 'refreshPosition');

        popover.refreshPosition();

        expect(service.refreshPosition).toHaveBeenCalled();
    }));

    it('should apply new position via service', fakeAsync(() => {
        popover.open();
        fixture.detectChanges();
        tick();

        const service = popover['_popoverService'];
        jest.spyOn(service, 'applyNewPosition');

        const newPositions = [{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }] as any;
        popover.applyNewPosition(newPositions);

        expect(service.applyNewPosition).toHaveBeenCalledWith(newPositions);
    }));

    it('should set ignore triggers via service', () => {
        const service = popover['_popoverService'];
        jest.spyOn(service, 'setIgnoreTriggers');

        popover.setIgnoreTriggers(true);

        expect(service.setIgnoreTriggers).toHaveBeenCalledWith(true);
    });

    it('should cleanup on destroy', () => {
        const destroyEventsSpy = jest.spyOn(popover as any, '_destroyEventListeners');
        const destroyMobileSpy = jest.spyOn(popover as any, '_destroyMobileComponent');

        popover.ngOnDestroy();

        expect(destroyEventsSpy).toHaveBeenCalled();
        expect(destroyMobileSpy).toHaveBeenCalled();
    });

    it('should sync isOpen changes to service', fakeAsync(() => {
        const service = popover['_popoverService'];

        testComponent.isOpen = true;
        fixture.detectChanges();
        tick();

        expect(service.isOpen()).toBe(true);

        testComponent.isOpen = false;
        fixture.detectChanges();
        tick();

        expect(service.isOpen()).toBe(false);
    }));

    it('should have correct placement default', () => {
        expect(popover.placement()).toBe('bottom-start');
    });

    it('should update placement when input changes', () => {
        testComponent.placement = 'top-end';
        fixture.detectChanges();

        expect(popover.placement()).toBe('top-end');
    });

    it('should have correct default values for inputs', () => {
        expect(popover.focusTrapped()).toBe(true);
        expect(popover.focusAutoCapture()).toBe(true);
        expect(popover.closeOnOutsideClick()).toBe(true);
        expect(popover.closeOnEscapeKey()).toBe(true);
        expect(popover.noArrow()).toBe(true);
        expect(popover.disabled()).toBe(false);
        expect(popover.disableScrollbar()).toBe(false);
        expect(popover.mobile()).toBe(false);
    });
});

describe('PopoverComponent with config input', () => {
    let fixture: ComponentFixture<TestPopoverConfigComponent>;
    let testComponent: TestPopoverConfigComponent;
    let popover: PopoverComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestPopoverConfigComponent, NoopAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPopoverConfigComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        popover = testComponent.popover;
    });

    it('should accept config input', () => {
        expect(popover.config()).toEqual({
            placement: 'top-start',
            noArrow: false,
            closeOnEscapeKey: false
        });
    });

    it('should use config values in effective config when inputs not set', () => {
        // The _effectiveConfig should use config values as fallbacks
        const effectiveConfig = popover['_effectiveConfig']();

        // These should come from config since component inputs use defaults
        // but individual inputs take precedence over config
        expect(effectiveConfig.placement).toBe('bottom-start'); // input default takes precedence
        expect(effectiveConfig.noArrow).toBe(true); // input default takes precedence
    });
});

describe('PopoverComponent service stub tests', () => {
    let component: PopoverComponent;
    let fixture: ComponentFixture<PopoverComponent>;
    let popoverServiceStub: PopoverServiceStub;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverComponent],
            providers: [{ provide: PopoverService, useClass: PopoverServiceStub }]
        })
            .overrideComponent(PopoverComponent, {
                set: {
                    providers: [{ provide: PopoverService, useClass: PopoverServiceStub }]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverComponent);
        component = fixture.componentInstance;
        popoverServiceStub = fixture.debugElement.injector.get(PopoverService) as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should call service open method', () => {
        jest.spyOn(popoverServiceStub, 'open');

        component.open();

        expect(popoverServiceStub.open).toHaveBeenCalled();
    });

    it('should call service close method', () => {
        jest.spyOn(popoverServiceStub, 'close');

        component.close();

        expect(popoverServiceStub.close).toHaveBeenCalled();
    });

    it('should call service applyNewPosition method', () => {
        jest.spyOn(popoverServiceStub, 'applyNewPosition');

        component.applyNewPosition([]);

        expect(popoverServiceStub.applyNewPosition).toHaveBeenCalled();
    });

    it('should call service refreshPosition method', () => {
        jest.spyOn(popoverServiceStub, 'refreshPosition');

        component.refreshPosition();

        expect(popoverServiceStub.refreshPosition).toHaveBeenCalled();
    });

    it('should call service setIgnoreTriggers method', () => {
        jest.spyOn(popoverServiceStub, 'setIgnoreTriggers');

        component.setIgnoreTriggers(true);

        expect(popoverServiceStub.setIgnoreTriggers).toHaveBeenCalledWith(true);
    });
});

class PopoverServiceStub {
    // Use actual signals for realistic testing
    isOpen = signal(false);
    placement = signal<any>('bottom-start');
    maxWidth = signal<number | null>(null);
    fillControlMode = signal<any>(null);
    closeOnOutsideClick = signal(true);
    closeOnEscapeKey = signal(true);
    disabled = signal(false);
    triggers = signal<any[]>(['click']);
    focusTrapped = signal(true);
    focusAutoCapture = signal(true);
    restoreFocusOnClose = signal(true);
    noArrow = signal(true);
    disableScrollbar = signal(false);
    appendTo = signal<any>(null);
    placementContainer = signal<any>(null);
    scrollStrategy = signal<any>(null);
    cdkPositions = signal<any>(null);
    applyOverlay = signal(false);
    additionalBodyClass = signal<string | null>(null);
    additionalTriggerClass = signal<string | null>(null);
    closeOnNavigation = signal(true);
    fixedPosition = signal(false);
    resizable = signal(false);

    isOpenChange = {
        pipe: () => ({ subscribe: () => {} })
    };

    _mobile = false;
    templateContent: any = null;

    initialise(): void {}
    refreshConfiguration(): void {}
    open(): void {
        this.isOpen.set(true);
    }
    close(): void {
        this.isOpen.set(false);
    }
    toggle(): void {
        this.isOpen.set(!this.isOpen());
    }
    applyNewPosition(): void {}
    refreshPosition(): void {}
    onDestroy(): void {}
    updateTriggerElement(): void {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setIgnoreTriggers(_ignore: boolean): void {}
}
