import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorAccent, Nullable } from '@fundamental-ngx/cdk/utils';
import { AvatarValueStates } from './avatar-value-states.type';
import { AvatarComponent, IndicationColor } from './avatar.component';

@Component({
    selector: 'fd-test-object-status',
    template: `<fd-avatar></fd-avatar>`,
    standalone: true,
    imports: [AvatarComponent]
})
class TestComponent {
    @ViewChild(AvatarComponent)
    avatarComponent: AvatarComponent;
}

describe('AvatarComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let avatarFixture: ComponentFixture<AvatarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        })
            .overrideComponent(AvatarComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        avatarFixture = TestBed.createComponent(AvatarComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Change Size', () => {
        avatarFixture.componentRef.setInput('size', 'm');
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--m')).toBeTruthy();

        avatarFixture.componentRef.setInput('size', 'xs');
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--xs')).toBeTruthy();

        avatarFixture.componentRef.setInput('size', 's');
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--s')).toBeTruthy();

        avatarFixture.componentRef.setInput('size', 'l');
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--l')).toBeTruthy();

        avatarFixture.componentRef.setInput('size', 'xl');
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--xl')).toBeTruthy();
    });

    it('Should Add Glyph', () => {
        avatarFixture.componentRef.setInput('glyph', 'group');
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.sap-icon--group')).toBeTruthy();
    });

    it('Should Add Circle Design', () => {
        avatarFixture.componentRef.setInput('circle', true);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--circle')).toBeTruthy();
    });

    it('Should Add Transparent Background', () => {
        avatarFixture.componentRef.setInput('transparent', true);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--transparent')).toBeTruthy();
    });

    it('Should Use background size contain option', () => {
        avatarFixture.componentRef.setInput('contain', true);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--background-contain')).toBeTruthy();
    });

    it('Should Add Placeholder Background', () => {
        avatarFixture.componentRef.setInput('placeholder', true);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--placeholder')).toBeTruthy();
    });

    it('Should Add Tile Background', () => {
        avatarFixture.componentRef.setInput('tile', true);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--tile')).toBeTruthy();
    });

    it('Should Add Accent Color', () => {
        avatarFixture.componentRef.setInput('colorAccent', 1);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--accent-color-1')).toBeTruthy();

        avatarFixture.componentRef.setInput('colorAccent', 5);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--accent-color-5')).toBeTruthy();

        avatarFixture.componentRef.setInput('colorAccent', 10);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--accent-color-10')).toBeTruthy();
    });

    it('Should Add Indication Color', () => {
        avatarFixture.componentRef.setInput('colorIndication', 1);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--indication-color-1')).toBeTruthy();

        avatarFixture.componentRef.setInput('colorIndication', 5);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--indication-color-5')).toBeTruthy();

        avatarFixture.componentRef.setInput('colorIndication', 10);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--indication-color-10')).toBeTruthy();
    });

    it('Should Add Random Accent Color', () => {
        avatarFixture.componentRef.setInput('colorAccent', null);
        avatarFixture.componentRef.setInput('random', true);
        avatarFixture.detectChanges();

        expect(avatarFixture.nativeElement.querySelector('[class*="fd-avatar--accent-color-"]')).toBeTruthy();
    });

    it('Should Add Border', () => {
        avatarFixture.componentRef.setInput('border', true);
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar--border')).toBeTruthy();
    });

    it('Should Add Zoom Icon', () => {
        avatarFixture.componentRef.setInput('zoomGlyph', 'edit');
        avatarFixture.detectChanges();
        expect(avatarFixture.nativeElement.querySelector('.fd-avatar__zoom-icon')).toBeTruthy();
        expect(avatarFixture.nativeElement.querySelector('.sap-icon--edit')).toBeTruthy();
    });

    it('Should Add Abbreviate', async () => {
        avatarFixture.componentRef.setInput('label', 'Jane Doe');
        avatarFixture.detectChanges();
        await avatarFixture.whenRenderingDone();
        expect((avatarFixture.componentInstance as any)._abbreviate()).toEqual('JD');

        avatarFixture.componentRef.setInput('label', 'Marjolein van Veen');
        avatarFixture.detectChanges();
        expect((avatarFixture.componentInstance as any)._abbreviate()).toEqual('MvV');
    });

    it('should add respective Value State Icons', () => {
        const stateIcons: Record<AvatarValueStates, string> = {
            positive: 'sys-enter-2',
            caution: 'warning',
            negative: 'error',
            information: 'information'
        };

        Object.keys(stateIcons).forEach((state) => {
            avatarFixture.componentRef.setInput('valueState', state as AvatarValueStates);
            avatarFixture.detectChanges();
            const badgeElementClassList = avatarFixture.debugElement.query(By.css('.fd-avatar__zoom-icon'))
                ?.nativeElement.classList;
            expect(badgeElementClassList).toContain(`fd-avatar__zoom-icon--${state}`);
            expect(badgeElementClassList).toContain(`sap-icon--${stateIcons[state]}`);
        });
    });
});
