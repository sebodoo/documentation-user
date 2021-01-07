(function ($) {

    document.addEventListener('DOMContentLoaded', () => {
        const pageTOC = document.getElementById('o_page_toc'); // The <aside> elem of the local toc
        if (pageTOC) { // The local toctree is not included for toctree pages (see layout.html)
            const headingRefs = pageTOC.querySelectorAll('a'); // The references to all headings

            // Always hide the TOC entry targeting the title (<h1> heading)
            _flagFirstHeadingRef(headingRefs);

            // If the page TOC has less than 2 headings, in addition to the title, hide it entirely
            if (headingRefs.length <= 2) {
                _hidePageTOC(pageTOC);
            }
        }
    });

    /**
     * Add the class `o_page_toc_title` on the first heading reference.
     *
     * @param {NodeList} headingRefs - The references to the headings of the page
     * @return {undefined}
     */
    const _flagFirstHeadingRef = (headingRefs) => {
        headingRefs[0].classList.add('o_page_toc_title');
    };

    /**
     * Entirely hide the local tree of contents.
     *
     * @param {object} pageTOC - The tree of contents of the page
     * @return {undefined}
     */
    const _hidePageTOC = (pageTOC) => {
        pageTOC.style.visibility = 'hidden';
    }

})();
