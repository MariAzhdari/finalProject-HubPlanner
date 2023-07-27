// import { Route, Routes } from "react-router-dom";
import React from "react";
// import About from "./pages/About";
import Attendance from "./pages/Attendance";
// import Home from "./pages/Home";


const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
    </Routes>
);
// const App = () => {
// 	return (
// 		<div className="App">
// 			<Attendance />
// 		</div>
// 	);
// };
export default App;
