import { OnInit, Inject, Component } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk-experimental/dialog';

@Component({
    templateUrl: 'test-modal.component.html'
})
export class TestModal implements OnInit {
    constructor(@Inject(DIALOG_DATA) public data: any, public dialogRef: DialogRef<TestModal>) {}

    ngOnInit() {
        console.log('data ', this.data);
    }

    close() {
        this.dialogRef.close();
    }
}
