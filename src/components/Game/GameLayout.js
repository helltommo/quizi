//-------------------------------------------- OMAR'S CODE
import React , {useEffect, useContext}from 'react'
import Play from './steps/Play';
import axios from 'axios';
import './steps/Answers.css'
//import {UserContext} from '../Context/UserContext';
import {QuizContext} from '../Context/QuizContext';

export default function GameLayout(props) {
    const { quiz } = useContext(QuizContext);

    useEffect(() => {
        console.log(quiz);
    },[quiz]);

    const arr = [   {username:"Omar5000", points:"732"},
    {username:"HarelP",     points:"755"},
    {username:"jon",        points:"231"},
    {username:"BigBob",      points:"795"},
    {username:"ILoveTRUMP",      points:"795"},
    {username:"ILoveTRUMP",      points:"795"}]
    //console.log(quiz);

    const notNull = quiz !== null;
    return (
        <div className="row" style={{ height: "85vh" }}>
            <div className="col l2 s12 hideMobile">
                <table>
                    <thead>
                         <tr>
                            <th>Username</th>
                            <th>Points</th>
                        </tr>
                                {/* {quiz.map((el, index)=>{
                                return (
                                    <tr key={index} >
                                            <th>{el.dateCreated}</th>
                                           
                                    </tr>
                                )
                            })} */}
                              {notNull && quiz.players.map((el, index)=>{
                                return (
                                    <tr key={index} >
                                            <th>{el.playerName}</th>
                                            <th>{el.points}</th>
                                    </tr>
                                )
                            })}
                    </thead>
                </table>
            </div>
            <div className="col l10 s12">
                <Play />
            </div>
        </div>
    )
}

// setup quiz specific leaderboard for every quiz



