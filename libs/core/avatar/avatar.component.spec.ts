import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarValueStates } from './avatar-value-states.type';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
    let fixture: ComponentFixture<AvatarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });
        fixture = TestBed.createComponent(AvatarComponent);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('Should Change Size', () => {
        fixture.componentRef.setInput('size', 'm');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--m')).toBe(true);

        fixture.componentRef.setInput('size', 'xs');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--xs')).toBe(true);

        fixture.componentRef.setInput('size', 's');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--s')).toBe(true);

        fixture.componentRef.setInput('size', 'l');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--l')).toBe(true);

        fixture.componentRef.setInput('size', 'xl');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--xl')).toBe(true);
    });

    it('Should Add Glyph', () => {
        fixture.componentRef.setInput('glyph', 'group');
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.sap-icon--group')).toBeTruthy();
    });

    it('Should Add Circle Design', () => {
        fixture.componentRef.setInput('circle', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--circle')).toBe(true);
    });

    it('Should Add Transparent Background', () => {
        fixture.componentRef.setInput('transparent', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--transparent')).toBe(true);
    });

    it('Should Use background size contain option', () => {
        fixture.componentRef.setInput('contain', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--background-contain')).toBe(true);
    });

    it('Should Add Placeholder Background', () => {
        fixture.componentRef.setInput('placeholder', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--placeholder')).toBe(true);
    });

    it('Should Add Tile Background', () => {
        fixture.componentRef.setInput('tile', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--tile')).toBe(true);
    });

    it('Should Add Accent Color', () => {
        fixture.componentRef.setInput('colorAccent', 1);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--accent-color-1')).toBe(true);

        fixture.componentRef.setInput('colorAccent', 5);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--accent-color-5')).toBe(true);

        fixture.componentRef.setInput('colorAccent', 10);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--accent-color-10')).toBe(true);
    });

    it('Should Add Indication Color', () => {
        fixture.componentRef.setInput('colorIndication', 1);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--indication-color-1')).toBe(true);

        fixture.componentRef.setInput('colorIndication', 5);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--indication-color-5')).toBe(true);

        fixture.componentRef.setInput('colorIndication', 10);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--indication-color-10')).toBe(true);
    });

    it('Should Add Random Accent Color', () => {
        fixture.componentRef.setInput('colorAccent', null);
        fixture.componentRef.setInput('random', true);
        fixture.detectChanges();

        const hasAccentColor = Array.from<string>(fixture.nativeElement.classList).some((cls) =>
            cls.startsWith('fd-avatar--accent-color-')
        );
        expect(hasAccentColor).toBe(true);
    });

    it('Should Add Border', () => {
        fixture.componentRef.setInput('border', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--border')).toBe(true);
    });

    it('Should Add Zoom Icon', () => {
        fixture.componentRef.setInput('zoomGlyph', 'edit');
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar__zoom-icon')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.sap-icon--edit')).toBeTruthy();
    });

    it('Should Add Abbreviate', async () => {
        fixture.componentRef.setInput('label', 'Jane Doe');
        fixture.detectChanges();
        await fixture.whenRenderingDone();
        expect((fixture.componentInstance as any).abbreviate()).toEqual('JD');

        fixture.componentRef.setInput('label', 'Marjolein van Veen');
        fixture.detectChanges();
        expect((fixture.componentInstance as any).abbreviate()).toEqual('MvV');
    });

    it('should add respective Value State Icons', () => {
        const stateIcons: Record<AvatarValueStates, string> = {
            positive: 'sys-enter-2',
            caution: 'warning',
            negative: 'error',
            information: 'information'
        };

        Object.keys(stateIcons).forEach((state) => {
            fixture.componentRef.setInput('valueState', state as AvatarValueStates);
            fixture.detectChanges();
            const badgeElementClassList = fixture.debugElement.query(By.css('.fd-avatar__zoom-icon'))?.nativeElement
                .classList;
            expect(badgeElementClassList).toContain(`fd-avatar__zoom-icon--${state}`);
            expect(badgeElementClassList).toContain(`sap-icon--${stateIcons[state]}`);
        });
    });
});
