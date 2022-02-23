import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
// import AuthRoute from "./components/AuthRoute";
import AdminRoute from "./components/AdminRoute";
import AdminGuildProfilView from "./views/admin/GuildProfilView";
import AdminBlogListView from "./views/admin/BlogListView";
import BlogCreateNewView from "./views/admin/BlogCreateNewView";
import BlogListItemEditView from "./views/admin/BlogListItemEdit";
import KillFeedListView from "./views/admin/KillFeedListView";
import KillFeedCreateNewView from "./views/admin/KillFeedCreateNewView";
import KillFeedItemEditView from "./views/admin/KillFeedItemEdit";
import RosterView from "./views/admin/RosterView";
import CreateSetupView from "./views/admin/CreateSetupView";
import EditSetupView from "./views/admin/EditSetupView";
import SetupListView from "./views/admin/SetupListView";
import PrepareSetupView from "./views/admin/PrepareSetupView";

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<AdminGuildProfilView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/bloglist" element={<AdminBlogListView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/dashboard/createblogpost"
            element={<BlogCreateNewView />}
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/dashboard/blogpostedit/:id"
            element={<BlogListItemEditView />}
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/dashboard/killpostedit/:id"
            element={<KillFeedItemEditView />}
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/killfeed" element={<KillFeedListView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/dashboard/createkillfeed"
            element={<KillFeedCreateNewView />}
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/roster" element={<RosterView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/createsetup" element={<CreateSetupView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/editsetup/:id" element={<EditSetupView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/dashboard/setups" element={<SetupListView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/dashboard/preparesetup/:id"
            element={<PrepareSetupView />}
          />
        </Route>
        {/* <Route element={<AuthRoute />}>
          <Route path="/book/:id" element={<BookDetailsView />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/addBook" element={<AddBookView />} />
        </Route>
        <Route path="/editBook/:id" element={<EditBookView />} /> */}
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
