$(document).ready(function () {
    function test() {
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position().top;
        var itemPosNewAnimLeft = activeItemNewAnim.position().left;
        $(".hori-selector").css({
            "top": itemPosNewAnimTop + "px",
            "left": itemPosNewAnimLeft + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click", "li", function (e) {
            $('#navbarSupportedContent ul li').removeClass("active");
            $(this).addClass('active');
            var activeWidthNewAnimHeight = $(this).innerHeight();
            var activeWidthNewAnimWidth = $(this).innerWidth();
            var itemPosNewAnimTop = $(this).position().top;
            var itemPosNewAnimLeft = $(this).position().left;
            $(".hori-selector").css({
                "top": itemPosNewAnimTop + "px",
                "left": itemPosNewAnimLeft + "px",
                "height": activeWidthNewAnimHeight + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }

    setTimeout(test, 100);

    // Add active class on another-page move
    var path = window.location.pathname.split("/").pop();

    // Account for home page with empty path
    if (path == '') {
        path = 'index.html';
    }

    var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
    // Add active class to target link
    target.parent().addClass('active');
    setTimeout(test, 100); // Adjust selector position

    $("#contact-me-section").hide();

    // Event listeners for navbar links
    $("a[href='#projects-section']").click(function () {
        $("#about-me-section").hide();
        $("#contact-me-section").hide();
        $("#achievements-section").hide();
        $("#projects-section").show();
    });

    $("a[href='#about-me-section']").click(function () {
        $("#projects-section").hide();
        $("#contact-me-section").hide();
        $("#achievements-section").hide();
        $("#about-me-section").show();
    });

    $("a[href='#contact-me-section']").click(function () {
        $("#projects-section").hide();
        $("#about-me-section").hide();
        $("#achievements-section").hide();
        $("#contact-me-section").show();
    });

    $("a[href='#achievements-section']").click(function () {
        $("#projects-section").hide();
        $("#about-me-section").hide();
        $("#contact-me-section").hide();
        $("#achievements-section").show();
    });
});

$(window).on('resize', function () {
    setTimeout(test, 500);
});

$(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300).toggleClass('show');
    setTimeout(test, 300);
});

// Function to initialize a slideshow
function initSlideshow(slideshowContainer, imageClass, leftArrowId, rightArrowId, circleClass) {
    var imageSlides = slideshowContainer.getElementsByClassName(imageClass);
    var circles = slideshowContainer.getElementsByClassName(circleClass);
    var leftArrow = slideshowContainer.querySelector(leftArrowId);
    var rightArrow = slideshowContainer.querySelector(rightArrowId);
    var counter = 0;

    // HIDE ALL IMAGES FUNCTION
    function hideImages() {
        for (var i = 0; i < imageSlides.length; i++) {
            imageSlides[i].classList.remove('visible');
        }
    }

    // REMOVE ALL DOTS FUNCTION
    function removeDots() {
        for (var i = 0; i < circles.length; i++) {
            circles[i].classList.remove('dot');
        }
    }

    // SINGLE IMAGE LOOP/CIRCLES FUNCTION
    function imageLoop() {
        var currentImage = imageSlides[counter];
        var currentDot = circles[counter];
        currentImage.classList.add('visible');
        removeDots();
        currentDot.classList.add('dot');
        counter++;
    }

    // LEFT & RIGHT ARROW FUNCTION & CLICK EVENT LISTENERS
    function arrowClick(e) {
        var target = e.target;
        if (target == leftArrow) {
            clearInterval(imageSlideshowInterval);
            hideImages();
            removeDots();
            if (counter == 1) {
                counter = (imageSlides.length - 1);
                imageLoop();
                imageSlideshowInterval = setInterval(slideshow, 10000);
            } else {
                counter--;
                counter--;
                imageLoop();
                imageSlideshowInterval = setInterval(slideshow, 10000);
            }
        } else if (target == rightArrow) {
            clearInterval(imageSlideshowInterval);
            hideImages();
            removeDots();
            if (counter == imageSlides.length) {
                counter = 0;
                imageLoop();
                imageSlideshowInterval = setInterval(slideshow, 10000);
            } else {
                imageLoop();
                imageSlideshowInterval = setInterval(slideshow, 10000);
            }
        }
    }

    leftArrow.addEventListener('click', arrowClick);
    rightArrow.addEventListener('click', arrowClick);

    // IMAGE SLIDE FUNCTION
    function slideshow() {
        if (counter < imageSlides.length) {
            imageLoop();
        } else {
            counter = 0;
            hideImages();
            imageLoop();
        }
    }

    // SHOW FIRST IMAGE, & THEN SET & CALL SLIDE INTERVAL
    setTimeout(slideshow, 1000);
    var imageSlideshowInterval = setInterval(slideshow, 10000);
}

// Initialize slideshows for different project sections
document.addEventListener('DOMContentLoaded', function () {
    var project1SlideshowContainer = document.querySelector('.project1 .slideshowContainer');
    var project3SlideshowContainer = document.querySelector('.project3 .slideshowContainer');
    var faceLoginSlideshowContainer = document.querySelector('.face_login .slideshowContainer');

    if (project1SlideshowContainer) {
        initSlideshow(project1SlideshowContainer, 'imageSlides', '#leftArrow1', '#rightArrow1', 'circle');
    }

    if (project3SlideshowContainer) {
        initSlideshow(project3SlideshowContainer, 'imageSlides', '#leftArrow', '#rightArrow', 'circle');
    }

    if (faceLoginSlideshowContainer) {
        initSlideshow(faceLoginSlideshowContainer, 'imageSlides', '#leftArrow1', '#rightArrow1', 'circle');
    }
});

// Real-time validation for the contact form
$('#name').on('input', function () {
    validateName();
});

$('#email').on('input', function () {
    validateEmail();
});

$('#phone').on('input', function () {
    validatePhone();
});

$('#message').on('input', function () {
    validateMessage();
});

function validateName() {
    var nameInput = $('#name');
    var nameValue = nameInput.val().trim();
    if (nameValue === '') {
        nameInput.removeClass('valid').addClass('invalid');
    } else {
        nameInput.removeClass('invalid').addClass('valid');
    }
}

function validateEmail() {
    var emailInput = $('#email');
    var emailValue = emailInput.val().trim();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailValue)) {
        emailInput.removeClass('valid').addClass('invalid');
    } else {
        emailInput.removeClass('invalid').addClass('valid');
    }
}

function validatePhone() {
    var phoneInput = $('#phone');
    var phoneValue = phoneInput.val().trim();
    var phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneValue)) {
        phoneInput.removeClass('valid').addClass('invalid');
    } else {
        phoneInput.removeClass('invalid').addClass('valid');
    }
}

function validateMessage() {
    var messageInput = $('#message');
    var messageValue = messageInput.val().trim();
    if (messageValue === '') {
        messageInput.removeClass('valid').addClass('invalid');
    } else {
        messageInput.removeClass('invalid').addClass('valid');
    }
}

// Form submission handling
$('#contact-form').submit(function (event) {
    event.preventDefault(); // Prevent form submission
    // Validate all fields before submission
    validateName();
    validateEmail();
    validatePhone();
    validateMessage();
    // If all fields are valid, submit the form
    if ($('#name').hasClass('valid') && $('#email').hasClass('valid') && $('#phone').hasClass('valid') && $('#message').hasClass('valid')) {
        this.submit();
    } else {
        // If any field is invalid, display an error message or take appropriate action
        alert('Please fill out all fields correctly.');
    }
});