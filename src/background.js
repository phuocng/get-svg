((ext) => {
    const copyHtmlMenu = ext.contextMenus.create({
        title: 'Copy HTML code',
        contexts: ['all'],
        onclick: (info, tab) => {
            ext.tabs.sendMessage(tab.id, {
                action: 'ACTION_COPY',
            });
        },
    });

    const downloadMenu = ext.contextMenus.create({
        title: 'Download',
        contexts: ['all'],
    });
})(chrome || browser);
