import { ComponentFixture } from '@angular/core/testing';

export async function whenStable(fixture: ComponentFixture<any>): Promise<void> {
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
}
