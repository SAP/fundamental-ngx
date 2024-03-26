import { JSX, PageEvent, Reflection, RenderTemplate } from 'typedoc';
export function defaultLayout(template: RenderTemplate<PageEvent<Reflection>>, props: PageEvent<Reflection>) {
    return <div class="fd-tsdoc-container">{template(props)}</div>;
}
