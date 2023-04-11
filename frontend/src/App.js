import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import AllGroupsPage from "./components/AllGroupsPage";
import GroupDetailsPage from "./components/GroupDetailsPage";
import AllEventsPage from "./components/AllEventsPage";
import CreateGroupForm from "./components/CreateGroupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/groups/:groupId/update'>
            <CreateGroupForm formType='update' />
          </Route>
          <Route path='/groups/create'>
            <CreateGroupForm formType='create' />
          </Route>
          <Route path='/groups/:groupId'>
            <GroupDetailsPage />
          </Route>
          <Route path='/groups'>
            <AllGroupsPage />
          </Route>
          <Route path='/events'>
            <AllEventsPage />
          </Route>
        </Switch>
      }
    </>
  );
}

export default App;
