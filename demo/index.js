import * as usersApi from './users-api.js';

// start the app
init();

async function init() {
    await import('./routie.js')

    routie({
        'users/:userId': replacePageContent(renderUserPage),
        'users': replacePageContent(renderUsersPage),
        '*': () => routie.navigate('users'),
    });

    function replacePageContent(contentFn) {
        return async function (...args) {
            const newContent = await contentFn(...args);
            document.getElementById("content").replaceChildren(newContent);
        }
    };
}


// Users Page
async function renderUsersPage() {
    const usersPage = getTemplate("users-page");

    async function renderListItems() {

        const users = await usersApi.loadUsers();
        const userList = await renderUserList(users);
        usersPage.querySelector("slot[name='list-container']").replaceChildren(userList);
    }

    await renderListItems();

    window.addEventListener('message', async (e) => {
        if (e.data === 'user-created') {
            await renderListItems();
        }
    });

    let newUserForm;
    usersPage.querySelector("a[name='add-user']").addEventListener('click', async () => {
        newUserForm = await renderNewUserForm();
        document.body.appendChild(newUserForm);
    });

    return usersPage;
}

async function renderUserList(users) {
    const userList = getTemplate("user-list");

    const listItems = await Promise.all(
        users.map(user => renderUserListItem(user))
    );

    listItems.forEach(item => userList.appendChild(item));

    return userList;
}

async function renderUserListItem(user) {
    const userItem = getTemplate("user-list-item");
    renderContent(userItem, user);

    userItem.addEventListener('click', () => {
        routie.navigate(`users/${user.id}`);
    });

    return userItem;
}


// User Page
async function renderUserPage(userId) {
    const user = await usersApi.loadUserById(userId);
    return renderUserDetails(user);
}

async function renderUserDetails(user) {
    const userItem = getTemplate("user-details");
    renderContent(userItem, user);
    return userItem;
}


// New User Page
async function renderNewUserForm() {
    const newUserForm = getTemplate("new-user-form");

    async function handleSubmit(e) {
        e.preventDefault();
        usersApi.createUser({
            name: e.target.name.value,
            email: e.target.email.value
        }).then(created => {
            console.log('new user created', created);
            newUserForm.replaceWith();
            window.postMessage('user-created', created);
        });
    }

    newUserForm.addEventListener('submit', handleSubmit);

    return newUserForm;
}

// Template Utilties
function getTemplate(id) {
    return document.getElementById(id).content.cloneNode(true).children[0];
}
function renderContent(el, data) {
    Object.entries(data).forEach(([name, value]) => {
        const x = el.querySelector(`slot[name="${name}"]`);
        if (x) x.replaceWith(value);
    });
    return el;
}
