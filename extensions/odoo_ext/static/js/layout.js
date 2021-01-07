(function ($) {

    document.addEventListener('DOMContentLoaded', function () {

        const content = document.getElementById('o_content');
        // enforce the presence of the class img-fluid on all images in the body.
        // Was done in the translator previously, but easier to code and maintain in js.
        content.querySelectorAll("img").forEach(image => {
            image.classList.add('img-fluid');
        });

        // TODO EDI bring back css logic linked to has_permalink_marker and mdi-content-link.
        // Add permalink anchors next to body sections.
        content.querySelectorAll("section").forEach(section => {
            var id = section.id;

            var sectionHeader = section.querySelector("h1,h2,h3,h4,h5,h6");
            if (sectionHeader) {
                const permalinkMarker = document.createElement("i");
                permalinkMarker.className = 'mdi-content-link';

                sectionHeader.classList.add("o_has_permalink_marker");
                sectionHeader.append(permalinkMarker);

                // VFE TODO or only specify the href on the i element ?
                // do we need this onclick logic ?
                permalinkMarker.onclick = event => {
                    section.scrollIntoView();
                    window.location.hash = id;
                };
            }

        });
    });
})();
