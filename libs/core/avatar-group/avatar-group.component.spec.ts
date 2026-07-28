import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { AvatarGroupComponent } from './avatar-group.component';
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
