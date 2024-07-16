import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/Header";
import Page404 from './pages/Page404';
import Main from "./components/Main";
import Footer from "./components/Footer";
import FormAddVideo from './pages/FormAddVideo';
import FormNewCategory from "./pages/NewCategory";
import Category from "./pages/Category";
import Video from "./pages/Video";
import EditDeleteVideo from "./pages/Edit_DeleteVideo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/react"
require('dotenv').config();

function App() {
  return (
    <>
      <Router>
        <Header/>
        <ScrollToTop />
        <SpeedInsights />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/nuevoVideo' element={<FormAddVideo />} />
          <Route path='/nuevaCategoria' element={<FormNewCategory />} />
          <Route path='/categoria/:categoryName' element={<Category />} />
          <Route path='/videoSettings' element={<EditDeleteVideo />} />
          <Route path='/video/:videoId' element={<Video />} />
          <Route path='/categoria/:categoryName/video/:videoId' element={<Video />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
