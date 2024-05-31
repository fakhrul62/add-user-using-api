let fetchedData = []; // declaring an empty array to store all
let showAll = false; //declaring a flag
const fetchUser = async () => {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    fetchedData.push(data.results[0]); // pushing every result to the empty array at the top
    getNewUser();

}
const getNewUser = () => {
    const mainDiv = document.getElementById('main-div');
    mainDiv.innerHTML = '';

    let usersToShow;
    if (showAll) {
        usersToShow = fetchedData;
    } else {
        usersToShow = fetchedData.slice(0, 4);
    }
    usersToShow.forEach(users => {
        const divGrid = document.createElement('div'); // Create a div for each user
        divGrid.classList = `bg-white p-6 rounded-xl flex flex-col gap-3 shadow-xl transition-all`; // Add CSS classes to div

        // Add HTML content to the div
        divGrid.innerHTML = `
            <img src="${users.picture.large}" class="w-1/2 rounded-xl mx-auto">
            <h3 class="font-bold text-black">${users.name.first} ${users.name.last}, Age: <span class="font-normal">${users.dob.age}</span> </h3>
            <h3 class="font-bold text-black">Date of Birth: <span class="font-normal text-gray-950">${new Date(users.dob.date).toLocaleDateString()}</span></h3>
            <h3 class="font-normal text-gray-950">${users.location.city}, ${users.location.country}</h3>
        `;
        mainDiv.appendChild(divGrid); // Append the div to the main container
    });
    

    // Show load more button if more than 4
    const loadBtn = document.getElementById('load-btn');
    if (fetchedData.length > 4 && !showAll) {
        loadBtn.removeAttribute('hidden');
    } else {
        loadBtn.setAttribute('hidden', true);
    }
    
}
document.getElementById('sortByAge').addEventListener('click', () =>{
    fetchedData.sort((a,b) => new Date(b.dob.date) - new Date(a.dob.date));
    getNewUser();

}) 

//making load more button work
document.getElementById('load-btn').addEventListener('click', () => {
    showAll = true;
    getNewUser(); // Display all users when "Show More" button is clicked
});


