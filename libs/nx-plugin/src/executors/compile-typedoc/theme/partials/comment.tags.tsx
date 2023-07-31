import { Reflection, DefaultThemeRenderContext, JSX, JSX as React, ReflectionKind } from 'typedoc';
import { camelToTitleCase, fixedMarkdown } from '../utils';

export function commentTags({ markdown }: DefaultThemeRenderContext, props: Reflection) {
    if (!props.comment) return;

    const tags = props.kindOf(ReflectionKind.SomeSignature)
        ? props.comment.blockTags.filter((tag) => tag.tag !== '@returns')
        : props.comment.blockTags;

    return (
        <div class="tsd-comment tsd-typography">
            <dl class="tsd-comment-tags">
                {tags.map((item) => (
                    <>
                        <dt class="fd-tsd-comment-tag-pill">{camelToTitleCase(item.tag.substring(1))}</dt>
                        <dd>
                            <JSX.Raw html={fixedMarkdown(markdown, item.content)} />
                        </dd>
                    </>
                ))}
            </dl>
        </div>
    );
}
