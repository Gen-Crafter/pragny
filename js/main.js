(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);

//  newsletter subscription
  document.getElementById("submitBtn").addEventListener("click", function () {
        const emailInput = document.getElementById("emailInput");
        const emailError = document.getElementById("emailError");
        const email = emailInput.value.trim();

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            emailError.style.display = "block";
            return;
        }

        emailError.style.display = "none"; // hide error

        // Disable the button while processing (optional UX improvement)
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;

        // Send POST request to backend
        fetch("https://gc-backend-23760107377.us-central1.run.app/api/v1/auth/add-news-letter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            submitBtn.disabled = false; // re-enable button

            if (!response.ok) {
                throw new Error("Server error");
            }
            return response.json();
        })
        .then(data => {
            // Only show success popup after successful DB save
            // alert("✅ Success! You are now subscribed with: " + email);
            Swal.fire({
    icon: 'success',
    title: 'Subscribed!',
    text: 'You are now subscribed with: ' + email
});
            emailInput.value = ""; // Clear the input
        })
        .catch(error => {
            submitBtn.disabled = false;
            console.error("Error:", error);
            // alert("❌ Oops! Something went wrong while saving your email. Please try again.");
            Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong while saving your email!',
});
             emailInput.value = ""; // Clear the input

        });
    });