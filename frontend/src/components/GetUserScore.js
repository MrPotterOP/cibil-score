import React,{useEffect, useState} from "react";
import Axios from "../utils/AxiosConfig";
import Loading from "./Loading";


const GetUserScore = ()=>{

    const [data, setData] = useState(false);
    const token = window.localStorage.getItem("usertoken");

    const url = "/api/userscore";

    useEffect(()=>{

        const handleErr = (msg) =>{
            alert(msg);
            window.localStorage.removeItem("usertoken");
            window.location.reload();
        }

        Axios.get(url, {headers: {Authorization: token}})
        .then(r => (r.status === 200) ? setData(r.data) : null)
        .catch(e => (e) ? handleErr("Something went wrong. Try again") : null);


    },[token]);

    const handleLogout = ()=>{
        window.localStorage.removeItem("usertoken");
        window.location.reload();
    }

    const Score = ()=>{
        let bar;
        let status;

        if(data.score < 200){
            bar = "gauge four rischio4"
            status = "poor"
        }else if(data.score < 400){
            bar = "gauge four rischio3"
            status = "avarage"
        }else if(data.score < 600){
            bar = "gauge four rischio2"
            status = "good"
        }else{
            bar = "gauge four rischio1"
            status = "excellent";
        }

        const Tr = ({bank, ammount, issue, id}) =>{

            const handleEdit = (i) =>{
                let description = window.prompt("Enter your message: ");

                if(description !== "null"){
                    Axios.post("/api/objection", {ticketId: id, description}, {headers: {Authorization: token}})
                    .then((r) => window.localStorage.reload())
                    .catch((e) => (e.response) ? alert("Objection not posted. try again") : null);
                }
            }

            return(
                <tr>
                    <th>{bank}</th>
                    <td>{issue}</td>
                    <td>{ammount}</td>
                    <td className="btn-table" onClick={()=> handleEdit(id)}>Send Querry</td>
                  </tr>
            )
        }

        const mapTr = (i) =>{
            return (
                <Tr bank={i.issuer} ammount={i.ammount} issue={i.issue} key={i.id} id={i.id}/>
            )
        }

        const ScoreBar = ()=>{
            return (
                <div className="gauge-wrapper">
                    <div className={bar}>
                        <div className="slice-colors">
                        <div className="st slice-item"></div>
                        <div className="st slice-item"></div>
                        <div className="st slice-item"></div>
                        <div className="st slice-item"></div>
                        </div>
                        <div className="needle"></div>
                        <div className="gauge-center">
                        <div className="label">STATUS</div>
                        <div className="number">{status}</div>
                        </div>    
                    </div>
                </div>
            )
        }

        const Tickets = ()=>{
            return(
                <table>
                <thead>
                  <tr>
                    <th>BANK</th>
                    <th>Issue</th>
                    <th>Ammount</th>
                    <th>Take Objection</th>
                  </tr>
                </thead>
                <tbody>
                  {data.tickets.map(i => mapTr(i))}
                </tbody>
              </table>
            )
        }

        return(
            <div className="user-score-container">
                <div className="user-score-left">
                    <h1>Welcome {data.name},</h1>
                    <p>Your CIBIL score is {data.score}</p>
                    <ScoreBar />

                    <div className="actions">
                        <p>Actions</p>
                        <button onClick={() => handleLogout()} className="btn-login">Logout</button>
                    </div>
                </div>

                <div className="user-score-right">
                    {(data.tickets.length > 0) ? <Tickets /> : <p>You have 0 tickets open.</p>}
                </div>
            </div>
        )
    }
    return(
        <section className="section-user-dashboard">
            {data ? <Score /> : <Loading />}
        </section>
    )
}

export default GetUserScore;