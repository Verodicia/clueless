import React, { useState, useEffect } from 'react';
import Initialization from './components/Initialization';
import Wardrobe from './components/Wardrobe';

function App() {
    const [phase, setPhase] = useState('init'); // 'init', 'wardrobe'

    useEffect(() => {
        // 6 second initialization timer
        const timer = setTimeout(() => {
            setPhase('wardrobe');
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-container">
            {phase === 'init' && <Initialization />}
            {phase === 'wardrobe' && <Wardrobe />}
        </div>
    );
}

export default App;
