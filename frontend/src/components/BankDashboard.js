import React,{useRef, useState} from "react";
import Axios from "../utils/AxiosConfig";




const BankDashboard = ()=>{

    const [data, setData] = useState(false);
    const token = window.localStorage.getItem("banktoken");

    const issue = useRef(null);
    const username = useRef("");
    const name = useRef("");
    const aadhar = useRef("");
    const ammount = useRef(null);

    //Handlers

    const handleErr = (msg)=>{
        alert(msg);
    }

    const checkScore = ()=>{
        Axios.patch("/api/userscore", {name: username.current.value})
        .then(r => (r.status === 200) ? setData(r.data) : null)
        .catch(e => (e) ? handleErr("Can't find cibil score for " + username.current.value) : null);
    }

    const handleSucc = (msg) =>{
        alert(msg);
        window.location.reload();
    }
    const issueTicket = () =>{
        Axios.post("/api/ticket", {userName: name.current.value , issue: issue.current.value, ammount: ammount.current.value, aadharNo: aadhar.current.value}, {headers: {Authorization: token}})
        .then(r => (r.status === 200) ? handleSucc("Ticket issued successfully") : null)
        .catch(e => (e) ? handleErr("Unable to add ticket for " + name.current.value) : null);
    }

    const handleLogout = ()=>{
        window.localStorage.removeItem("banktoken");
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

        const ScoreBar = ()=>{
            return (
                <>
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

                <p>{data.name} have {data.score} CIBIL score.</p>

                </>
            )
        }

        const Table = ()=>{

            const Tr = ({bank, ammount, issue}) =>{
    
                return(
                    <tr>
                        <th>{bank}</th>
                        <td>{issue}</td>
                        <td>{ammount}</td>
                      </tr>
                )
            }
    
            const mapTr = (i) =>{
                return (
                    <Tr bank={i.issuer} ammount={i.ammount} issue={i.issue} key={i.id}/>
                )
            }


            const Tickets = ()=>{
                return(
                    <table className="table-sm">
                    <thead>
                      <tr>
                        <th>BANK</th>
                        <th>Issue</th>
                        <th>Ammount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.tickets.map(i => mapTr(i))}
                    </tbody>
                  </table>
                )
            }


            return (
                <Tickets />
            )
        }

        return(
            <>
             <ScoreBar />
            {(data.tickets.length > 0) ? <Table /> : <p>0 Tickets issued for {data.name}</p>}
            </>
        )
    }

    return(
        <section className="section-bank-dashboard">
            <div className="bank-cbilscore-container">
                <h1>Check Cibil Score</h1>
                <input ref={username} className="login-input" type="text" placeholder="username"></input>
                <button onClick={()=> checkScore()} className="btn-login">Check Score</button>

                {data ? <Score /> : null}
            </div>

            <div className="bank-ticket-container">
                <h1>Issue Tickets</h1>

                <input ref={name} className="login-input" type="text" placeholder="username"></input>
                <input ref={aadhar} className="login-input" type="text" placeholder="Aadhar No"></input>
                <label for="issue">Choose Issue</label>
                <select ref={issue} name="issue" id="issue">
                <option value={0}>Unpayed Loan</option>
                <option value={1}>Check Bounce</option>
                </select>
                <input ref={ammount} className="login-input" type="number" placeholder="Ammount"></input>
                <button onClick={()=> issueTicket()} className="btn-login">Issue Ticket</button>
            </div>

            <div className="actions">
                    <p>Actions</p>
                    <button onClick={() => handleLogout()} className="btn-login">Logout</button>
            </div>
        </section>
    )
}

export default BankDashboard;