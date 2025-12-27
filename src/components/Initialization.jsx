import React from 'react';

const Initialization = () => {
    // Create staggered rows: odd rows have offset
    const rows = [
        { count: 5, offset: true },   // Row 0 - offset
        { count: 5, offset: false },  // Row 1 - full
        { count: 5, offset: true },   // Row 2 - offset
        { count: 5, offset: false },  // Row 3 - full
        { count: 5, offset: true },   // Row 4 - offset
        { count: 5, offset: false },  // Row 5 - full
    ];

    return (
        <div style={{
            width: '120vw',
            height: '100vh',
            backgroundColor: '#0a0a0aff', // Dark blue
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            {/* Staggered hanger rows - responsive sizing */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
            }}>
                {rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            marginLeft: row.offset ? '-20vw' : '0', // Responsive offset
                            marginTop: rowIndex > 0 ? '-10vh' : '0', // Responsive overlap
                        }}
                    >
                        {Array.from({ length: row.count }).map((_, colIndex) => {
                            const isOddRow = rowIndex % 2 === 0;

                            return (
                                <div
                                    key={colIndex}
                                    style={{
                                        width: '30vw',  // Each hanger takes 20% of viewport width
                                        height: '30vh', // Each hanger takes 18% of viewport height
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        animation: isOddRow
                                            ? 'swingZoomReverse 2s ease-in-out infinite'
                                            : 'swingZoom 2s ease-in-out infinite',
                                        animationDelay: `${(colIndex * 0.1)}s`,
                                        transformOrigin: 'top center'
                                    }}
                                >
                                    <img
                                        src="/hanger.svg"
                                        alt="hanger"
                                        style={{
                                            width: '80%',
                                            height: '80%',
                                            objectFit: 'contain',
                                            filter: 'brightness(0) invert(1)', // Makes SVG white
                                            opacity: 1
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* CSS animations for swinging and zooming */}
            <style>{`
                @keyframes swingZoom {
                    0%, 100% { 
                        transform: rotate(-5deg) scale(1); 
                    }
                    50% { 
                        transform: rotate(5deg) scale(1.15); 
                    }
                }
                @keyframes swingZoomReverse {
                    0%, 100% { 
                        transform: rotate(5deg) scale(1.15); 
                    }
                    50% { 
                        transform: rotate(-5deg) scale(1); 
                    }
                }
            `}</style>
        </div>
    );
};

export default Initialization;
