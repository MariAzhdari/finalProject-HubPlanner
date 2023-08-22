import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Form from "./components/Form";
import Main from "./components/Main";
import Calendar from "./components/Calendar";
import Attendance from "./components/Attendance";
import TravelCheck from "./components/TravelCheck";
import Breakout from "./components/Breakout";


const App = () => (
	<Routes>
		<Route path="/" element={<Login />} />
		<Route path="/form" element={<Form />} />
		<Route path="/main" element={<Main />} />
		<Route path="/calendar" element={<Calendar />} />
		<Route path="/attendance" element={<Attendance />} />
		<Route path="/travel" element={<TravelCheck />} />
		<Route path="/breakout" element={<Breakout />} />
	</Routes>
);

export default App;
