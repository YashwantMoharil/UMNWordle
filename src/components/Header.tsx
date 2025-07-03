import '../styles/Header.css';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import hamBurgerIcon from '../assets/hamburger.png';
import crossMenu from '../assets/crossMenu.png';
import stats from '../assets/graph.png';
import leaderBoard from '../assets/team.png';
import Stats from './Stats';
import LeaderBoard from './LeaderBoard';

// *********************
// undefined if no login 
// ***********************
type headerProps = {
    setIsAuth: (auth: boolean) => void;
};

export default function Header({ setIsAuth }: headerProps) {
    const cookies = new Cookies();
    console.log("this", cookies.get("emailIid"));
    const [sideBar, setSideBar] = useState(false);
    const [statModal, setStatModal] = useState(false);
    const [displayLeaderBoard, setDisplayLeaderBoard] = useState(false);
    return (
        <div className="header">
            <div className='userName'>Hello {cookies.get("emailId")}!</div>
            <img src={stats} className='menuBtnStats' title="Your Stats" onClick={() => setStatModal(true)} />
            <img src={leaderBoard} className='menuBtnLeaderBoard' title="Leader Board" onClick={() => setDisplayLeaderBoard(true)} />
            {statModal && !displayLeaderBoard && <Stats
                isOpen={true}
                onClose={() => setStatModal(false)}
                currentAttempts={0}
                won={false}
                isLoggedIn = {cookies.get("emailId") === "ttt"}
            />}
            {displayLeaderBoard && !statModal && <LeaderBoard
                isOpen={true}
                onClose={() => setDisplayLeaderBoard(false)}
                currentAttempts={0}
                won={false}
                isLoggedIn = {cookies.get("emailIid") == ""}
            />}
            {!sideBar ?
                <img src={hamBurgerIcon} className='menuBtnHamburger' onClick={() => setSideBar(prev => !prev)} />
                : (
                    <>
                        <img src={crossMenu} className='menuBtnCross' onClick={() => setSideBar(prev => !prev)} />
                        <div className="sideMenu">
                            <button onClick={() => setIsAuth(false)}>Log Out</button>
                        </div>
                    </>

                )}
        </div>
    );
} 