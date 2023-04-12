import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import AllGroupsPage from "./components/AllGroupsPage";
import GroupDetailsPage from "./components/GroupDetailsPage";
import AllEventsPage from "./components/AllEventsPage";
import GroupForm from "./components/GroupForm";
import EventDetailsPage from "./components/EventDetailsPage";

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
            <GroupForm formType='update' />
          </Route>
          <Route path='/groups/create'>
            <GroupForm formType='create' />
          </Route>
          <Route path='/groups/:groupId'>
            <GroupDetailsPage />
          </Route>
          <Route path='/events/:eventId'>
            <EventDetailsPage />
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
