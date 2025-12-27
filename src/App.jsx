import React, { useState, useEffect } from 'react';
import Initialization from './components/Initialization';
import Wardrobe from './components/Wardrobe';
import Wireframe from './components/Wireframe';
import MismatchAlert from './components/MismatchAlert';

function App() {
    const [phase, setPhase] = useState('init'); // 'init', 'wardrobe', 'dress'
    const [selectedOutfit, setSelectedOutfit] = useState({ top: null, bottom: null });
    const [showMismatch, setShowMismatch] = useState(false);

    useEffect(() => {
        // 2 second initialization timer
        const timer = setTimeout(() => {
            setPhase('wardrobe');
        }, 8000);
        return () => clearTimeout(timer);
    }, []);

    const handleDressMe = (top, bottom) => {
        setSelectedOutfit({ top, bottom });

        // Check for mismatch
        if (top.style !== bottom.style) {
            setShowMismatch(true);
        }
        setPhase('dress');
    };

    const handleReset = () => {
        setPhase('wardrobe');
        setShowMismatch(false);
        setSelectedOutfit({ top: null, bottom: null });
    };

    const closeMismatch = () => {
        setShowMismatch(false);
    };

    return (
        <div className="app-container">
            {phase === 'init' && <Initialization />}

            {phase === 'wardrobe' && (
                <Wardrobe onDressMe={handleDressMe} />
            )}

            {phase === 'dress' && (
                <>
                    <Wireframe
                        top={selectedOutfit.top}
                        bottom={selectedOutfit.bottom}
                        onReset={handleReset}
                    />
                    {showMismatch && <MismatchAlert onClose={closeMismatch} />}
                </>
            )}
        </div>
    );
}

export default App;
