import { OverflowPopoverContent } from './overflow-popover-content.interface';

export interface OverflowContainer {
    registerPopoverContent(content: OverflowPopoverContent): void;
}
