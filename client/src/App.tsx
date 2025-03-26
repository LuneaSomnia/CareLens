import { Route, Switch } from "wouter";
import Layout from "@/components/Layout";
import UserProfile from "@/pages/UserProfile";
import Home from "@/pages/Home";
import PrimordialPrevention from "@/pages/PrimordialPrevention";
import PrimaryPrevention from "@/pages/PrimaryPrevention";
import SecondaryPrevention from "@/pages/SecondaryPrevention";
import TertiaryPrevention from "@/pages/TertiaryPrevention";
import QuaternaryPrevention from "@/pages/QuaternaryPrevention";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/primordial-prevention" component={PrimordialPrevention} />
      <Route path="/primary-prevention" component={PrimaryPrevention} />
      <Route path="/secondary-prevention" component={SecondaryPrevention} />
      <Route path="/tertiary-prevention" component={TertiaryPrevention} />
      <Route path="/quaternary-prevention" component={QuaternaryPrevention} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
