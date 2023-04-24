import React,{useEffect, useState, useRef} from "react";
import Loading from "./Loading";
import Axios from "../utils/AxiosConfig";



const AdminPanal = ()=>{

    const [data, setData] = useState(false);
    const [objections, setObjections] = useState(false);

    const token = window.localStorage.getItem("admintoken");

    
    useEffect(()=>{
        
        const handleErr =(msg)=>{
            alert(msg);
            localStorage.removeItem("admintoken")

            window.location.reload();
        }


        Axios.get("/api/objections", {headers: {Authorization: token}})
        .then(r => (r.status === 200) ? setObjections(r.data.docs) : null)
        .catch(e => (e) ? handleErr("Unable to get objections list ") : null);
    }, [token])

    const username = useRef("");


    const handleErr = (msg)=>{
        alert(msg);
    }
    const handleLogout = ()=>{
        window.localStorage.removeItem("banktoken");
        window.location.reload();
    }

    const checkScore = ()=>{
        Axios.patch("/api/userscore", {name: username.current.value})
        .then(r => (r.status === 200) ? setData(r.data) : null)
        .catch(e => (e) ? handleErr("Can't find cibil score for " + username.current.value) : null);
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


    const ObjTable = ()=>{
        

        
        const Table = ()=>{

            const Tr = ({name, description, id, ticket}) =>{

                const approveObj = (id, ticketId) =>{
                    let description = window.confirm("Are you sure to approve?");

                        if(description){
                            Axios.post("/api/removeobjection", {ticketId: ticketId, objectionId: id}, {headers: {Authorization: token}})
                            .then((r) => window.localStorage.reload())
                            .catch((e) => (e.response) ? alert("Objection not approved. try again") : null);
                     }
                }
    
                return(
                    <tr>
                        <th>{name}</th>
                        <td>{description}</td>
                        <td onClick={()=> approveObj(id, ticket)} className="btn-table">Approve</td>
                      </tr>
                )
            }
    
            const mapTr = (i) =>{
                return (
                    <Tr id={i._id} ticket={i.ticketId} description={i.description} name={i.userName} key={i.id}/>
                )
            }


            const Tickets = ()=>{
                return(
                    <table className="table-sm">
                    <thead>
                      <tr>
                        <th>Usernmae</th>
                        <th>Objection</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objections.map(i => mapTr(i))}
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
            {(objections.length > 0) ? <Table /> : <p>0 Objections Found.</p>}
            </>
        )

    }

 
    return(
        <section className="section-admin-panel">
            <div className="bank-cbilscore-container">
                <h1>Check Cibil Score</h1>
                <input ref={username} className="login-input" type="text" placeholder="username"></input>
                <button onClick={()=> checkScore()} className="btn-login">Check Score</button>

                {data ? <Score /> : null}
            </div>
            <div className="objections-table">
                <h1>Queries</h1>
                {objections ? <ObjTable /> : <Loading />}
            </div>
            <div className="actions">
                    <p>Actions</p>
                    <button onClick={() => handleLogout()} className="btn-login">Logout</button>
            </div>
        </section>
    )
}

export default AdminPanal;