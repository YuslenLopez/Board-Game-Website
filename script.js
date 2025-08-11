//Short cuts: 
// turning the html collection in to js array and then loop through elements and add class  
// Array.from(linkList).forEach(el => el.classList.add('linkList-light'));

//short cut end -------------------





// nav bar Toggle button 
const toggleLight=document.getElementById("navbutton");
const body = document.body;



// Check for saved theme preference on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode'); 
   
}
//function
toggleLight.addEventListener('click', () => {
    
    body.classList.toggle('light-mode');
    // Save theme preference to localStorage
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } 
    else {
    localStorage.setItem('theme', 'dark'); // Or remove the item entirely
    }
});





//RSVP Participants 
window.addEventListener('DOMContentLoaded', function() {
  const rsvpForm = document.getElementById("Form");
  console.log(rsvpForm); // Check if it's retrieved correctly
  // your code here


    const validateForm = (event) =>{
        event.preventDefault();

        // Get input values and elements
        const nameInput = document.getElementById("RSVPName");
        const emailInput = document.getElementById("RSVPEmail");
        const checkboxes = [
            document.getElementById("RSVPCheckbox"),
            document.getElementById("RSVPCheckbox-2"),
            document.getElementById("RSVPCheckbox-3")
        ];

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const checkedEvents = checkboxes.filter(cb => cb.checked);

        // Reset all input highlights
        nameInput.style.border = "";
        emailInput.style.border = "";
        checkboxes.forEach(cb => cb.nextElementSibling.style.color = "");

        let hasError = false;

        if (!name) {
            nameInput.style.border = "2px solid red";
            hasError = true;
        }

        if (!email || !isEmailValid) {
            emailInput.style.border = "2px solid red";
            hasError = true;
        }

        if (checkedEvents.length === 0) {
            checkboxes.forEach(cb => cb.nextElementSibling.style.color = "red");
            hasError = true;
        }

        if (hasError) return;

        // Add name to appropriate event lists
        if (checkboxes[0].checked) addToEvent("RSVP-event1", name);
        if (checkboxes[1].checked) addToEvent("RSVP-event2", name);
        if (checkboxes[2].checked) addToEvent("RSVP-event3", name);

        // Show modal after success
        const modal = document.getElementById("success-modal");
        const successMessage = document.getElementById("success-message");
        const closeModal = document.getElementById("close-modal");

        successMessage.textContent = "Welcome aboard, " + nameInput.value + "!";
        modal.style.display = "flex";

        // Hide modal automatically after 5 seconds
        setTimeout(() => {
            modal.style.display = "none";
        }, 5000);

        // Allow manual close
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        });

        // Reset form
        rsvpForm.reset();
    };

    function addToEvent(eventId, name) {
        const ul = document.querySelector(`#${eventId} ul`);
        const emptySlot = Array.from(ul.children).find(li => li.textContent.trim() === "");

        if (emptySlot) {
            emptySlot.textContent = name;
        } 
        else {
            alert(`Sorry, ${eventId.replace('RSVP-', '').replace('-', ' ')} is full!`);
        }
    }
    
   

    rsvpForm.addEventListener("submit", validateForm);
   


});




