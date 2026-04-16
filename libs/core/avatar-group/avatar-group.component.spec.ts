import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarGroupComponent } from './avatar-group.component';

@Component({
    template: `<fd-avatar-group type="group" [ariaLabel]="label"></fd-avatar-group>`,
    imports: [AvatarGroupComponent]
})
class AvatarGroupGroupTypeTestComponent {
    label: string | undefined;
}

@Component({
    template: `<fd-avatar-group type="individual" [ariaLabel]="label"></fd-avatar-group>`,
    imports: [AvatarGroupComponent]
})
class AvatarGroupIndividualWithLabelTestComponent {
    label: string | undefined;
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
        let fixture: ComponentFixture<AvatarGroupGroupTypeTestComponent>;
        let wrapper: AvatarGroupGroupTypeTestComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [AvatarGroupGroupTypeTestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(AvatarGroupGroupTypeTestComponent);
            wrapper = fixture.componentInstance;
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
            wrapper.label = 'My avatar group';
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
        let wrapper: AvatarGroupIndividualWithLabelTestComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [AvatarGroupIndividualWithLabelTestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(AvatarGroupIndividualWithLabelTestComponent);
            wrapper = fixture.componentInstance;
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
            wrapper.label = 'My individual group';
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
