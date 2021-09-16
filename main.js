//submit buttons
let submitReviewButton = document.getElementById('review-submit');
let userDetailsButton = document.getElementById('user-details');
let selectMovieOpt = document.getElementById('selectMovie');

//grab sub sections
let allMovies = document.getElementById('all-movies');
let existingData = document.getElementById('ticket-history');


// ### menu items ###
let exploreMoviesMenu = document.getElementById('l-explore-movies-button');
let bookTicketMenu = document.getElementById('l-book-ticket-button');
let ticketHistoryMenu = document.getElementById('l-ticket-history-button');
let referencesMenu = document.getElementById('l-references-button');
// ### sections ####
let exploreMoviesSection = document.getElementById('explore-movies');
let bookTicketSection = document.getElementById('register-form');
let ticketHistorySection = document.getElementById('table-div');
let referencesSection = document.getElementById('references-section');


//display all sections as none
window.onload = () => {
    ticketHistorySection.classList.add('disp-none');
    // exploreMoviesSection.classList.add('disp-none');
    bookTicketSection.classList.add('disp-none');
    referencesSection.classList.add('disp-none');
}
let menuSections = [[exploreMoviesMenu, exploreMoviesSection],
                [bookTicketMenu, bookTicketSection],
                [ticketHistoryMenu, ticketHistorySection],
                [referencesMenu, referencesSection],
]

//working of left side menu
menuSections.forEach((item) => {
    item[0].addEventListener('click', () => {
        item[1].classList.toggle('disp-none');
        //display none others
        menuSections.forEach(others =>{
            if(item[1] != others[1]){
                if(!others[1].classList.contains('disp-none')){
                    others[1].classList.add('disp-none')
                }
            }
        })
    })
})



// #################################### explore movie section ##################################

//get the data
fetch('./movies.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data['AllMovies']);
  })
  .catch(function (err) {
    console.log(err);
  });

function appendData(data){
    data.forEach((item)=>{
        let moviePoster = `
                <div class="movie-poster">
                    <div class="movie-image">
                        <img src='${item.image}' alt='image'>
                    </div>
                    <div class="movie-desc">
                    <p><u>Movie</u>: ${item.name} (${item.year})</p>
                    <p><u>Gener</u>: ${item.genre}</p>
                    <p><u>Duration</u>: ${item.duration}</p>
                    <p><u>Description</u>: ${item.desc}</p>
                    <p><u>IMDb</u>: ${item.rating}</p>
                    </div>
                </div>`;
        allMovies.innerHTML += moviePoster;


        //add movies in booking section
        let oneOpt = `
                    <option value="${item.name}">${item.name}</option>
        `
        selectMovieOpt.innerHTML += oneOpt;
    })

    
}


// #################################### booking section ##################################



userDetailsButton.addEventListener('submit', () => {
    let userDetailsObj = {
        fullname: document.getElementById('fullName').value,
        contact: document.getElementById('contact').value,
        emailId: document.getElementById('emailId').value,
        selectMovie: document.getElementById('selectMovie').value,
        seats: document.getElementById('seats').value,
        timeSlot: document.getElementById('timeSlot').value,
    }
    AddToHistory(userDetailsObj);
})

function AddToHistory(userDetailsObj) {
    let usersArr = []
    usersArr.push(userDetailsObj);
    if (localStorage.getItem('allUsers') === null){
        localStorage.setItem('allUsers', JSON.stringify(usersArr));
    }
    else{
        let localUsers = JSON.parse(localStorage.getItem('allUsers'));//this is an array of objects
        localUsers.push(userDetailsObj);//add new user
        localStorage.setItem('allUsers', JSON.stringify(localUsers));//update localstorage
    }
    showAllHistory();//add recent user to history
    userDetailsButton.reset()
    alert("Your Ticket is confirmed. Enjoy the movie.")

}



showAllHistory();//show all history

function showAllHistory(){
    if (localStorage.getItem('allUsers') != null){
        existingData.innerHTML = '' //clear the earlier and again fill all
        let allLocalUsers = JSON.parse(localStorage.getItem('allUsers'));
        let sr = 1;
        allLocalUsers.forEach((item)=>{
            let newEntry = `<tr>
                        <td>${sr}</td>
                        <td>${item.fullname}</td>
                        <td>${item.contact}</td>
                        <td>${item.selectMovie}</td>
                        <td>${item.seats}</td>
                        <td>${item.timeSlot}</td>
                    </tr>`;
            existingData.innerHTML += newEntry;
            sr +=1;
        })
    }
}


