//handle tech-stack
const projectTech = document.getElementsByName("project-tech")
const techIUse = document.getElementsByName("tech-img")
const techContainers = document.querySelectorAll(".about__tech__panel")

techContainers.forEach(container => {
    container.addEventListener("mouseover", () =>{
        container.classList.remove("about__tech__panel--active")
    })
});

projectTech.forEach(tech => {
    tech.addEventListener("click", e =>{
        let techAlt = e.target.alt
        resetTech()
        techIUse.forEach(oneTech => {
            if(techAlt === oneTech.alt){
                oneTech.parentElement.classList.add("about__tech__panel--active")
            }
        })
    })
});

function resetTech(){
    techIUse.forEach(oneTech => {
        oneTech.parentElement.classList.remove("about__tech__panel--active")
    })
}

//handle contact form
const contactForm = document.querySelector("#contact-form")
const firstName = document.getElementById("first-name")
const lastName = document.getElementById("last-name")
const email = document.getElementById("email")
const message = document.getElementById("message")
const contactAlert = document.getElementById("contact-alert")

contactForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    const formData = {
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        message: message.value
    }

    fetch("http://localhost:3000/contact-form", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
});

function afterMail(){
    contactAlert.classList.add("contact__pop-up--active")
}

contactAlert.addEventListener("click", e =>{
    contactAlert.classList.remove("contact__pop-up--active")
})

//handle scroll animations
AOS.init();


//handle mobile project carousel
const carouselBtns =  document.querySelectorAll("[data-value]")
const projectList = document.querySelectorAll("[data-project]")

const fadeInAnimation = [
    { opacity: 0 },
    { opacity: 1 }
];

let buttonValue = 1

carouselBtns.forEach(button => {
    button.addEventListener("click", e => changeProject(button))
});

function changeProject(button){
    resetButtons()
    resetProjects()
    buttonValue = button.attributes[0].value
    button.classList.add("active")
    projectList.forEach(project => {
        if(project.attributes[0].value === buttonValue){
            project.classList.add("active")
            project.animate(fadeInAnimation, 1000)
        }
    })
}

function resetButtons(){
    carouselBtns.forEach(button => {
        button.classList.remove("active")
    })
}

function resetProjects(){
    projectList.forEach(project => {
        project.classList.remove("active")
    })
}

projectList.forEach(project => {
    project.addEventListener("swipe", e =>{
        console.log("swipe")
    })
})

//handle lightbox
const projectImgs = document.getElementsByName("project-preview")
const lightbox = document.getElementById("projects-lightbox")
const lightboxCont = document.getElementById("lightbox-container")

projectImgs.forEach(project => {
    project.addEventListener("click", e =>{
        lightboxCont.style.opacity = 1
        lightboxCont.style.pointerEvents = "all"
        lightboxCont.animate(fadeInAnimation, 200)

        let img = new Image
        img.src = project.src
        lightbox.append(img)

        lightboxCont.addEventListener("click", e =>{
            lightboxCont.style.opacity = 0
            lightboxCont.style.pointerEvents = "none"
            lightbox.innerHTML = ""
        })
    })
})