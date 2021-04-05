import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarModule } from './avatar.module';
import { AvatarComponent } from './avatar.component';

@Component({
    selector: 'fd-test-object-status',
    template:  `<fd-avatar
                    [size]="size"
                    [glyph]="glyph"
                    [circle]="circle"
                    [transparent]="transparent"
                    [placeholder]="placeholder"
                    [tile]="tile"
                    [colorAccent]="colorAccent"
                    [zoomGlyph]="zoomGlyph"
                    [border]="border"
                    [label]="label">
                </fd-avatar>`
})
class TestComponent {
    size: 'xs' |'s' | 'm' | 'l' | 'xl' = 'm';
    glyph: string = null;
    circle = false;
    transparent = false;
    placeholder = false;
    tile = false;
    colorAccent: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = null;
    zoomGlyph: string = null;
    border = false;
    label: string = null;
}

describe('AvatarComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, AvatarComponent],
            imports: [AvatarModule]
        }).overrideComponent(AvatarComponent, {
            set: {changeDetection: ChangeDetectionStrategy.Default}
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Change Size', () => {
        expect(fixture.nativeElement.querySelector('.fd-avatar--m')).toBeTruthy();

        component.size = 'xs';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--xs')).toBeTruthy();

        component.size = 's';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--s')).toBeTruthy();

        component.size = 'l';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--l')).toBeTruthy();

        component.size = 'xl';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--xl')).toBeTruthy();
    });

    it('Should Add Glyph', () => {
        component.glyph = 'group';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.sap-icon--group')).toBeTruthy();
    });

    it('Should Add Circle Design', () => {
        component.circle = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--circle')).toBeTruthy();
    });

    it('Should Add Transparent Background', () => {
        component.transparent = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--transparent')).toBeTruthy();
    });

    it('Should Add Placeholder Background', () => {
        component.placeholder = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--placeholder')).toBeTruthy();
    });

    it('Should Add Tile Background', () => {
        component.tile = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--tile')).toBeTruthy();
    });

    it('Should Add Accent Color', () => {
        component.colorAccent = 1;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--accent-color-1')).toBeTruthy();

        component.colorAccent = 5;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--accent-color-5')).toBeTruthy();

        component.colorAccent = 10;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--accent-color-10')).toBeTruthy();
    });

    it('Should Add Border', () => {
        component.border = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar--border')).toBeTruthy();
    });

    it('Should Add Zoom Icon', () => {
        component.zoomGlyph = 'edit';
        fixture.detectChanges();
        const zoomElement = fixture.debugElement.nativeElement;
        expect(zoomElement.querySelector('.fd-avatar__zoom-icon')).toBeTruthy();
        expect(zoomElement.querySelector('.sap-icon--edit')).toBeTruthy();
    });

    it('Should Add Abbreviate', () => {
        component.label = 'Jane Doe';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerText).toEqual('JD');

        component.label = 'Marjolein van Veen';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerText).toEqual('MvV');
    });
});
