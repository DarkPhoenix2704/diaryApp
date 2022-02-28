import Navbar from "../../Components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-modern-calendar-datepicker";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import "./Home.css";
import { toast, ToastContainer } from "react-toastify";

function Home() {
	const [selectedDay, setSelectedDay] = useState(null);
	var todayDate = new Date().toISOString().slice(0, 10);
	const [date, setDate] = useState(todayDate);
	const [markdownSource, setMarkdownSource] = useState("");
	useEffect(() => {
		if(selectedDay !== null) {
			const {day, month, year} = selectedDay;
			let _day, _month, _year;
			_day = day < 10 ? `0${day}` : day;
			_month = month < 10 ? `0${month}` : month;
			_year = year;
			setDate(`${_year}-${_month}-${_day}`);
		}
	},[selectedDay]);
	useEffect(async () => {
		let url = "https://ec2-65-2-60-100.ap-south-1.compute.amazonaws.com/api/diary?date=" + date;
		const response = await fetch(url,{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"x-access-token": localStorage.getItem("token")
			}
		});
		const data = await response.json();
		if(data.status === "ok") {
			setMarkdownSource(data.diary.content);
		}else{
			setMarkdownSource("## Write Here");
		}
	},[date]);

	async function saveDiary(event){
		event.preventDefault();
		const response = await fetch("https://ec2-65-2-60-100.ap-south-1.compute.amazonaws.com/api/diary",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"x-access-token": localStorage.getItem("token")
			},
			body: JSON.stringify({
				date: date,
				diaryContent: markdownSource
			})
		});
		const data = await response.json();
		if(data.status === "ok") {
			toast.success("Diary Saved Successfully",{
				position: "top-center",
			});
		}

	}

	return (
		<>
			<Navbar/>
			<div className="home-container">
				<div className="commandBar">
					<DatePicker value={selectedDay}
						onChange={setSelectedDay}
						inputPlaceholder="Select a day"
						shouldHighlightWeekends/>
					<button className="btnSave" onClick={()=>{saveDiary(event);}}>
						<FontAwesomeIcon icon={solid("save")} size="lg" className="btnSaveIcon" />
						Save
					</button>
				</div>
				<div className="content">
					<div className="content-left">
						<textarea className="content-left-textarea" value={markdownSource} onChange={(e) => setMarkdownSource(e.target.value)}/>
					</div>
					<div className="content-right">
						<ReactMarkdown children={markdownSource} className="contentRightText" remarkPlugins={[remarkGfm]} />
					</div>
				</div>
			</div>
			<ToastContainer/>
		</>
	);
}
export default Home;