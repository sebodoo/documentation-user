(function ($) {

    document.addEventListener('DOMContentLoaded', function () {
        const content = document.getElementById('o_content');

        // Enforce the presence of the `img-fluid` class on all images in the body
        content.querySelectorAll('img').forEach(image => {
            image.classList.add('img-fluid');
        });

        // TODO EDI bring back css logic linked to has_permalink_marker and mdi-content-link.
        // Add permalink anchors next to body sections
        content.querySelectorAll('section').forEach(section => {
            const heading = section.querySelector('h1,h2,h3,h4,h5,h6');
            if (heading) {
                const permalinkMarker = document.createElement('i');
                permalinkMarker.className = 'mdi-content-link';

                heading.classList.add('o_has_permalink_marker');
                heading.append(permalinkMarker);

                // VFE TODO or only specify the href on the i element ?
                // do we need this onclick logic ?
                permalinkMarker.onclick = () => {
                    section.scrollIntoView();
                    window.location.hash = section.id;
                };
            }
        });
    });

})();
