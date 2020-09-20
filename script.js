const projects = [
    {
        title: "Cosmetic Center",
        src: "./img/Screenshot_133.png",
        alt: "Онлайн магазин",
        description: `С июля по август 2020 года вместе с тремя друзьями
            занимался фрилансом (сделали сайт <a href="https://www.medproffimarket.ru">косметического центра</a> в Якутии). Во время 
            работы я разработал логику оформления заказов, покупки товаров, 
            резервирование и отправки запросов на сервер на стороне клиента, 
            используя JavaScript. Занимался версткой header сайта, списка 
            товаров, сообщений клиенту, анимации прокрутки и перехода по 
            странице и другое, используя HTML, CSS, JavaScript и JQuery.`
    },
    {
        title: "Сайт на React нашей группы в университете",
        src: "./img/Screenshot_147.png",
        alt: "Сайт на React нашей группы в университете",
        description: `Разрабатывал 
        <a href="https://evgeniy638.github.io/-study_group_website">
        сайт на React нашей группы в университете
        </a> 
        со следующим функционалом: показ и изменения списка участников группы, 
        расписание на день, просмотр новостей, с возможностью в режиме 
        администратора добавлять и удалять новости.<br>
        <a href="https://github.com/Evgeniy638/-study_group_website">Репозиторий</a>.`
    },
    {
        title: "QualityDesign",
        src: "./img/Screenshot_149.png",
        alt: "Картинка шаблона",
        description: `
        <a href="https://evgeniy638.github.io/layouts/MyCompany/index.html">Ссылка на шаблон</a><br>
        <a href="https://github.com/Evgeniy638/layouts/tree/master/QualityDesign">Репозиторий</a>`
    },
    {
        title: "MyCompany",
        src: "./img/Screenshot_148.png",
        alt: "Картинка шаблона",
        description: `
        <a href="https://evgeniy638.github.io/layouts/MyCompany/index.html">Ссылка на шаблон</a><br>
        <a href="https://github.com/Evgeniy638/layouts/tree/master/MyCompany">Репозиторий</a>`
    }
];

const parseLocationSearch = (locationSearch) => locationSearch.split("=").pop();

const header = document.querySelector("header");

const doActionWithUrl = () => {
    listA.forEach(a => {
        a.classList.remove("menu_item_active");
    })

    if (parseLocationSearch(window.location.search) === "projects") {
        let top = sectionProjects.getBoundingClientRect().top + pageYOffset;

        if (document.documentElement.offsetWidth > 400) {
            top -= header.offsetHeight;
        }

        
        document.querySelector(".menu a[href='?q=projects']").classList.add("menu_item_active");

        document.documentElement.scrollTo({
            top,
            behavior: "smooth"
        });
    } else {
        document.querySelector(".menu a[href='?q=about']").classList.add("menu_item_active");

        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

const Url = {
    goToUrl(url) {
        window.history.pushState({}, '', url);
        doActionWithUrl();
    }
}

const listA = header.querySelectorAll(".menu a");
listA.forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();

        Url.goToUrl(a.getAttribute("href"));
    })
});

const aboutProjectWrap = document.querySelector(".about_project_wrap");

const aboutProjectTitle = document.querySelector(".about_project_title");

const aboutProjectDescription = document.querySelector(".about_project_description");

const listenerClickAboutProject = (e) => {
    if (!isEventElementOrItsChild(e.target, "about_project") && 
        !isEventElementOrItsChild(e.target, "project_card")) {

        hideAboutProject();
    }
}

const showAboutProject = (title, src, alt, description, card) => {
    aboutProjectWrap.classList.remove("hide");

    aboutProjectTitle.textContent = title;

    const aboutProjectImage = document.createElement("img");
    aboutProjectImage.classList.add("about_project_image");
    aboutProjectImage.src = src;
    aboutProjectImage.alt = alt;

    aboutProjectDescription.innerHTML = description;
    aboutProjectDescription.insertBefore(aboutProjectImage, aboutProjectDescription.firstChild);

    document.documentElement.addEventListener("click", listenerClickAboutProject);
}

const hideAboutProject = () => {
    aboutProjectWrap.classList.add("hide");
    document.documentElement.removeEventListener("click", listenerClickAboutProject);
}

const sectionProjects = document.querySelector(".projects");
const ulProjects = document.querySelector(".projects ul");

const createCard = (title, src, alt, description) => {
    const card = document.createElement("li");
    card.classList.add("project_card");

    const divImg = document.createElement("div");
    divImg.classList.add("image");

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    divImg.appendChild(img)
    
    card.appendChild(divImg);

    const divTitle = document.createElement("div");
    divTitle.classList.add("title");

    const pTitle = document.createElement("p");
    pTitle.textContent = title;
    divTitle.appendChild(pTitle);

    card.appendChild(divTitle);

    const divDescription = document.createElement("div");
    divDescription.classList.add("description");

    const pDescription = document.createElement("p");
    pDescription.innerHTML =  description.substr(0, 100) + "...";
    divDescription.appendChild(pDescription);

    card.appendChild(divDescription);

    card.addEventListener("click", () => {
        showAboutProject(title, src, alt, description);
    })

    return card;
}

const fillInUlProjects = (projects) => {
    projects.forEach(dataProject => {
        const {title, src, alt, description} = dataProject;
        ulProjects.appendChild(createCard(title, src, alt, description));
    });
}

const isEventElementOrItsChild = (targetElement, classEventElement) => {
    return targetElement.classList.contains(classEventElement) || 
        (targetElement.parentElement && isEventElementOrItsChild(targetElement.parentElement, classEventElement)) || false;
}

window.onload = () => {
    fillInUlProjects(projects);
    doActionWithUrl();
}
