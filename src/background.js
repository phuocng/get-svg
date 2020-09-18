((ext) => {
    const copyHtmlMenu = ext.contextMenus.create({
        title: 'Copy HTML code',
        contexts: ['all']
    });

    const downloadMenu = ext.contextMenus.create({
        title: 'Download',
        contexts: ['all']
    });
})(chrome || browser);
