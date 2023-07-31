import { Reflection, JSX as React, JSX, DefaultThemeRenderContext } from 'typedoc';
import { fixedMarkdown } from '../utils';

export function commentSummary(context: DefaultThemeRenderContext, props: Reflection) {
    if (!props.comment?.summary.some((part) => part.text)) return;

    return (
        <>
            {props.comment.hasVisibleComponent() && (
                <div class="tsd-comment tsd-typography">
                    <div class="lead">
                        <JSX.Raw html={fixedMarkdown(context.markdown, props.comment.summary)} />
                    </div>
                </div>
            )}
        </>
    );
}
