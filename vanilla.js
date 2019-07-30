const refresher = document.getElementById('refresher');

const names = [
    'Burt Bear',
    'Charlie Cheetah',
    'Donald Duck',
    'Eva Eagle',
    'Ellie Elephant',
    'Gino Giraffe',
    'Isabella Iguana',
    'Karl Kitten',
    'Lionel Lion',
    'Molly Mouse',
    'Paul Puppy',
    'Rachel Rabbit',
    'Ted Turtle'
];


const nameRandom = ["Alice", "Bonnie", "Cassie",
    "Donna", "Ethel", "Grace",
    "Heather", "Jan", "Katherine",
    "Julie", "Marcia", "Patricia",
    "Mabel", "Jennifer", "Dorthey",
    "Mary Ellen", "Jacki", "Jean",
    "Betty", "Diane", "Annette",
    "Dawn", "Jody", "Karen",
    "Mary Jane", "Shannon", "Stephanie",
    "Kathleen", "Emily", "Tiffany",
    "Angela", "Christine", "Debbie",
    "Karla", "Sandy", "Marilyn",
    "Brenda", "Hayley", "Linda",
    "Allen", "Bob", "Carlton",
    "David", "Ernie", "Foster",
    "George", "Howard", "Ian",
    "Jeffery", "Kenneth", "Lawrence",
    "Michael", "Nathen", "Orson",
    "Peter", "Quinten", "Reginald",
    "Stephen", "Thomas", "Morris",
    "Victor", "Walter", "Xavier",
    "Charles", "Anthony", "Gordon",
    "Percy", "Conrad", "Quincey",
    "Armand", "Jamal", "Andrew",
    "Matthew", "Mark", "Gerald"];
const lastname = ["Adams", "Bowden", "Conway",
    "Darden", "Edwards", "Flynn",
    "Gilliam", "Holiday", "Ingram",
    "Johnson", "Kraemer", "Hunter",
    "McDonald", "Nichols", "Pierce",
    "Sawyer", "Saunders", "Schmidt",
    "Schroeder", "Smith", "Douglas",
    "Ward", "Watson", "Williams",
    "Winters", "Yeager", "Ford",
    "Forman", "Dixon", "Clark",
    "Churchill", "Brown", "Blum",
    "Anderson", "Black", "Cavenaugh",
    "Hampton", "Jenkins", "Prichard"];
let r = 0;
let i = 0;

function pushName() {
    r = Math.floor(Math.random() * lastname.length);
    i = Math.floor(Math.random() * nameRandom.length);
    names.push(nameRandom[i] + ' ' + lastname[r]);
}

function getContent() {
    return document.querySelector('ion-content');
}

function scrollToTop() {
    getContent().scrollToTop(500);
}

refresher.addEventListener('ionRefresh', () => {
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            pushName();
        }
        prependMessages(5, true);
        refresher.complete();
    }, 500);
});
const list = document.querySelector('ion-list');
appendMessages(20);

function chooseRandomName() {
    return names[Math.floor(Math.random() * names.length)];
}

function appendMessages(numMessages = 1, unread) {
    for (let i = 0; i < numMessages; i++) {
        list.appendChild(createMessage(unread));
    }
}

function prependMessages(numMessages = 1, unread) {
    for (let i = 0; i < numMessages; i++) {
        list.insertBefore(createMessage(unread), list.firstChild);
    }
}

function createMessage(unread = false) {
    let item = document.createElement('ion-item');
    item.innerHTML = `
        <div slot="start" class="${(unread) ? 'unread' : 'read'}"></div>
        <ion-label class="ion-text-wrap">
          <h2>${chooseRandomName()}</h2>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </ion-label>
`;
    return item;
}

function createCard(name) {
    return `
        <ion-item>
            <div slot="start" class="read"></div>
            <ion-label class="ion-text-wrap">
                <h2>${name}</h2>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
            </ion-label>
        </ion-item>
    `;
}


let length = 0;
const infiniteScroll = document.getElementById('infinite-scroll');
infiniteScroll.addEventListener('ionInfinite', async function () {
    if (length < names.length) {
        console.log('Loading data...');
        await wait(700);
        infiniteScroll.complete();
        appendItems(5);
        console.log('Done');
    } else {
        console.log('No More Data');
        infiniteScroll.disabled = true;
        const el = document.createElement('p');
        el.innerHTML = `
             <p class="ion-padding-start ion-padding-end">
                 <ion-button onclick="scrollToTop()" color="dark" expand="block" fill="outline">Scroll To Top</ion-button>
             </p>
        `;
        document.querySelector('ion-content').appendChild(el);
    }
});

function appendItems(number) {
    console.log('length is', length);
    const originalLength = length;
    for (var i = 0; i < number; i++) {
        const el = document.createElement('ion-item');
        el.innerHTML = `
            <div slot="start" class="read"></div>
            <ion-label class="ion-text-wrap">
                <h2>${chooseRandomName()}</h2>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
            </ion-label>
   
        `;
        list.appendChild(el);
        length++;
    }
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

const searchbar = document.querySelector('ion-searchbar');


searchbar.addEventListener('ionInput', handleInput);
function handleInput(event) {
    const items = Array.from(list.children);
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
        items.map(item => {
            const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
            item.style.display = shouldShow ? 'block' : 'none';
        });
    });
}


const template = names.map(name => createCard(name));
const html = template.join(' ');
document.querySelector('ion-list').innerHTML = html;


