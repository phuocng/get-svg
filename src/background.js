((ext) => {
    const copyHtmlMenu = ext.contextMenus.create({
        title: 'Copy HTML code',
        contexts: ['all'],
        enabled: false,
        onclick: (info, tab) => {
            ext.tabs.sendMessage(tab.id, {
                action: 'BACKGROUND_ACTION_COPY',
            });
        },
    });

    const downloadMenu = ext.contextMenus.create({
        title: 'Download',
        contexts: ['all'],
        enabled: false,
        onclick: (info, tab) => {
            ext.tabs.sendMessage(tab.id, {
                action: 'BACKGROUND_ACTION_DOWNLOAD',
            });
        },
    });

    const handleMessage = (request, sender, sendResponse) => {
        switch (request.action) {
            case 'CONTENT_ACTION_SELECT_ELEMENT':
                [copyHtmlMenu, downloadMenu].forEach(item => {
                    ext.contextMenus.update(item, {
                        enabled: request.data.enabled,
                    });
                });
                break;
            default:
                break;
        }
    };

    ext.runtime.onMessage.addListener(handleMessage);
})(chrome || browser);
