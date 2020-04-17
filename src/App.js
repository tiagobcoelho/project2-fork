import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my-profile">MyProfile</Link>
            </li>
            <li>
              <Link to="/user-profile/janedoe">Jane Doe Profile</Link>
            </li>
            <li>
              <Link to="/user-profile/johndoe">John Doe Profile</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/my-profile">
            <MyProfile />
          </Route>
          <Route path="/user-profile/:githubLogin" component={UserProfile} />
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
