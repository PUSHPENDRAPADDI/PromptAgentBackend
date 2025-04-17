import React, { useState } from 'react';
import './PatternDesignScreen.css';

const PatternDesignScreen = () => {
    const [gridSize, setGridSize] = useState(5);

    const handleGridChange = (e) => {
        setGridSize(Number(e.target.value));
    };

    return (
        <div className="pattern-design-screen">
            <div className="controls">
                <label>
                    Grid Size:
                    <input
                        type="number"
                        min="3"
                        max="10"
                        value={gridSize}
                        onChange={handleGridChange}
                    />
                </label>
            </div>
        </div>
    );
};

export default PatternDesignScreen;
