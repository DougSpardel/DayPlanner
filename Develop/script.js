$(function () {
    // Function to display the current date
    function displayCurrentDate() {
      // Get the current date in the format "Day of the week, Month Day"
      var currentDate = dayjs().format('dddd, MMMM D');
      $('#currentDay').text(currentDate);
    }
  
    // Function to update the time blocks' styling based on the current time
    function updateTimeBlocks() {
      // Get the current hour using Day.js
      var currentHour = dayjs().hour();
  
      // Loop through each time block element
      $('.time-block').each(function () {
        // Extract the hour from the element's ID
        var blockHour = parseInt($(this).attr('id').split('-')[1]);
  
        // Apply different classes based on the comparison with the current hour
        if (blockHour < currentHour) {
          $(this).removeClass('present future').addClass('past');
        } else if (blockHour === currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
  
    // Function to load saved events from local storage
    function loadEvents() {
      // Loop through each time block element
      $('.time-block').each(function () {
        // Get the ID of the time block
        var blockId = $(this).attr('id');
        // Retrieve the saved event from local storage
        var savedEvent = localStorage.getItem(blockId);
  
        // If a saved event exists, set it as the textarea value
        if (savedEvent) {
          $(this).find('textarea').val(savedEvent);
        }
      });
    }
  
    // Event listener for the "Save" button click
    $('.saveBtn').on('click', function () {
      // Get the ID of the parent time block
      var blockId = $(this).closest('.time-block').attr('id');
      // Get the text from the textarea
      var eventText = $(this).siblings('.description').val();
  
      // Save the event text to local storage using the block ID as the key
      localStorage.setItem(blockId, eventText);
    });
  
    // Call the functions to initialize the page
    displayCurrentDate();
    updateTimeBlocks();
    loadEvents();
  });
  