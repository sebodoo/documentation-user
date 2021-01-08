(function ($) {

    // Customize the page TOC
    document.addEventListener('DOMContentLoaded', () => {
        const pageTOC = document.getElementById('o_page_toc'); // The <aside> elem of the local toc
        if (pageTOC) { // The local toctree is not included for toctree pages (see layout.html)
            const headingRefs = pageTOC.querySelectorAll('a'); // The references to all headings

            // If the page TOC has less than 2 headings, in addition to the title, hide it entirely
            if (headingRefs.length <= 2) {
                _hidePageTOC(pageTOC);
                return
            }

            // Allow to hide the TOC entry referring the title (<h1> heading)
            _flagFirstHeadingRef(headingRefs);

            // Allow to automatically collapse and expand TOC entries
            _prepareAccordion(pageTOC);

            // Allow to respectively highlight and expand the TOC entries and their related TOC
            // entry list whose section is focused.
            _flagActiveTocEntriesAndLists(headingRefs, pageTOC);
        }
    });

    /**
     * Add the relevant classes on the TOC entries (and lists) whose section is focused.
     *
     * TOC entries whose section is focused (<li> elements) receive the `active` class and their
     * related TOC entry list (<ul> elements) receive the `show` class.
     *
     * @param {NodeList} headingRefs - The references to the headings of the page
     * @param {HTMLElement} pageToc - The tree of contents of the page
     */
    const _flagActiveTocEntriesAndLists = (headingRefs, pageToc) => {

        const _updateFlags = () => {
            const activeHeadingRef = _findActiveHeadingRef();
            if (
                lastActiveHeadingRef // `undefined` on the first update
                && activeHeadingRef.href === lastActiveHeadingRef.href
            ) {
                return; // The focus didn't change
            }
            _unflagAll(pageToc);
            _flagActiveHierarchy(activeHeadingRef, pageToc);
            // Store to avoid updating later if the focus didn't change
            lastActiveHeadingRef = activeHeadingRef;
        };

        const _findActiveHeadingRef = () => {
            let activeHeadingRef = headingRefs[0];
            headingRefs.forEach(headingRef => {
                const href = headingRef.getAttribute('href');
                if (href !== '#') {
                    const sectionId = href.substring(1); // Trim the '#'
                    // The DOM is searched with querySelector rather than getElementById because
                    // auto-documented modules generate ids containing a '.' which would make the
                    // search fail.
                    const section = document.querySelector(`section[id="${sectionId}"]`);
                    // The focused section is the last one with a smaller offset from top than the
                    // current user scrolling offset.
                    if (section.offsetTop < window.pageYOffset) {
                        activeHeadingRef = headingRef;
                    } else {
                        return activeHeadingRef;
                    }
                }
            });
            return activeHeadingRef;
        };

        const _unflagAll = (pageToc) => {
            pageToc.querySelectorAll('li,ul').forEach(element => {
                element.classList.remove('active', 'show');
            })
        };

        const _flagActiveHierarchy = (headingRef, pageToc) => {
            let tocEntry = headingRef.parentElement;
            while (tocEntry !== pageToc) {
                if (tocEntry.tagName === 'LI') {
                    tocEntry.classList.add('active'); // Highlight all <li> in the active hierarchy
                    const relatedTocEntryList = tocEntry.querySelector('ul');
                    if (relatedTocEntryList) {
                        relatedTocEntryList.classList.add('show'); // Expand all related <ul>
                    }
                }
                tocEntry = tocEntry.parentElement;
            }
        };

        let lastActiveHeadingRef = undefined; // Init as `undefined` to allow an initial update
        _updateFlags(); // Flag initially active sections before the first scroll event
        document.onscroll = _updateFlags;
    };

    /**
     * Add the class `o_page_toc_title` on the first heading reference.
     *
     * @param {NodeList} headingRefs - The references to the headings of the page
     */
    const _flagFirstHeadingRef = (headingRefs) => {
        headingRefs[0].classList.add('o_page_toc_title');
    };

    /**
     * Entirely hide the local tree of contents.
     *
     * @param {HTMLElement} pageToc - The tree of contents of the page
     */
    const _hidePageTOC = (pageToc) => {
        pageToc.style.visibility = 'hidden';
    };

    /**
     * Update the page TOC entries and heading references to allow collapsing them.
     *
     * @param {HTMLElement} pageToc - The tree of contents of the page
     */
    const _prepareAccordion = (pageToc) => {
        // Start at the second TOC entry list (<ul>) to avoid collapsing the entire TOC
        const pageTocRoot = pageToc.querySelectorAll('ul')[1];
        pageTocRoot.querySelectorAll('ul').forEach(tocEntryList => {
            const relatedHeadingRef = tocEntryList.previousSibling; // The preceding <a> element
            tocEntryList.id = `o_target_${relatedHeadingRef.getAttribute('href').substring(1)}`
            tocEntryList.classList.add('collapse');
            relatedHeadingRef.setAttribute('data-bs-target', `#${tocEntryList.id}`);
            relatedHeadingRef.setAttribute('data-bs-toggle', 'collapse');
        });
    };

})();
