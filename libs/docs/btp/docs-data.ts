// BEING UPDATED WITH THE SAP-COMPONENT SCHEMATIC; DO NOT MODIFY THE STRUCTURE!
import { SectionInterface, SectionInterfaceContent } from '@fundamental-ngx/docs/shared';

export const guides: SectionInterfaceContent[] = [
    { url: 'btp/home', name: 'Home' },
    { url: 'btp/new-component', name: 'New Component' }
];

export const components: SectionInterfaceContent[] = [
    { url: 'btp/button', name: 'Button' },
    { url: 'btp/navigation', name: 'Navigation' },
    { url: 'btp/search-field', name: 'Search Field' },
    { url: 'btp/tool-header', name: 'Tool Header' },
    { url: 'btp/tool-layout', name: 'Tool Layout' },
    { url: 'btp/user-menu', name: 'User Menu' }
];

export const sections: SectionInterface[] = [
    {
        header: 'Guides',
        content: guides
    },
    {
        header: 'Components',
        content: components
    }
];
