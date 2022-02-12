import React, { useState, createContext } from 'react';

import { Frame } from './Frame';
import FrameComponent from './FrameComponent';


type GameType = {
    frames: Frame[];
    currentFrame: number;
}

export const GameContext = createContext<GameType>({
    frames: [],
    currentFrame: 0
});


const Game = () => {

    const [game, setGame] = useState<GameType>({
        frames: [],
        currentFrame: 0
    });

    const [rollScore, setRollScore] = useState(0);

    const [scoreByFrame, setScoreByFrame] = useState(0);

    const isStarted = game.frames.length !== 0;

    const handleStart = () => {

        let temp = [];

        for(let i = 0; i < 10; i++) {
            let frame = new Frame();
            temp.push(frame);
        }

        setGame({
            ...game,
            frames: temp,
            currentFrame: 0
        });
    }

    const handleChange = (evt: any) => {
        setRollScore(evt.target.value);
    }
    

    const setFrameScore = () => {
        let score: number = 0;

        if(game.currentFrame === 0) {
            let frame = game.frames[game.currentFrame];
            score = frame.getRollTotalScore();
            frame.setTotal(score);
        } else {
            let currentGameFrame = game.frames[game.currentFrame];
            let previousGameFrame = game.frames[game.currentFrame - 1];

            score = currentGameFrame.getRollTotalScore();

            if(previousGameFrame.isSpare() && currentGameFrame.isComplete()) {
                let lastTotal = previousGameFrame.getFrameTotalScore();
                previousGameFrame.setTotal(currentGameFrame.rolls[0] + lastTotal);
            } else if(previousGameFrame.isStrike() && currentGameFrame.isComplete()) {
                let lastTotal = previousGameFrame.getFrameTotalScore();
                previousGameFrame.setTotal(currentGameFrame.rolls[0] + currentGameFrame.rolls[1] + lastTotal);
            }

            score += previousGameFrame.getFrameTotalScore();
            currentGameFrame.setTotal(score);
        }
    } 

    const handleRoll = (evt: any) => {
        evt.preventDefault();


        let tempFrames = game.frames;
        let frame = tempFrames[game.currentFrame];

        if(frame.isComplete()) {
            setGame({
                ...game,
                currentFrame: game.currentFrame++
            })
            frame = tempFrames[game.currentFrame];
        }

        frame.roll(rollScore);

        setFrameScore();

        setGame({
            ...game,
            frames: tempFrames
        });
        
    }
    
    const getScoreByFrame = (frameIdx: number) => {
        return game.frames[frameIdx].getFrameTotalScore();
    }

    const handleScoreByFrameChange = (evt: any) => {
            let idx = evt.target.value - 1;

            let score = getScoreByFrame(idx);

            setScoreByFrame(score);
    } 

    return (
        <div className="container">
            <div className="row border mb-5">
                {
                    game.frames.map((frame, idx) => {
                        return (
                            <GameContext.Provider value={game}>
                                    <FrameComponent idx={idx} />
                            </GameContext.Provider>
                        )
                    })
                }
            </div>

            <div className="row mb-3">
                <div className="col-auto">
                    <input type="number" onChange={(evt) => handleChange(evt)} className="form-control" />
                </div>
                <div className="col-auto">
                    <button type="button" onClick={(evt) => handleRoll(evt)} disabled={game.frames.length === 0}  className="btn btn-primary mb-3">Roll!</button> 
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-auto">
                    <button onClick={() => handleStart()} className="btn btn-primary">Start New Game!</button>
                </div>
            </div>
                {isStarted && (
                    <>
                        <div className="row mb-3">
                            <div className="col-auto">
                                <h5>GetScoreByFrame</h5>
                            </div>
                            <div className="col-auto">
                                <select onChange={(evt) => handleScoreByFrameChange(evt)} className="form-select">
                                    {
                                        game.frames.map((frame, idx) => {
                                            return (
                                                <option value={idx + 1}>Frame #{idx + 1}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-1">
                                <input type="number" value={scoreByFrame} disabled />
                            </div>
                        
                        </div>
                    </>
                )}
            
        </div>
    )



}

export default Game;