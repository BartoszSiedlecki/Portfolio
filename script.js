//handle tech-stack
const projectTech = document.getElementsByName("project-tech")
const techIUse = document.getElementsByName("tech-img")
const techContainers = document.querySelectorAll(".about__tech__panel")

techContainers.forEach(container => {
    container.addEventListener("mouseover", e =>{
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

    Email.send({
        SecureToken: "b434e06b-5ac3-46f3-aa29-36e083eea0cf",
        Host : "smtp.elasticemail.com",
        Username : "Bartosz.Siedlecki112@gmail.com",
        Password : "4BEEA562BDA0992DAF5D6B8BA32A537B45D1",
        To : 'bartoszsiedlecki.inf@gmail.com',
        From : 'bartoszsiedlecki.inf@gmail.com',
        Subject : "Portfolio message",
        Body : "Name: " + firstName.value + " " + lastName.value +
                "<br> Email: " + email.value +
                "<br> Message: " + message.value
    }).then(
        afterMail(),
        message => alert(message)
    );
})

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

carouselBtns.forEach(button => {
    button.addEventListener("click", e =>{
        resetButtons()
        resetProjects()
        let buttonValue = button.attributes[0].value
        button.classList.add("active")
        projectList.forEach(project => {
            if(project.attributes[0].value === buttonValue){
                project.classList.add("active")
                project.animate(fadeInAnimation, 1000)
            }
        })
    })
});

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