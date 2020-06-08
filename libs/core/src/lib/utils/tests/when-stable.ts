import { ComponentFixture } from '@angular/core/testing';

export async function whenStable(fixture: ComponentFixture<any>) {
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
}
