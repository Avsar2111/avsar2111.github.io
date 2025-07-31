$(document).ready(function(){
    // Initialize Isotope
    var $grid = $('.gallery-grid-items').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Function to initialize Magnific Popup for all items in current filter
    function initPopup(filterSelector) {
        // Destroy previous instance
        if ($.magnificPopup.instance) {
            $.magnificPopup.instance.close(); // Close if open
            $('.gallery-grid-items').magnificPopup('destroy');
        }

        // Initialize on all items matching the filter
        $('.gallery-grid-items').magnificPopup({
            delegate: filterSelector + ' .popup-image',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    // Function to log counts
    function logCounts() {
        $('.bd-gallery__button button').each(function(){
            var filter = $(this).attr('data-filter');
            var count = 0;

            if(filter == '*'){
                count = $('.grid-item').length;
            } else {
                count = $('.grid-item' + filter).length;
            }

            // console.log(`Filter: ${filter} | Total Images: ${count}`);
        });
    }

    // Initial Lightbox init for all items
    initPopup('*');

    // Log initial counts
    logCounts();

    // On filter button click
    $('.bd-gallery__button').on('click', 'button', function(){
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $('.bd-gallery__button button').removeClass('active');
        $(this).addClass('active');

        // Reinitialize popup for new filtered items (ALL filtered items, visible or not)
        initPopup(filterValue);

        // Log counts on filter change
        logCounts();
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.bd-gallery__button button');

    buttons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        let count = 0;
        if (filter === '*') {
            count = document.querySelectorAll('.grid-item').length;
        } else {
            count = document.querySelectorAll('.grid-item' + filter).length;
        }

        // // Append count to button text
        // button.textContent += ` (${count})`;

        // console.log(`Filter: ${filter} | Total Images: ${count}`);
    });
});





   $(window).on('load', function(){
    let numToShow = 6;
    let currentIndex = 0;
    let filteredItems = $(".gallery-grid-items .grid-item"); // initially all items

    function showNext(){
        // Hide all items first
        filteredItems.addClass('hidden-item');

        // Calculate items to show
        let endIndex = currentIndex + numToShow;
        if(endIndex > filteredItems.length){
            endIndex = filteredItems.length;
        }

        // Show next set
        for(let i=currentIndex; i<endIndex; i++){
            $(filteredItems[i]).removeClass('hidden-item');
        }

        $('.gallery-grid-items').isotope('layout');
    }

    // Initialize Isotope
    $('.gallery-grid-items').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Initial show
    showNext();

    // When a filter button is clicked
    $(".bd-gallery__button button").on('click', function(){
        let filterValue = $(this).attr('data-filter');

        // Apply Isotope filter
        $('.gallery-grid-items').isotope({ filter: filterValue });

        // Update filteredItems based on new filter
        if(filterValue == '*'){
            filteredItems = $(".gallery-grid-items .grid-item");
        } else {
            filteredItems = $(".gallery-grid-items .grid-item").filter(filterValue);
        }

        // Reset index
        currentIndex = 0;

        // Immediately show first set of filtered items
        showNext();
    });

    // Next button click
    $('#nextBtn').on('click', function(){
        currentIndex += numToShow;
        if(currentIndex >= filteredItems.length){
            currentIndex = 0; // loop back
        }
        showNext();
    });

    // Prev button click
    $('#prevBtn').on('click', function(){
        currentIndex -= numToShow;
        if(currentIndex < 0){
            // go to last set
            currentIndex = Math.max(filteredItems.length - numToShow, 0);
        }
        showNext();
    });

    
    
});


