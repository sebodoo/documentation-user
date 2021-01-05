(function ($) {

    $(document).ready(function () {

        // enforce the presence of the class img-fluid on all images in the body.
        // Was done in the translator previously, but easier to code and maintain in js.
        document.getElementById('o_content').querySelectorAll("img").forEach(image => {
            image.classList.add('img-fluid');
        });

    });
})(jQuery);
