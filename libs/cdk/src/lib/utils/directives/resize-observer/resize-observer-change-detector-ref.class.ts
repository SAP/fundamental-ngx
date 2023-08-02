import { ChangeDetectorRef } from '@angular/core';

/** @hidden
 * Sometimes we need to provide change detector ref to the directive
 * */
export abstract class ResizeObserverChangeDetectorRef extends ChangeDetectorRef {}
