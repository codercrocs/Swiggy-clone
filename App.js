import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

// Footer Comes here

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Body />
      </div>
      <Footer />
    </>
  );
}

export default App;
