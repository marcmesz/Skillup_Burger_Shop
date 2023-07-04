import "./styles/app.scss";
import Router from "./components/router/Router";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <>
      <Header isAuthenticated={true} />
      <Router />
      <Footer />
    </>
  )
}

export default App;
