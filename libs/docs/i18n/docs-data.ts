import { SectionInterface, SectionInterfaceContent } from '@fundamental-ngx/docs/shared';

const guides: SectionInterfaceContent[] = [
    {
        name: 'Home',
        url: 'i18n/home'
    },
    {
        name: 'Writing translations',
        url: 'i18n/writing-translations'
    }
];

const utilities: SectionInterfaceContent[] = [
    {
        name: 'Loading translations',
        url: 'i18n/loading-translations'
    },
    {
        name: 'Changing translations',
        url: 'i18n/changing-translations'
    },
    {
        name: 'Resolving translations',
        url: 'i18n/resolver'
    },
    {
        name: 'Patch translations',
        url: 'i18n/patch'
    }
];

export const sections: SectionInterface[] = [
    {
        header: 'Guides',
        content: guides
    },
    {
        header: 'Utilities',
        content: utilities
    }
];
