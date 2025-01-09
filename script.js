$(document).ready(function() {

  // Menu Functions
  $(".menu-btn").on("click", function() {
    $(".link-list").slideToggle(300);
  });
  $(".search-btn").on("click", function() {
    $("#search-form").slideToggle(300);
  });

  // Slider
  let currentIndex = 0;
  const totalImages = $(".slider-list-wrapper li img").length;
  const intervalTime = 5000; // 3 seconds
  let sliderInterval;

  // Function to update the slider position and indicators
  function updateSlider() {
    const sliderWidth = $(".slider-wrapper").width(); // Get the width of the slider
    $(".slider-list-wrapper").css("transform", `translateX(-${currentIndex * sliderWidth}px)`);
    $(".indicator").removeClass("active");
    $(`#indicator${currentIndex + 1}`).addClass("active");
  }

  // Auto slider function
  function startAutoSlider() {
    sliderInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalImages;
      updateSlider();
    }, intervalTime);
  }

  // Stop auto slider
  function stopAutoSlider() {
    clearInterval(sliderInterval);
  }

  // Previous button action
  $("#slider-prev-button").click(function() {
    stopAutoSlider();
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateSlider();
    startAutoSlider();
  });

  // Next button action
  $("#slider-next-button").click(function() {
    stopAutoSlider();
    currentIndex = (currentIndex + 1) % totalImages;
    updateSlider();
    startAutoSlider();
  });

  // Indicator click action
  $(".indicator").click(function() {
    stopAutoSlider();
    currentIndex = $(this).index();
    updateSlider();
    startAutoSlider();
  });

  // Start the auto slider
  startAutoSlider();

  // Pause slider on hover
  $(".slider-container").hover(stopAutoSlider, startAutoSlider);

  // Fetch download counts
  fetch('https://img.shields.io/github/downloads/JelLee11/JelLee-App/total.json')
    .then(response => response.json())
    .then(data => {
      $("#downloadCounts").text(data.value);
    })
    .catch(error => {
      $("#downloadCounts").text("??");
    });

});