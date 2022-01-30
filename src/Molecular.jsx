import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Molecular2.css';

export const Molecular = () => {
    const [res, setRes] = useState([]);
    const [data, setData] = useState([]);
    const [childFirst, setChildFirst] = useState([]);
    const [childTwo, setChildTwo] = useState([]);
    const [FamilyMembers, setFamilyMembers] = useState(false)
    const [FamilyOne, setFamilyOne] = useState(false)
    const [FamilyTwo, setFamilyTwo] = useState(false)

    useEffect(() => {
        getData();
    }, []);
    const baseUrl = "https://poc.molecularconnections.com/Tree/getTerm";
    var param = { level: 1 }
    const getData = () => {
        axios.post(baseUrl, param,
            { headers: { 'Content-Type': 'application/json' } }).then((res) => {
                setRes(res?.data)
                setData(res.data?.termsrelation)
                setChildFirst(res.data.termsrelation[0]?.terms)
                setChildTwo(res.data.termsrelation[1]?.terms)
            })
    }
    let plus = <i class="far fa-plus-square" style={{ "color": "gray", "backgroundColor": "whitesmoke", "margin": "5px" }}></i>
    let folder = <i class="fas fa-folder" style={{ "color": "wheat", "margin": "5px" }}></i>

    return <div style={{ "marginLeft": "650px" }}>

        <div class="form-group col-lg-4 col-md-6">
            <div class="card-header-action">
                <li class="btn btn-primary" onClick={() => setFamilyMembers(!FamilyMembers)}
                >   {plus}{folder}{res?.formated_name}</li>
            </div>

            {FamilyMembers ?
                <>
                    <li onClick={() => setFamilyOne(!FamilyOne)} > &nbsp;&nbsp;&nbsp;&nbsp;  {plus} {folder} {data[0]?.rel} </li>
                    {FamilyOne ?
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{plus} {folder}{childFirst[0]?.name} </li>
                        : null}
                    <li onClick={() => setFamilyTwo(!FamilyTwo)}> &nbsp;&nbsp;&nbsp;&nbsp;   {plus}{folder}{data[1]?.rel}</li>
                    {FamilyTwo ?
                        <>
                            {childTwo?.map((val, i) => {
                                return <li key={i.nodeid} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {plus} {folder}{val.name}</li>
                            })}
                        </>
                        : null
                    }
                </>
                : null}
        </div>
    </div>;
};
export default Molecular;
