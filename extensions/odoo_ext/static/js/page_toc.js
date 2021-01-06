(function ($) {

    document.addEventListener('DOMContentLoaded', function () {

        // Hide the local table of contents if empty
        // there is always one element (hidden by css) which is the title of the page
        // + the sections defined on the page
        const pageMenu = document.getElementById('o_on_page'); // aside
        if (pageMenu) {
            // on toctree pages, the sidebar isn't shown (on jinja level)
            const menuItems = pageMenu.querySelectorAll('li');

            if (menuItems.length <= 2) {
                // change to 1 if we want to show tocs with only one section.
                pageMenu.style.visibility = 'hidden';
            }

        }

    });
})();
