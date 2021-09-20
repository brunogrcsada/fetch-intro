// Select the element with the id (submit-button)
const submitButton = document.getElementById("submit-button");
console.log(submitButton);

const sectionResults = document.getElementById("section-results");
console.log(sectionResults);

const header = document.querySelector(".header");
if(!header) {
    submitButton.removeEventListener("click", headerShrink);
}

const displayResults = function(res) {
    clearContents(sectionResults);

    let dogFrame = document.createElement("div");
    let dogPic = document.createElement("img");
    dogFrame.classList.add("image__container");
    console.log(res);
    if (res.status === "error") {
        sectionResults.appendChild(dogFrame).innerHTML = 
        '<h1>Something went wrong <i class="fas fa-paw"></i></h1>'
    } else {
        sectionResults.appendChild(dogFrame).appendChild(dogPic);
        dogPic.src = res.message;
        dogPic.alt = 'picture of the dog';
    }

    headerShrink();
};

// Creates a function and assigns it to the variable headerShrink
const headerShrink = function() {
    const headerTitle = document.querySelector(".header__title");
    const headerDes = document.querySelector(".header__description");
    const form = document.getElementById("form");

    console.log(header.classList);

    //Check if the header contains a class with "header" in it
    if (header.classList.contains("header")) {
        header.classList.remove("header");
        header.classList.add("header--small");
        headerTitle.classList.remove("header__title");
        headerTitle.classList.add("header__title--small");
        headerDes.classList.remove("header__description");
        headerDes.classList.add("header__description--small");
        form.style.display = "flex";
    }
};

const clearContents = function(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

const onFetchDog = e => {
    e.preventDefault();
    
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(res => displayResults(res));
        //.then(res => displayResults(res.json()))
}

submitButton.addEventListener("click", onFetchDog);

