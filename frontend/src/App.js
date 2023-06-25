import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import AllGroupsPage from "./components/AllGroupsPage";
import MyGroupsPage from "./components/MyGroupsPage";
import GroupDetailsPage from "./components/GroupDetailsPage";
import GroupForm from "./components/GroupForm";
import AllEventsPage from "./components/AllEventsPage";
import EventDetailsPage from "./components/EventDetailsPage";
import EventForm from "./components/EventForm";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} setSearchTerm={setSearchTerm} />
      <div id="content">
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
            <Route path='/groups/:groupId/events/create'>
              <EventForm formType='create' />
            </Route>
            <Route path='/groups/:groupId'>
              <GroupDetailsPage />
            </Route>
            <Route path='/events/:eventId'>
              <EventDetailsPage />
            </Route>
            <Route path='/my-groups'>
              <MyGroupsPage />
            </Route>
            <Route path='/groups'>
              <AllGroupsPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Route>
            <Route path='/events'>
              <AllEventsPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        }
      </div>
      <Footer />
    </>
  );
}

export default App;
