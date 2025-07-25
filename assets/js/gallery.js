
$(document).ready(function(){
    // Initialize Isotope
    var $grid = $('.gallery-grid-items').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Function to initialize Magnific Popup only for visible items
    function initPopup() {
        $('.gallery-grid-items').magnificPopup({
            delegate: '.grid-item:visible .popup-image', // only visible filtered items
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    // Initial Lightbox init
    initPopup();

    // On filter button click
    $('.bd-gallery__button').on('click', 'button', function(){
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $('.bd-gallery__button button').removeClass('active');
        $(this).addClass('active');

        // Destroy previous popup to refresh filtered set
        $('.gallery-grid-items').magnificPopup('destroy');

        // Reinitialize popup for new filtered items
        initPopup();
    });
});