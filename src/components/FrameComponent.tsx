import React, { useContext } from 'react';
import { GameContext } from './Game';

const FrameComponent = ({ idx } : { idx: number}) => {

    const game = useContext(GameContext);
    const { rolls, total } = game.frames[idx];

    const isBordered = game.currentFrame === idx ? "border-dark" : "";

    return (
        <div className={"col container border text-center " + isBordered}>
            <div className="row mb-3">

                <div className="col-6">
                    <h6>{rolls[0]}</h6>
                </div>
                <div className="col-6 border border-dark">
                    <h6>{rolls[1]}</h6>
                </div>

            </div>

            <div className="row">
                <h5>{total}</h5>
            </div>
        </div>
    );

}

export default FrameComponent;