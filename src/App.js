import "./index.css";
import Main from "./Main";
import Nav from "./Nav";
import { Routes, Route } from "react-router-dom";
import { FavouritesList } from "./FavouriteList";
import DogProvider from "./DogContext";
import { DogDetail } from "./DogDetail";



export default function App() {


  return (
    <DogProvider>
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element = {<Main />} />
        <Route path="favourite" element = {<FavouritesList/>} />
        <Route path="/dog-detail/:id" element={<DogDetail />} />
      </Routes>
     
    </div>
    </DogProvider>
  );
}
