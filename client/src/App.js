import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance.js";
import TravelDisruption from "./pages/TravelDisruption";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
		<Route path="/" element ={<Attendance />} />
		<Route path="/" element ={<TravelDisruption />} />
	</Routes>
);

export default App;
