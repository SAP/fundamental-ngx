import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupComponent } from './avatar-group.component';
import { AvatarGroupHostComponent } from './components/avatar-group-host.component';
import { AvatarGroupItemRendererDirective } from './directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';

@Component({
    selector: 'fd-avatar-group-individual-test',
    template: `
        <fd-avatar-group type="individual" size="s">
            <fd-avatar
                *fdAvatarGroupItem="''; title: 'Person 1'"
                [circle]="true"
                [border]="true"
                size="s"
                label="P1"
            ></fd-avatar>
            <fd-avatar
                *fdAvatarGroupItem="''; title: 'Person 2'"
                [circle]="true"
                [border]="true"
                size="s"
                label="P2"
            ></fd-avatar>
        </fd-avatar-group>
    `,
    imports: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarComponent]
})
class AvatarGroupIndividualTestComponent {}

@Component({
    selector: 'fd-avatar-group-group-test',
    template: `
        <fd-avatar-group type="group" size="s">
            <fd-avatar
                *fdAvatarGroupItem="''; title: 'Person 1'"
                [circle]="true"
                [border]="true"
                size="s"
                label="P1"
            ></fd-avatar>
            <fd-avatar
                *fdAvatarGroupItem="''; title: 'Person 2'"
                [circle]="true"
                [border]="true"
                size="s"
                label="P2"
            ></fd-avatar>
        </fd-avatar-group>
    `,
    imports: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarComponent]
})
class AvatarGroupGroupTypeTestComponent {}

@Component({
    template: `<fd-avatar-group type="group" [ariaLabel]="label()"></fd-avatar-group>`,
    imports: [AvatarGroupComponent]
})
class AvatarGroupGroupTypeWithLabelTestComponent {
    readonly label = input<string | undefined>(undefined);
}

@Component({
    template: `<fd-avatar-group type="individual" [ariaLabel]="label()"></fd-avatar-group>`,
    imports: [AvatarGroupComponent]
})
class AvatarGroupIndividualWithLabelTestComponent {
    readonly label = input<string | undefined>(undefined);
}

@Component({
    template: `
        <fd-avatar-group [type]="type()" size="s" [overflowButtonShape]="shape()">
            <fd-avatar *fdAvatarGroupItem="''; title: 'Person 1'" [circle]="true" size="s" label="P1"></fd-avatar>
            <fd-avatar *fdAvatarGroupItem="''; title: 'Person 2'" [circle]="true" size="s" label="P2"></fd-avatar>
        </fd-avatar-group>
    `,
    imports: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarComponent]
})
class AvatarGroupOverflowButtonShapeTestComponent {
    readonly shape = input<'circle' | 'square'>('square');
    readonly type = input<'individual' | 'group'>('individual');
}

describe('AvatarGroupComponent', () => {
    it('should create', async () => {
        await TestBed.configureTestingModule({
            imports: [AvatarGroupComponent]
        }).compileComponents();

        const fixture = TestBed.createComponent(AvatarGroupComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    describe('group type', () => {
        let fixture: ComponentFixture<AvatarGroupGroupTypeWithLabelTestComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [AvatarGroupGroupTypeWithLabelTestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(AvatarGroupGroupTypeWithLabelTestComponent);
            fixture.detectChanges();
        });

        it('should render fd-avatar-group-host with role="button"', () => {
            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('role')).toBe('button');
        });

        it('should render fd-avatar-group-host with tabindex="0"', () => {
            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('tabindex')).toBe('0');
        });

        it('should set aria-label from the ariaLabel input', () => {
            fixture.componentRef.setInput('label', 'My avatar group');
            fixture.detectChanges();

            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('aria-label')).toBe('My avatar group');
        });

        it('should fall back to an i18n aria-label when ariaLabel input is not provided', () => {
            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('aria-label')).toBe(
                'Has popup type dialog conjoined avatars, 0 avatars displayed, 0 avatars hidden, activate for complete list'
            );
        });
    });

    describe('individual type', () => {
        let fixture: ComponentFixture<AvatarGroupIndividualWithLabelTestComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [AvatarGroupIndividualWithLabelTestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(AvatarGroupIndividualWithLabelTestComponent);
            fixture.detectChanges();
        });

        it('should render fd-avatar-group-host without role="button"', () => {
            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('role')).not.toBe('button');
        });

        it('should render fd-avatar-group-host without tabindex="0"', () => {
            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('tabindex')).not.toBe('0');
        });

        it('should fall back to an i18n aria-label when ariaLabel input is not provided', () => {
            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('aria-label')).toBe('Individual avatars. 0 avatars displayed, 0 avatars hidden');
        });

        it('should set aria-label from the ariaLabel input', () => {
            fixture.componentRef.setInput('label', 'My individual group');
            fixture.detectChanges();

            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('aria-label')).toBe('My individual group');
        });

        it('should announce item position via LiveAnnouncer when an avatar is focused', () => {
            const liveAnnouncer = TestBed.inject(LiveAnnouncer);
            const announceSpy = jest.spyOn(liveAnnouncer, 'announce');

            const hostDebugEl = fixture.debugElement.query(By.css('fd-avatar-group-host'));
            hostDebugEl.triggerEventHandler('itemFocused', { index: 2, total: 10 });

            expect(announceSpy).toHaveBeenCalledWith('3 of 10');
        });
    });
});

describe('AvatarGroupComponent with individual type', () => {
    let fixture: ComponentFixture<AvatarGroupIndividualTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AvatarGroupIndividualTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarGroupIndividualTestComponent);
        fixture.detectChanges();
    });

    it('should apply fd-avatar-group__popover-control class to popover controls', () => {
        const popoverControls = fixture.nativeElement.querySelectorAll('fd-popover-control');
        expect(popoverControls.length).toBeGreaterThan(0);
        popoverControls.forEach((control: HTMLElement) => {
            expect(control.classList).toContain('fd-avatar-group__popover-control');
        });
    });
});

describe('AvatarGroupComponent with group type', () => {
    let fixture: ComponentFixture<AvatarGroupGroupTypeTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AvatarGroupGroupTypeTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarGroupGroupTypeTestComponent);
        fixture.detectChanges();
    });

    it('should apply fd-avatar-group__popover-control class to popover control', () => {
        const popoverControls = fixture.nativeElement.querySelectorAll('fd-popover-control');
        expect(popoverControls.length).toBeGreaterThan(0);
        popoverControls.forEach((control: HTMLElement) => {
            expect(control.classList).toContain('fd-avatar-group__popover-control');
        });
    });
});

describe('AvatarGroupComponent overflowButtonShape', () => {
    let fixture: ComponentFixture<AvatarGroupOverflowButtonShapeTestComponent>;

    function getHostInstance(): AvatarGroupHostComponent {
        return fixture.debugElement.query(By.directive(AvatarGroupHostComponent)).componentInstance;
    }

    function forceOverflow(): void {
        getHostInstance()._hiddenItems.set([{} as AvatarGroupItemRendererDirective]);
        fixture.detectChanges();
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AvatarGroupOverflowButtonShapeTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarGroupOverflowButtonShapeTestComponent);
        fixture.detectChanges();
    });

    describe('individual type', () => {
        it('overflow button is square by default', () => {
            forceOverflow();
            const btn: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-overflow-button');
            expect(btn).toBeTruthy();
            expect(btn.classList).not.toContain('fd-avatar--circle');
        });

        it('overflow button is circular when overflowButtonShape is "circle"', () => {
            fixture.componentRef.setInput('shape', 'circle');
            forceOverflow();
            const btn: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-overflow-button');
            expect(btn).toBeTruthy();
            expect(btn.classList).toContain('fd-avatar--circle');
        });

        it('overflow button shape updates reactively when overflowButtonShape changes', () => {
            fixture.componentRef.setInput('shape', 'circle');
            forceOverflow();
            expect(fixture.nativeElement.querySelector('fd-avatar-group-overflow-button').classList).toContain(
                'fd-avatar--circle'
            );

            fixture.componentRef.setInput('shape', 'square');
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('fd-avatar-group-overflow-button').classList).not.toContain(
                'fd-avatar--circle'
            );
        });
    });

    describe('group type', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('type', 'group');
            fixture.detectChanges();
        });

        it('overflow button is square by default', () => {
            forceOverflow();
            const btn: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-overflow-button');
            expect(btn).toBeTruthy();
            expect(btn.classList).not.toContain('fd-avatar--circle');
        });

        it('overflow button is circular when overflowButtonShape is "circle"', () => {
            fixture.componentRef.setInput('shape', 'circle');
            forceOverflow();
            const btn: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-overflow-button');
            expect(btn).toBeTruthy();
            expect(btn.classList).toContain('fd-avatar--circle');
        });
    });
});

@Component({
    template: `
        <fd-avatar-group [type]="type()" size="s" [maxVisibleItems]="max()">
            <fd-avatar *fdAvatarGroupItem="''; title: 'P1'" size="s" label="P1"></fd-avatar>
            <fd-avatar *fdAvatarGroupItem="''; title: 'P2'" size="s" label="P2"></fd-avatar>
            <fd-avatar *fdAvatarGroupItem="''; title: 'P3'" size="s" label="P3"></fd-avatar>
            <fd-avatar *fdAvatarGroupItem="''; title: 'P4'" size="s" label="P4"></fd-avatar>
            <fd-avatar *fdAvatarGroupItem="''; title: 'P5'" size="s" label="P5"></fd-avatar>
        </fd-avatar-group>
    `,
    imports: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarComponent]
})
class AvatarGroupMaxVisibleTestComponent {
    readonly max = input<number | null>(null);
    readonly type = input<'individual' | 'group'>('individual');
}

describe('AvatarGroupComponent maxVisibleItems', () => {
    let fixture: ComponentFixture<AvatarGroupMaxVisibleTestComponent>;

    function getHostInstance(): AvatarGroupHostComponent {
        return fixture.debugElement.query(By.directive(AvatarGroupHostComponent)).componentInstance;
    }

    // _calculateVisibility is called directly because ResizeObserver never fires in JSDOM,
    // so the combineLatest pipeline that updates _hiddenItems cannot be triggered in tests.
    function makeItems(count: number, forceVisibility = false, width = 0): AvatarGroupItemRendererDirective[] {
        return Array.from(
            { length: count },
            () => ({ forceVisibility, width }) as unknown as AvatarGroupItemRendererDirective
        );
    }

    function runCalc(
        max: number | null,
        items: AvatarGroupItemRendererDirective[],
        containerWidth = 1000
    ): { hiddenItems: AvatarGroupItemRendererDirective[]; visibleItems: AvatarGroupItemRendererDirective[] } {
        const host = getHostInstance();
        host.maxVisibleItems = max;

        return (host as any)._calculateVisibility(containerWidth, items);
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AvatarGroupMaxVisibleTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AvatarGroupMaxVisibleTestComponent);
        fixture.detectChanges();
    });

    it('passes maxVisibleItems to the host component', () => {
        fixture.componentRef.setInput('max', 3);
        fixture.detectChanges();
        expect(getHostInstance().maxVisibleItems).toBe(3);
    });

    it('falls through to width-based calculation when maxVisibleItems is null', () => {
        const result = runCalc(null, makeItems(5));
        // Items have 0 width in JSDOM, so all fit inside the 1000px container.
        expect(result.hiddenItems.length).toBe(0);
        expect(result.visibleItems.length).toBe(5);
    });

    it('hides items beyond maxVisibleItems', () => {
        const result = runCalc(3, makeItems(5));
        // maxVisibleItems=3, all items fit (0 width), but one is moved to hidden for overflow button
        expect(result.visibleItems.length).toBe(2);
        expect(result.hiddenItems.length).toBe(3);
    });

    it('hides no items when maxVisibleItems equals the total count', () => {
        const result = runCalc(5, makeItems(5));
        expect(result.visibleItems.length).toBe(5);
        expect(result.hiddenItems.length).toBe(0);
    });

    it('hides all items when maxVisibleItems is 0', () => {
        const result = runCalc(0, makeItems(5));
        expect(result.visibleItems.length).toBe(0);
        expect(result.hiddenItems.length).toBe(5);
    });

    it('counts forceVisibility items against the limit and never hides them', () => {
        const host = getHostInstance();
        host.maxVisibleItems = 3;
        const items: AvatarGroupItemRendererDirective[] = [
            { forceVisibility: true, width: 0 } as unknown as AvatarGroupItemRendererDirective,
            ...makeItems(4)
        ];

        const result = (host as any)._calculateVisibility(1000, items);
        // maxVisibleItems=3, so 1 forced + 2 regular fit, then one moved for button
        expect(result.visibleItems.length).toBe(2); // 1 forced + 1 regular
        expect(result.hiddenItems.length).toBe(3);
    });

    it('reflects updated count when maxVisibleItems changes', () => {
        const items = makeItems(5);
        // maxVisibleItems=2: show 2, hide 3, then move 1 for button → show 1, hide 4
        expect(runCalc(2, items).visibleItems.length).toBe(1);
        expect(runCalc(2, items).hiddenItems.length).toBe(4);
        // maxVisibleItems=4: show 4, hide 1, then move 1 for button → show 3, hide 2
        expect(runCalc(4, items).visibleItems.length).toBe(3);
        expect(runCalc(4, items).hiddenItems.length).toBe(2);
    });

    describe('vertical orientation with maxVisibleItems', () => {
        function getHostInstanceVertical(): AvatarGroupHostComponent {
            const host = getHostInstance();
            host.orientation = 'vertical';
            return host;
        }

        it('hides items beyond maxVisibleItems in vertical orientation', () => {
            const host = getHostInstanceVertical();
            host.maxVisibleItems = 3;
            const result = (host as any)._calculateVisibility(0, makeItems(5));
            // maxVisibleItems=3, one moved for overflow button → 2 visible, 3 hidden
            expect(result.visibleItems.length).toBe(2);
            expect(result.hiddenItems.length).toBe(3);
        });

        it('shows all items when maxVisibleItems is null in vertical orientation', () => {
            const host = getHostInstanceVertical();
            host.maxVisibleItems = null;
            const result = (host as any)._calculateVisibility(0, makeItems(5));
            expect(result.visibleItems.length).toBe(5);
            expect(result.hiddenItems.length).toBe(0);
        });

        it('ignores container width when applying count cap in vertical orientation', () => {
            const host = getHostInstanceVertical();
            host.maxVisibleItems = 3;
            // Items have explicit width — vertical should ignore it entirely
             
            const items = Array.from(
                { length: 5 },
                () => ({ forceVisibility: false, width: 500 }) as unknown as AvatarGroupItemRendererDirective
            );
            const result = (host as any)._calculateVisibility(100, items);
            // Width would exclude all items horizontally, but vertical ignores width
            expect(result.visibleItems.length).toBe(2);
            expect(result.hiddenItems.length).toBe(3);
        });
    });

    describe('group type', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('type', 'group');
            fixture.detectChanges();
        });

        it('hides items beyond maxVisibleItems', () => {
            const result = runCalc(3, makeItems(5));
            // maxVisibleItems=3, all items fit (0 width), but one is moved to hidden for overflow button
            expect(result.visibleItems.length).toBe(2);
            expect(result.hiddenItems.length).toBe(3);
        });
    });

    describe('width-based visibility with maxVisibleItems', () => {
        function makeItemsWithWidth(count: number, width: number): AvatarGroupItemRendererDirective[] {
            return makeItems(count, false, width);
        }

        it('respects containerWidth constraint when items have width', () => {
            const items = makeItemsWithWidth(5, 100);
            // maxVisibleItems allows 5, but container only fits 3 items (300px out of 350px available)
            const result = runCalc(5, items, 350);
            expect(result.visibleItems.length).toBeLessThan(5);
            expect(result.hiddenItems.length).toBeGreaterThan(0);
        });

        it('moves one visible item to hidden when overflow occurs to make room for overflow button', () => {
            const items = makeItemsWithWidth(4, 100);
            // maxVisibleItems = 4, but container can only fit 3 items (300px)
            // Then one is moved to hidden for overflow button
            const result = runCalc(4, items, 350);
            expect(result.visibleItems.length).toBe(2);
            expect(result.hiddenItems.length).toBe(2);
        });

        it('does not reserve overflow space when all items fit within maxVisibleItems and containerWidth', () => {
            const items = makeItemsWithWidth(2, 50);
            const result = runCalc(5, items, 1000);
            expect(result.visibleItems.length).toBe(2);
            expect(result.hiddenItems.length).toBe(0);
        });

        it('respects forced visibility items when checking width constraints', () => {
            const items: AvatarGroupItemRendererDirective[] = [
                { forceVisibility: true, width: 100 } as unknown as AvatarGroupItemRendererDirective,
                ...makeItemsWithWidth(3, 100)
            ];
            // maxVisibleItems = 3 (1 forced + 2 regular), container fits 2.5 items total (250px)
            // Only 1 regular item fits, then moved to hidden for overflow button
            const result = runCalc(3, items, 250);
            expect(result.visibleItems[0].forceVisibility).toBe(true); // forced always visible
            expect(result.visibleItems.length).toBe(1); // 1 forced, 0 regular (one that fit was moved for overflow button)
            expect(result.hiddenItems.length).toBe(3);
        });
    });
});
