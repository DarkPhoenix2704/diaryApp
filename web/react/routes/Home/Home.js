import Navbar from "../../Components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-modern-calendar-datepicker";
import { Remark } from "react-remark";
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
		let url = "http://65.2.60.100:8080/api/diary?date=" + date;
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
		const response = await fetch("http://65.2.60.100:8080/api/diary",{
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
						<Remark className="contentRightText"
							rehypePlugins={[
								function noRefCheck(){},
								function noRefCheck(){}
							]}
							remarkToRehypeOptions={{
								allowDangerousHtml: true
							}}
						>{markdownSource}</Remark>
					</div>
				</div>
			</div>
			<ToastContainer/>
		</>
	);
}
export default Home;