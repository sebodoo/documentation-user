(function ($) {

    document.addEventListener('DOMContentLoaded', function () {

        // TODO ANV/VFE move in separate file

        // Hide the local table of contents if empty
        // there is always one element (hidden by css) which is the title of the page
        // + the sections defined on the page
        const pageMenu = document.getElementById('o_on_page'); // aside
        const menuItems = pageMenu.querySelectorAll('li');

        if (menuItems.length <= 2) {
            // change to 1 if we want to show tocs with only one section.
            pageMenu.style.visibility = 'hidden';
        }

    });
})();
