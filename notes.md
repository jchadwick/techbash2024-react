<iframe src="https://stagetimer.io/r/XSA8AA4H/"></iframe>

### Setup

- [ ] Show the demo application
- [ ] Switch to new application
- [ ] Add React and Babel references
- [ ] Add reference to `index.js`

### Rendering the Root application
- [ ] Initialize React app in `index.js`
  ```js
  ReactDOM.createRoot(
    document.getElementById("root"),
  ).render(<h1>Hello world</h1>);
  ```
- [ ] Create React component function `App`
  - [ ] Copy HTML from `index.html`
  - [ ] DON'T FIX ANY CLASS ISSUES

### Components

- [ ] Create and show `UsersList` component, with hard-coded data
  ```js
  const users = [
    { id: "1", name: "Test User" },
    { id: "2", name: "Frank Sinatra" },
  ];
  ```
- [ ] Replace `<slot id="content">` with `UsersList` component
- [ ] Run
  - [ ] Talk about how function components are executed / rendered
  - [ ] Talk about `class` vs `className` console errors - fix
  - [ ] Talk about `key` console errors - fix

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
        <!-- -->
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
