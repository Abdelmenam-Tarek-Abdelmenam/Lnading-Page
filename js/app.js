// Define Global Variables
let sectionExist = 1; // number pf section made
let active = 0 ; // the active section
const mainSectioNames = ['Home', 'About US', 'Contacts' , 'users'];
// variabel that hold the empty element at first
let emptyNav = document.querySelector(".navSections ul");
let emptySection = document.getElementById('Container');
let programScrolling = false;
// End Global Variables

/*Start function declaration*/ 
// function to know if the element in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom-100 <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )}

// Build section item
function buildSection(text = "Section-" + sectionExist) {
    let div = document.createElement('div');
    div.setAttribute('class','section');
    div.id = text.replaceAll(/\s/g,'') ;

    div.innerHTML = `
    <h2>${text}</h2>    
    <p>    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam alias quaerat, quos iusto aliquam ab, minima iste itaque numquam sapiente exercitationem! Cupiditate perferendis nobis accusamus aliquam distinctio eius ex sint neque, sequi tempore veniam, earum enim exercitationem ab sed sit aperiam. Necessitatibus tempora aperiam sit dignissimos illum! Obcaecati qui saepe provident praesentium autem laboriosam numquam doloribus consectetur nulla ullam officia, placeat libero id vero error! Laborum corrupti unde, veritatis dicta dignissimos dolor mollitia doloribus placeat amet ab ipsam dolorum deserunt voluptatem accusamus dolore officia ullam aut repellendus, accusantium hic odit autem nisi eos? Porro earum veritatis soluta corrupti consequatur unde quibusdam magni, laborum ex, iste autem cumque asperiores vero consectetur ipsum, dolor cupiditate? Minus aperiam nobis praesentium. Dolorem dignissimos provident adipisci eius dicta accusamus repudiandae est deserunt suscipit similique maiores esse, quasi voluptas voluptatum accusantium quos nulla? Amet a, accusantium, quod nemo asperiores obcaecati incidunt cum nobis excepturi, enim alias?
    </p>
            <article>
            <button class="pushable">
            <span class="front">
                Read more
            </span>
            </button>
            </article>
    `;
    emptySection.appendChild(div);
    buildNav(text);
    sectionExist++;
}
// build the nav
function buildNav(text) {
    let li = document.createElement('li');
    li.innerHTML = `<a id="${text.replaceAll(/\s/g,'')}nav">${text}</a>`
    emptyNav.appendChild(li);
}
// to set the active section item
function setActiveSection(sectionName){
    let  section ;
    if(active != 0) {removeActiveSection();}
    setActiveNav(sectionName);
    section = document.getElementById(sectionName);
    section.className = section.className + " activeSection"
    active = sectionName ;
}
// to set the active menue item
function setActiveNav(sectionName){
    let activeLi = document.getElementById(`${sectionName}nav`);
    activeLi.id = "activeNav"
}
// remove the last active section "to update it"
function removeActiveSection(){    
    let  section ;
    removeActiveNav(active);
    section = document.getElementById(active);
    section.className = section.className.split(" ")[0];
} 
function removeActiveNav(sectionName){
    let activeLi = document.getElementById("activeNav");
    activeLi.id = `${active}nav` ;
}
/*end of functions**/


/*main*/
for (let i = 0; i < mainSectioNames.length; i++) {
    buildSection(mainSectioNames[i]);
}
setActiveSection("Home"); // set home section as active
/**
 * End Main Functions
 * Begin Events
*/
// when the floating button pressed creat new sectoin
  document.getElementById('floatingButton').addEventListener("click",  function(){
    buildSection();
  });

// Set sections as active when it chossen from the menue
var ul = document.getElementsByTagName('ul')[0];
ul.onclick = function(event) {
    programScrolling = true ;
    console.log('start');
    event = event || window.event;
    let target = event.target || event.srcElement;
    const item = document.getElementById(target.innerHTML.replaceAll(/\s/g,''));
    item.scrollIntoView( {
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
    })
    setTimeout(
        function(){
            programScrolling = false ;
            console.log('end');
        },700 // prevent hilight while scroll into view function
    );
    setActiveSection(target.innerHTML.replaceAll(/\s/g,''));
};



addEventListener('scroll', function(e) {
    if(!programScrolling){ // prevent hilight while scroll into view function
    let sections = document.getElementsByClassName('section')
    for(let i=0 ; i<sectionExist-1 ; i++){
        if(isInViewport(sections[i])){
        setActiveSection(sections[i].id);
    }
    }}
}, 100);





