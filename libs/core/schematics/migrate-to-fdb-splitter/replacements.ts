export const regexReplacements = new Map<RegExp, string>([
    [/@fundamental-ngx\/core\/splitter/g, '@fundamental-ngx/btp/splitter'],

    [/<fd-splitter /g, '<fdb-splitter '],
    [/<\/fd-splitter/g, '</fdb-splitter'],

    [/<fd-splitter-split-pane/g, '<fdb-splitter-split-pane'],
    [/<\/fd-splitter-split-pane/g, '</fdb-splitter-split-pane'],

    [/<fd-splitter-resizer/g, '<fdb-splitter-resizer'],
    [/<\/fd-splitter-resizer/g, '</fdb-splitter-resizer'],

    [/<fd-splitter-pane-container/g, '<fdb-splitter-pane-container'],
    [/<\/fd-splitter-pane-container/g, '</fdb-splitter-pane-container'],

    [/<fd-splitter-pagination/g, '<fdb-splitter-pagination'],
    [/<\/fd-splitter-pagination/g, '</fdb-splitter-pagination']
]);
