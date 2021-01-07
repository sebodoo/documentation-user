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

            // Hide the TOC entry referring the title (<h1> heading)
            _flagFirstHeadingRef(headingRefs);

            // Add the class `active` on reference (& its parents) whose heading is in the viewport
            _flagActiveTOCEntries(headingRefs, pageTOC);

            // Set up Bootstrap's `accordion-*` classes
            _setUpAccordion(pageTOC);
        }
    });

    /**
     * Add the class `o_page_toc_title` on the first heading reference.
     *
     * @param {NodeList} headingRefs - The references to the headings of the page
     * @param {HTMLElement} pageToc - The tree of contents of the page
     */
    const _flagActiveTOCEntries = (headingRefs, pageToc) => {
        const _findFocusedSectionHeadingRef = () => {
            let focusedSectionHeadingRef = headingRefs[0];
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
                        focusedSectionHeadingRef = headingRef;
                    } else {
                        return focusedSectionHeadingRef;
                    }
                }
            });
            return focusedSectionHeadingRef;
        }

        const _unflagAllTOCEntries = (pageTOC) => {
            pageTOC.querySelectorAll('li').forEach(tocEntry => {
                tocEntry.classList.remove('active');
            })
        }

        const _flagTOCEntryHierarchy = (headingRef, pageTOC) => {
            let parent = headingRef.parentElement; // Start by traversing up to the TOC entry
            while (parent !== pageTOC) {
                if (parent.tagName.toLowerCase() === 'li') { // Only flag TOC entries
                    parent.classList.add('active');
                }
                parent = parent.parentElement;
            }
        };

        let lastFocusedHeadingRef = headingRefs[0]; // The default focus is on the title reference
        document.onscroll = () => {
            const focusedSectionHeadingRef = _findFocusedSectionHeadingRef();
            if (focusedSectionHeadingRef.href === lastFocusedHeadingRef.href) {
                return; // The focus didn't change
            }
            _unflagAllTOCEntries(pageToc);
            _flagTOCEntryHierarchy(focusedSectionHeadingRef, pageToc);
            lastFocusedHeadingRef = focusedSectionHeadingRef; // Store to avoid updating later if the focus didn't change
        };
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
     * @param {HTMLElement} pageTOC - The tree of contents of the page
     */
    const _hidePageTOC = (pageTOC) => {
        pageTOC.style.visibility = 'hidden';
    };

    /**
     * Add relevant Bootstrap's accordion-* classes on the page TOC.
     *
     * @param {HTMLElement} pageTOC - The tree of contents of the page
     */
    const _setUpAccordion = (pageTOC) => {
        pageTOC.classList.add('accordion');
        pageTOC.querySelectorAll('*').forEach(element => {
            switch (element.tagName.toLowerCase()) {
                case 'ul':
                    element.classList.add('accordion-collapse');
                    break;
                case 'li':
                    element.classList.add('accordion-item');
                    break;
                case 'a':
                    element.classList.add('accordion-button');
                    const tocEntryList = element.nextSibling // The following <ul> element, if any
                    if (tocEntryList) {
                        // Create a new ID to allow the <a> to reference the related <ul>
                        const tocEntryListId = `target_${element.getAttribute('href').substring(1)}`
                        tocEntryList.setAttribute('id', tocEntryListId);
                        element.setAttribute('data-bs-target', `#${tocEntryListId}`);
                        element.setAttribute('data-bs-toggle', 'collapse');
                    }
                    break;
            }
        });
    };

})();
