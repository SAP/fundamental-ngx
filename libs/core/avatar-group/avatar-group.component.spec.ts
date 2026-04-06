import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarGroupComponent } from './avatar-group.component';

@Component({
    template: `<fd-avatar-group type="group" [ariaLabel]="label"></fd-avatar-group>`,
    imports: [AvatarGroupComponent]
})
class AvatarGroupGroupTypeTestComponent {
    label: string | undefined;
}

@Component({
    template: `<fd-avatar-group type="individual"></fd-avatar-group>`,
    imports: [AvatarGroupComponent]
})
class AvatarGroupIndividualTypeTestComponent {}

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
            expect(host.getAttribute('aria-label')).toBeTruthy();
        });
    });

    describe('individual type', () => {
        let fixture: ComponentFixture<AvatarGroupIndividualTypeTestComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [AvatarGroupIndividualTypeTestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(AvatarGroupIndividualTypeTestComponent);
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

        it('should render fd-avatar-group-host without aria-label', () => {
            const host: HTMLElement = fixture.nativeElement.querySelector('fd-avatar-group-host');
            expect(host.getAttribute('aria-label')).toBeNull();
        });
    });
});
