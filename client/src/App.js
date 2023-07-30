import { Route, Routes } from "react-router-dom";
// import Attendance from "./components/attendance";

import About from "./pages/About";
import Home from "./pages/Home";
// import AttendanceTable from "./components/attendance";
import React from "react";



const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/about/this/site" element={<About />} />
	</Routes>
);

// const App = () => {
// return (
//     <div className="App">
// 		<AttendanceTable />
// 		<Calendar />
// 	</div>
// );
// };
export default App;

