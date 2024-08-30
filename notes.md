## Presentation:

### Setup

- [ ] Show the demo application
- [ ] Switch to new application
- [ ] Create `index.html`
  - [ ] copy layout HTML from demo application
  - [ ] copy `site.css` from demo application
  - [ ] copy `users-api.js` from demo application
- [ ] Paste in React and Babel references
  ```html
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  ```
- [ ] Add reference to `index.js`
  ```html
  <script src="index.js" type="module"></script>
  ```
- [ ] Initialize React app in `index.js`
  ```js
  ReactDOM.createRoot(
    document.getElementById("root"),
  ).render(<h1>Hello world</h1>);
  ```
- [ ] Create React component function `App`
  - [ ] Copy HTML from `index.html`
- [ ] Replace `<slot id="content">` with `CurrentPage` component

### Components

- [ ] Implement `CurrentPage` component, rendering only `UsersList`
- [ ] Create and show `UsersList` component, with hard-coded data
  ```js
  const users = [
    { id: "1", name: "Test User" },
    { id: "2", name: "Frank Sinatra" },
  ];
  ```
- [ ] Run
  - [ ] Talk about how function components are executed / rendered
  - [ ] Talk about console errors about `class` vs `className`

### Event Handlers

- [ ] Add click event to user list item rendering a console log and show it

### Props

- [ ] Move the list item code into a component
  - [ ] Remove the `key` prop
  - [ ] Define the dependencies (user and click event) as props
  - [ ] Reference the new component in `UsersList`
    - [ ] Show how to pass the props
    - [ ] Don't forget the `key` prop!

### `useState`

- [ ] Convert the `users` array into a `useState`
  ```js
  const [users, setUsers] = React.useState([]);
  ```

### `useEffect`

- [ ] Add useEffect to load the users list on component load
  ```js
  React.useEffect(() => {
    usersApi
      .loadUsers()
      .then((users) => setUsers(users));
  }, []);
  ```

### Hooks

- [ ] Move the users state and useEffect into a hook, `useUsers`

  ```js
  function useUsers() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
      usersApi
        .loadUsers()
        .then((users) => setUsers(users));
    }, []);

    return users;
  }
  ```

  - [ ] Update `UsersList` back to variable
    ```js
    const users = useUsers();
    ```

### Forms

- [ ] Create new user form

  ```js
  function AddNewUserForm({ onUserCreated }) {
      const [name, setName] = React.useState('');
      const [email, setEmail] = React.useState('');

      const handleSubmit = (e) => {
          e.preventDefault();
          usersApi.createUser({ name, email }).then(created => {
              console.log('new user created', created);
              onUserCreated(created);
          });
      }

      return (
          <!-- let chatgpt do this -->
      )
  }
  ```

- [ ] Add the button and show the form

  ```js
  const [
    isAddUserFormVisible,
    setAddUserFormVisible,
  ] = React.useState(false);

  const handleUserCreated = (newUser) => {
    setAddUserFormVisible(false);
    // TODO: do something to reload the data
    window.location.reload();
  };

  <a
    onClick={() => setAddUserFormVisible(true)}
    className="w-full text-sm bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700 transition"
  >
    Add User
  </a>;

  {
    isAddUserFormVisible && (
      <div className="fixed top-0 w-full h-full bg-gray-100">
        <AddNewUserForm
          onUserCreated={handleUserCreated}
        />
      </div>
    );
  }
  ```

### Context

- [ ] Show the app and point to the logged in user
- [ ] Convert that section to a component, introducing a user variable

  ```js
  function CurrentUserView() {
    const currentUser = {
      id: "1",
      name: "Admin",
    };

    return (
      <div className="flex flex-row gap-1">
        <span id="username">
          {currentUser.name}
        </span>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
        </svg>
      </div>
    );
  }
  ```

- [ ] Add `CurrentUserContext`
  ```js
  const CurrentUserContext = React.createContext({
    authenticateUser: () => { /** Not implemented */ }
    currentUser: null
  });
  ```
- [ ] Add `CurrentUserProvider` component

  ```js
  function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] =
      React.useState(null);

    const authenticateUser = ({
      username,
      password,
    }) => {
      if (
        username === "admin" &&
        password === "admin"
      ) {
        setCurrentUser({ name: "Admin", id: 1 });
      }
    };

    return (
      <CurrentUserContext.Provider
        value={{
          authenticateUser,
          currentUser,
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    );
  }
  ```

- [ ] Wrap the main app content `CurrentUserProvider`

  ```js
  function App() {
    return (
        <CurrentUserProvider>
            ...

    );
  ```

- [ ] Update `CurrentUserView` to use context
  ```js
  const { currentUser } = React.useContext(
    CurrentUserContext,
  );
  ```
- [ ] Add login button
  ```js
  if (!currentUser) {
    return (
      <div>
        <button
          onClick={() =>
            authenticateUser({
              username: "admin",
              password: "admin",
            })
          }
        >
          Login
        </button>
      </div>
    );
  }
  ```
- [ ] Run and show

### Promoting from a demo to a real app

- [ ] Talk about how you obviously don't _need_ to use any tooling or NPM packages, but you should not be building any modern web application without it
- [ ] Convert React libraries from CDN to NPM
  - [ ] Remove `<script>` tags
  - [ ] Install NPM packages
  ```sh
  npm install react react-dom
  ```
- [ ] Install types
  ```sh
  npm install -D @types/react @types/react-dom @types/node
  ```
- [ ] Install and run Vite
  ```sh
  npm install -D vite
  npx vite
  ```
