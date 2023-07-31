import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";


const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
	</Routes>
);
// import React from "react";
// import  Form  from "./components/Form";
// import TravelCheck from "./components/travel-check";
// import Calendar from "./components/Calendar";
// const App=()=>{
// 	return(
// 		<>
// 		<TravelCheck />
// 		</>
// 	);
// };
export default App;




