((ext) => {
    let currentSvgEle;

    const copyToClipboard = (text) => {
        const textAreaEle = document.createElement('textarea');

        textAreaEle.style.border = '0';
        textAreaEle.style.padding = '0';
        textAreaEle.style.margin = '0';
        textAreaEle.style.position = 'absolute';
        textAreaEle.style.left = '-9999px';
        textAreaEle.style.top = `0px`;

        textAreaEle.value = text;

        document.body.appendChild(textAreaEle);

        textAreaEle.focus();
        textAreaEle.select();

        // Execute the "copy" command
        try {
            document.execCommand('copy');
        } catch (err) {
            // Unable to copy
        } finally {
            document.body.removeChild(textAreaEle);
        }
    };

    const handleMouseDown = (e) => {
        // Only handle the right-click event
        if (e.button !== 2) {
            currentSvgEle = null;
            return; 
        }
        // console.log(e.target.closest('svg'), e.target.tagName);

        const tagName = e.target.tagName;
        switch (tagName) {
            // Ignore deprecated elements
            case 'altGlyph':
            case 'altGlyphDef':
            case 'altGlyphItem':
            case 'animateColor':
            case 'color-profile':
            case 'cursor':
            case 'font':
            case 'font-face':
            case 'font-face-format':
            case 'font-face-name':
            case 'font-face-src':
            case 'font-face-uri':
            case 'glyph':
            case 'glyphRef':
            case 'hkern':
            case 'missing-glyph':
            case 'tref':
            case 'vkern':
                console.info(`Get SVG: ${tagName} isn't supported`);
                currentSvgEle = null;
                break;
            
            // These tags should belong to a SVG element
            case 'animate':
            case 'animateMotion':
            case 'animateTransform':
            case 'circle':
            case 'clipPath':
            case 'defs':
            case 'desc':
            case 'ellipse':
            case 'feBlend':
            case 'feColorMatrix':
            case 'feComponentTransfer':
            case 'feComposite':
            case 'feConvolveMatrix':
            case 'feDiffuseLighting':
            case 'feDisplacementMap':
            case 'feDistantLight':
            case 'feFlood':
            case 'feFuncA':
            case 'feFuncB':
            case 'feFuncG':
            case 'feFuncR':
            case 'feGaussianBlur':
            case 'feImage':
            case 'feMerge':
            case 'feMergeNode':
            case 'feMorphology':
            case 'feOffset':
            case 'fePointLight':
            case 'feSpecularLighting':
            case 'feSpotLight':
            case 'feTile':
            case 'feTurbulence':
            case 'filter':
            case 'foreignObject':
            case 'g':
            case 'image':
            case 'line':
            case 'linearGradient':
            case 'marker':
            case 'mask':
            case 'metadata':
            case 'mpath':
            case 'path':
            case 'pattern':
            case 'polygon':
            case 'polyline':
            case 'radialGradient':
            case 'rect':
            case 'set':
            case 'stop':
            case 'switch':
            case 'symbol':
            case 'text':
            case 'textPath':
            case 'tspan':
            case 'view':
                currentSvgEle = null;
                break;
            
            // TODO: Some common tags that can be used within a SVG
            // See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a
            case 'a':
            case 'script':
            case 'style':
            case 'title':
                currentSvgEle = null;
                break;

            case 'use':
                // Note that some `use` elements contains `svg` as a shadow
                //  <svg>
                //      <use>
                //          #shadow-root
                //          <svg>...</svg>
                //      </use>
                //  <svg>
                currentSvgEle = null;
                break;

            case 'svg':
                currentSvgEle = e.target;
                break;

            default:
                currentSvgEle = null;
                break;
        }
    };

    // Get the message from `background.js`
    const handleMessage = (request, sender, sendResponse) => {
        switch (request.action) {
            case 'ACTION_COPY':
                if (currentSvgEle) {
                    copyToClipboard(currentSvgEle.outerHTML);
                }
                break;

            default:
                break;
        }
    };

    ext.runtime.onMessage.addListener(handleMessage);

    document.addEventListener('mousedown', handleMouseDown, false);
})(chrome || browser);