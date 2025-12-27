import React from 'react';

const Wireframe = ({ top, bottom, onReset }) => {
    return (
        <div className="window" style={{ width: '500px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div className="title-bar">MY LOOK</div>
            <div style={{ position: 'relative', flex: 1, backgroundColor: '#fff', overflow: 'hidden' }}>
                {/* Base Wireframe */}
                <img
                    src="/wireframe.png"
                    alt="Wireframe Body"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'full', objectFit: 'contain' }}
                />

                {/* Clothes Overlay - Positioning might need tweaking based on actual images */}
                {/* Assuming standard positions for now. In a real app we'd fine tune these % values */}
                <img
                    src={top.src}
                    alt="Selected Top"
                    style={{
                        position: 'absolute',
                        top: '15%', // Approximate position for top
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '40%', // Scale relative to container
                        pointerEvents: 'none'
                    }}
                />

                <img
                    src={bottom.src}
                    alt="Selected Bottom"
                    style={{
                        position: 'absolute',
                        top: '45%', // Approximate position for bottom
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '40%',
                        pointerEvents: 'none'
                    }}
                />
            </div>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
                <button onClick={onReset}>TRY AGAIN</button>
            </div>
        </div>
    );
};

export default Wireframe;
