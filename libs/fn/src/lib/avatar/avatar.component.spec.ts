import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AvatarModule, AvatarComponent, AvatarColor } from '@fundamental-ngx/fn/avatar';

@Component({
    selector: 'fn-test-avatar',
    template: `<fn-avatar
        [size]="size"
        [glyph]="glyph"
        [circle]="circle"
        [label]="label"
        [color]="color"
        [image]="image"
    >
    </fn-avatar>`
})
class TestComponent {
    size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
    circle = false;
    label: string | null = null;
    glyph: string | null = null;
    color: AvatarColor | null = null;
    image: string | null = null;
}

describe('AvatarComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [AvatarModule]
            })
                .overrideComponent(AvatarComponent, {
                    set: { changeDetection: ChangeDetectionStrategy.Default }
                })
                .compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('Should Create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Change Color', () => {
        component.color = 'crimson';

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fn-avatar--crimson')).toBeTruthy();
    });

    it('Should Change Size', () => {
        expect(fixture.nativeElement.querySelector('.fn-avatar--m')).toBeTruthy();

        component.size = 'xs';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fn-avatar--xs')).toBeTruthy();

        component.size = 's';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fn-avatar--s')).toBeTruthy();

        component.size = 'l';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fn-avatar--l')).toBeTruthy();

        component.size = 'xl';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fn-avatar--xl')).toBeTruthy();
    });

    it('Should Add Glyph', () => {
        component.glyph = 'group';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.sap-icon--group')).toBeTruthy();
    });

    it('Should Add Circle Design', () => {
        component.circle = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fn-avatar--circle')).toBeTruthy();
    });

    it('Should Add Abbreviate', () => {
        component.label = 'Jane Doe';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerText).toEqual('JD');

        component.label = 'Marjolein van Veen';
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerText).toEqual('MvV');
    });

    it('Should Add Background Image', async () => {
        component.image = 'https://picsum.photos/id/1025/400';
        fixture.detectChanges();

        // Wait for image to load
        await new Promise((resolve) => setTimeout(() => resolve(null), 1000));

        expect(fixture.nativeElement.querySelector('.fn-avatar__thumbnail')).toBeTruthy();
    });
});
