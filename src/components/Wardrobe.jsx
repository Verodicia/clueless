import React, { useState } from 'react';

const tops = [
    { id: 'top1', src: '/clothes/top/top1.png', name: 'Yellow Plaid Jacket', style: 'cher' },
    { id: 'top2', src: '/clothes/top/top2.png', name: 'White T-Shirt', style: 'tai' },
    { id: 'yellowtarttop', src: '/clothes/top/yellowtarttop.png', name: 'Yellow Tart Top', style: 'cher' },
    { id: 'scrubtop', src: '/clothes/top/Scrubtop.png', name: 'Scrub Top', style: 'casual' },
    { id: 'blueralphla', src: '/clothes/top/blueralphla.png', name: 'Blue Ralph Lauren', style: 'preppy' },
    { id: 'greenramones', src: '/clothes/top/greenramones.png', name: 'Green Ramones Tee', style: 'punk' },
    { id: 'leviswhite', src: '/clothes/top/leviswhite.png', name: 'Levis White Shirt', style: 'casual' },
    { id: 'peguingray', src: '/clothes/top/peguingray.png', name: 'Penguin Gray Polo', style: 'preppy' },
    { id: 'redpolo', src: '/clothes/top/redpolo.png', name: 'Red Polo', style: 'preppy' },
    { id: 'whiteshirt', src: '/clothes/top/whiteshirt.png', name: 'White Shirt', style: 'casual' }
];

const bottoms = [
    { id: 'bottom1', src: '/clothes/bottom/bottom1.png', name: 'Yellow Plaid Skirt', style: 'cher' },
    { id: 'bottom2', src: '/clothes/bottom/bottom2.png', name: 'Blue Jeans', style: 'tai' },
    { id: 'yellowtartleg', src: '/clothes/bottom/yellowtartleg.png', name: 'Yellow Tart Pants', style: 'cher' },
    { id: 'redtartleg', src: '/clothes/bottom/redtartleg.png', name: 'Red Tart Pants', style: 'bold' },
    { id: 'bluescrubbottoms', src: '/clothes/bottom/bluescrubbottoms.png', name: 'Blue Scrub Bottoms', style: 'casual' },
    { id: 'greenchino', src: '/clothes/bottom/greenchino.png', name: 'Green Chinos', style: 'preppy' },
    { id: 'greyjean', src: '/clothes/bottom/greyjean.png', name: 'Grey Jeans', style: 'casual' },
    { id: 'lightbluebaggy', src: '/clothes/bottom/lightbluebaggy.png', name: 'Light Blue Baggy Jeans', style: '90s' }
];

const Wardrobe = ({ onDressMe }) => {
    const [topIndex, setTopIndex] = useState(0);
    const [bottomIndex, setBottomIndex] = useState(0);
    const [nextTopIndex, setNextTopIndex] = useState(null);
    const [nextBottomIndex, setNextBottomIndex] = useState(null);
    const [isAutoPlayingTop, setIsAutoPlayingTop] = useState(false);
    const [isAutoPlayingBottom, setIsAutoPlayingBottom] = useState(false);
    const [topSlideDirection, setTopSlideDirection] = useState(null);
    const [bottomSlideDirection, setBottomSlideDirection] = useState(null);

    // Auto-cycle effect for TOPS
    React.useEffect(() => {
        let interval;
        if (isAutoPlayingTop) {
            interval = setInterval(() => {
                const next = (topIndex + 1) % tops.length;
                setNextTopIndex(next);
                setTopSlideDirection('left');
                setTimeout(() => {
                    setTopIndex(next);
                    setNextTopIndex(null);
                    setTopSlideDirection(null);
                }, 400);
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isAutoPlayingTop, topIndex]);

    // Auto-cycle effect for BOTTOMS
    React.useEffect(() => {
        let interval;
        if (isAutoPlayingBottom) {
            interval = setInterval(() => {
                const next = (bottomIndex + 1) % bottoms.length;
                setNextBottomIndex(next);
                setBottomSlideDirection('left');
                setTimeout(() => {
                    setBottomIndex(next);
                    setNextBottomIndex(null);
                    setBottomSlideDirection(null);
                }, 400);
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [isAutoPlayingBottom, bottomIndex]);

    const handleNextTop = () => {
        const next = (topIndex + 1) % tops.length;
        setNextTopIndex(next);
        setTopSlideDirection('left');
        setTimeout(() => {
            setTopIndex(next);
            setNextTopIndex(null);
            setTopSlideDirection(null);
        }, 400);
    };

    const handlePrevTop = () => {
        const next = (topIndex - 1 + tops.length) % tops.length;
        setNextTopIndex(next);
        setTopSlideDirection('right');
        setTimeout(() => {
            setTopIndex(next);
            setNextTopIndex(null);
            setTopSlideDirection(null);
        }, 400);
    };

    const handleNextBottom = () => {
        const next = (bottomIndex + 1) % bottoms.length;
        setNextBottomIndex(next);
        setBottomSlideDirection('left');
        setTimeout(() => {
            setBottomIndex(next);
            setNextBottomIndex(null);
            setBottomSlideDirection(null);
        }, 400);
    };

    const handlePrevBottom = () => {
        const next = (bottomIndex - 1 + bottoms.length) % bottoms.length;
        setNextBottomIndex(next);
        setBottomSlideDirection('right');
        setTimeout(() => {
            setBottomIndex(next);
            setNextBottomIndex(null);
            setBottomSlideDirection(null);
        }, 400);
    };

    const toggleAutoPlayTop = () => {
        setIsAutoPlayingTop((prev) => !prev);
    };

    const toggleAutoPlayBottom = () => {
        setIsAutoPlayingBottom((prev) => !prev);
    };

    const [showMismatch, setShowMismatch] = useState(false);
    const [showMatch, setShowMatch] = useState(false);
    const [matchPhase, setMatchPhase] = useState('wireframe'); // 'wireframe', 'topless', 'outfit'

    const handleDress = () => {
        setIsAutoPlayingTop(false);
        setIsAutoPlayingBottom(false);
        const topStyle = tops[topIndex].style;
        const bottomStyle = bottoms[bottomIndex].style;

        // Check if styles match (same style or compatible)
        if (topStyle !== bottomStyle) {
            setShowMismatch(true);
            // Play mismatch sound
            const audio = new Audio('/wrong-answer-buzzer.mp3');
            audio.play().catch(e => console.log('Audio play failed:', e));
            setTimeout(() => setShowMismatch(false), 2500);
        } else {
            // Match found - start the dress sequence
            setShowMatch(true);
            setMatchPhase('wireframe');

            // After 2 seconds, switch to topless
            setTimeout(() => {
                setMatchPhase('topless');
            }, 2000);

            // After 4 seconds, switch to outfit (placeholder for now)
            setTimeout(() => {
                setMatchPhase('outfit');
            }, 4000);

            // After 6 seconds, could call onDressMe or keep showing
            // For now we'll let user click to dismiss
        }
    };

    const closeMatchOverlay = () => {
        setShowMatch(false);
        setMatchPhase('wireframe');
    };

    // Outgoing slide animation style (current item sliding out)
    const getSlideOutStyle = (direction) => ({
        position: 'absolute',
        transition: direction ? 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out' : 'none',
        transform: direction === 'left' ? 'translateX(-100%)' : direction === 'right' ? 'translateX(100%)' : 'translateX(0)',
        opacity: direction ? 0 : 1
    });

    // Incoming slide animation style (next item sliding in from opposite side)
    const getSlideInStyle = (direction) => ({
        position: 'absolute',
        transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out',
        transform: 'translateX(0)',
        opacity: 1
    });

    // Initial position for incoming item (starts off-screen on opposite side)
    const getSlideInInitialStyle = (direction) => ({
        position: 'absolute',
        animation: direction === 'left' ? 'slideInFromRight 0.4s ease-in-out forwards' : 'slideInFromLeft 0.4s ease-in-out forwards'
    });

    return (
        <>
            {/* MIS-MATCH! Popup Overlay */}
            {showMismatch && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{
                        backgroundColor: '#7B68EE',
                        borderTop: '8px solid #a8a0ff',
                        borderLeft: '8px solid #a8a0ff',
                        borderBottom: '8px solid #3a2d80',
                        borderRight: '8px solid #3a2d80',
                        boxShadow: '0 0 60px rgba(123, 104, 238, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.1)',
                        padding: '30px 80px',
                        textAlign: 'center',
                        animation: 'popIn 0.3s ease-out'
                    }}>
                        <span style={{
                            fontFamily: 'ChicagoFLF, Chicago, Geneva, sans-serif',
                            fontSize: 'clamp(48px, 15vw, 320px)',
                            fontWeight: 'bold',
                            color: '#1a0a4a',
                            textShadow: '3px 3px 0 #9080d0, -1px -1px 0 #c0b0ff',
                            letterSpacing: '4px'
                        }}>
                            MIS-MATCH!
                        </span>
                    </div>
                </div>
            )}

            <div className="window" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', fontSize: '20px', border: 'none' }}>
                {/* Header Bar - styled like footer */}
                <div style={{
                    backgroundColor: '#000000ff',
                    borderBottom: '10px solid #5e5e5eff',
                    width: '100%',
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'ChicagoFLF, Chicago, Geneva, sans-serif',
                    fontSize: '48px',
                    color: '#fff',
                    fontWeight: 'bold',
                    boxSizing: 'border-box'
                }}>
                    <span>CLARK'S WARDROBE</span>
                    <button className="lavender-hover" style={{
                        backgroundColor: '#000000',
                        borderTop: '3px solid #fff',
                        borderLeft: '3px solid #fff',
                        borderBottom: '3px solid #404040',
                        borderRight: '3px solid #404040',
                        boxShadow: '2px 2px 0 #000, inset -1px -1px 0 #808080, inset 1px 1px 0 #dfdfdf',
                        padding: '8px 20px',
                        fontSize: '48px',
                        fontWeight: 'bold',
                        fontFamily: 'ChicagoFLF, Chicago, Geneva, sans-serif',
                        color: '#ffffff',
                        cursor: 'pointer'
                    }}>FALL'S FASHIONS</button>
                    <span style={{ visibility: 'hidden' }}>CHER'S WARDROBE</span>
                </div>
                <div style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d4d0c8', backgroundImage: "url('/leopard-bg.png')", backgroundSize: '100% 100%', position: 'relative', overflow: 'hidden' }}>

                    {/* Main Content Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', alignItems: 'center', justifyContent: 'stretch', padding: '0' }}>

                        {/* Top section - either top clothing or empty during match */}
                        {!showMatch && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                flex: 1,
                                justifyContent: 'flex-end',
                                animation: 'fadeIn 0.3s ease-out'
                            }}>
                                <div style={{ ...itemDisplayFrame, position: 'relative' }}>
                                    <img src={tops[topIndex].src} alt={tops[topIndex].name} style={{ width: '90%', height: 'auto', maxHeight: '95%', objectFit: 'contain', ...getSlideOutStyle(topSlideDirection) }} />
                                    {nextTopIndex !== null && (
                                        <img src={tops[nextTopIndex].src} alt={tops[nextTopIndex].name} style={{ width: '90%', height: 'auto', maxHeight: '95%', objectFit: 'contain', ...getSlideInInitialStyle(topSlideDirection) }} />
                                    )}
                                </div>
                                <div style={buttonBarStyle}>
                                    <button className="lavender-hover" style={navButtonStyle} onClick={handlePrevTop}>
                                        <span style={arrowStyle}>◀◀</span>
                                    </button>
                                    <button className="lavender-hover" style={navButtonMidStyle} onClick={toggleAutoPlayTop}>
                                        <span style={arrowStyle}>{isAutoPlayingTop ? '⏸' : '►'}</span>
                                    </button>
                                    <button className="lavender-hover" style={navButtonStyle} onClick={handleNextTop}>
                                        <span style={arrowStyle}>►►</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Bottom section with side buttons - always visible */}
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', flex: showMatch ? 1 : 1, justifyContent: 'center' }}>

                            {/* BROWSE / Auto Dress Button - Left of content */}
                            <button
                                className="lavender-hover"
                                style={{
                                    ...sideButtonStyle,
                                    alignSelf: showMatch ? 'flex-end' : 'flex-end',
                                    backgroundColor: showMatch ? '#c8a0e8' : sideButtonStyle.backgroundColor,
                                    borderTop: showMatch ? '8px solid #e0c0ff' : sideButtonStyle.borderTop,
                                    borderLeft: showMatch ? '8px solid #e0c0ff' : sideButtonStyle.borderLeft,
                                    borderBottom: showMatch ? '8px solid #6040a0' : sideButtonStyle.borderBottom,
                                    borderRight: showMatch ? '8px solid #6040a0' : sideButtonStyle.borderRight
                                }}
                            >
                                {showMatch ? (
                                    <>
                                        <span style={buttonLabelStyle}>Auto Dress</span>
                                    </>
                                ) : (
                                    <span style={buttonLabelStyle}>BROWSE</span>
                                )}
                            </button>

                            {/* Center Content - either match sequence or bottom clothing */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 0 }}>
                                {showMatch ? (
                                    /* Match Sequence - Wireframe scan, then topless, then outfit */
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: 'full',
                                        flex: 1,
                                        animation: 'wipeIn 0.5s ease-out'
                                    }}>
                                        <div style={{
                                            ...itemDisplayFrame,
                                            flex: 0,
                                            height: 'auto',
                                            maxHeight: 'full',
                                            position: 'relative',
                                            backgroundColor: '#000',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Wireframe phase */}
                                            {matchPhase === 'wireframe' && (
                                                <>
                                                    <img
                                                        src="/clothes/wireframe.png"
                                                        alt="Wireframe"
                                                        style={{
                                                            width: '100%',
                                                            height: '78vh',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        height: '6px',
                                                        background: 'linear-gradient(to bottom, transparent, #00ffff, #00ffff, transparent)',
                                                        boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
                                                        animation: 'scanDown 2s ease-in-out infinite'
                                                    }} />
                                                </>
                                            )}

                                            {/* Topless phase */}
                                            {matchPhase === 'topless' && (
                                                <img
                                                    src="/clothes/topless.png"
                                                    alt="Ready for outfit"
                                                    style={{
                                                        width: 'auto',
                                                        height: '78vh',
                                                        maxWidth: '100%',
                                                        maxHeight: '100%',
                                                        objectFit: 'contain',
                                                        animation: 'fadeIn 0.5s ease-out'
                                                    }}
                                                />
                                            )}

                                            {/* Outfit phase - placeholder */}
                                            {matchPhase === 'outfit' && (
                                                <div style={{
                                                    width: '100%',
                                                    height: '78vh',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <img
                                                        src="/clothes/topless.png"
                                                        alt="Outfit preview"
                                                        style={{
                                                            width: 'auto',
                                                            height: '70vh',
                                                            maxWidth: '100%',
                                                            maxHeight: '100%',
                                                            objectFit: 'contain',
                                                            animation: 'fadeIn 0.5s ease-out'
                                                        }}
                                                    />
                                                    <div style={{
                                                        fontSize: 'clamp(14px, 2vw, 24px)',
                                                        color: '#00ffff',
                                                        fontFamily: 'ChicagoFLF, Chicago, Geneva, sans-serif',
                                                        textAlign: 'center',
                                                        padding: '10px'
                                                    }}>
                                                        {tops[topIndex].name} + {bottoms[bottomIndex].name}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Back button bar */}
                                        <div style={buttonBarStyle}>
                                            <button className="lavender-hover" style={{ ...navButtonStyle, flex: 1 }} onClick={closeMatchOverlay}>
                                                <span style={arrowStyle}>BACK</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Bottom clothing selection */
                                    <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                        <div style={{ ...itemDisplayFrame, position: 'relative' }}>
                                            <img src={bottoms[bottomIndex].src} alt={bottoms[bottomIndex].name} style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', ...getSlideOutStyle(bottomSlideDirection) }} />
                                            {nextBottomIndex !== null && (
                                                <img src={bottoms[nextBottomIndex].src} alt={bottoms[nextBottomIndex].name} style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain', ...getSlideInInitialStyle(bottomSlideDirection) }} />
                                            )}
                                        </div>
                                        <div style={buttonBarStyle}>
                                            <button className="lavender-hover" style={navButtonStyle} onClick={handlePrevBottom}>
                                                <span style={arrowStyle}>◀◀</span>
                                            </button>
                                            <button className="lavender-hover" style={navButtonMidStyle} onClick={toggleAutoPlayBottom}>
                                                <span style={arrowStyle}>{isAutoPlayingBottom ? '⏸' : '►'}</span>
                                            </button>
                                            <button className="lavender-hover" style={navButtonStyle} onClick={handleNextBottom}>
                                                <span style={arrowStyle}>►►</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* DRESS ME Button - Right of content */}
                            <button className="lavender-hover" style={{ ...sideButtonStyleRight, alignSelf: 'flex-end' }} onClick={handleDress}>
                                <span style={buttonLabelStyle}>DRESS</span>
                                <span style={buttonLabelStyle}>ME</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer Menu */}
                    <div style={{
                        backgroundColor: '#000000ff',
                        borderTop: '10px solid #5e5e5eff',
                        width: '100%',
                        padding: '6px',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        flexWrap: 'wrap',
                        fontFamily: 'ChicagoFLF, Chicago, Geneva, sans-serif',
                        fontSize: '48px',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        <span>SHOES</span>
                        <span>JEWELRY</span>
                        <span>SCARVES</span>
                        <span>PANTYHOSE</span>
                        <span>UNDERWEAR</span>
                        <span>PANTS</span>
                        <span>SWEATER</span>
                        <button className="lavender-hover" style={{
                            backgroundColor: '#000000',
                            borderTop: '3px solid #fff',
                            borderLeft: '3px solid #fff',
                            borderBottom: '3px solid #404040',
                            borderRight: '3px solid #404040',
                            boxShadow: '2px 2px 0 #000, inset -1px -1px 0 #808080, inset 1px 1px 0 #dfdfdf',
                            padding: '4px 12px',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            fontFamily: 'ChicagoFLF, Chicago, Geneva, sans-serif',
                            color: '#ffffff',
                            cursor: 'pointer'
                        }}>MORE...</button>
                    </div>
                </div>
            </div>
        </>
    );
};

// Frame size for clothing display - fixed height for consistent sizing
const itemDisplayFrame = {
    width: '50vw',
    maxWidth: '870px',
    height: '35vh',
    minHeight: '150px',
    backgroundColor: '#ffffffff',
    borderTop: '4px solid #fff',
    borderLeft: '4px solid #fff',
    borderBottom: '4px solid #404040',
    borderRight: '4px solid #404040',
    boxShadow: '2px 2px 0 #000, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '10px'
};

// Frame for bottom clothing display - 50% taller than top
const bottomDisplayFrame = {
    width: '50vw',
    maxWidth: '870px',
    height: 'auto',
    minHeight: '150px',
    maxHeight: '55vh',  // 50% more than 37vh
    backgroundColor: '#ffffffff',
    borderTop: '4px solid #fff',
    borderLeft: '4px solid #fff',
    borderBottom: '4px solid #404040',
    borderRight: '4px solid #404040',
    boxShadow: '2px 2px 0 #000, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '10px'
};

// Button bar for navigation
const buttonBarStyle = {
    display: 'flex',
    width: '50vw',
    maxWidth: '880px',
    height: '6vh',
    minHeight: '50px',
    backgroundColor: '#c0c0c0',
    borderTop: '6px solid #fff',
    borderLeft: '6px solid #fff',
    borderBottom: '6px solid #404040',
    borderRight: '6px solid #404040',
    boxShadow: '2px 2px 0 #000',
    marginTop: '2px',
    overflow: 'hidden'
};

// Side button (BROWSE) - 3D beveled, double height of nav bar, aligned to bottom
const sideButtonStyle = {
    width: '20vw',
    minWidth: '70px',
    height: 'calc(12vh + 16px)',
    minHeight: '116px',
    backgroundColor: '#c0c0c0',
    borderTop: '8px solid #fff',
    borderLeft: '8px solid #fff',
    borderBottom: '8px solid #404040',
    borderRight: '8px solid #404040',
    boxShadow: '2px 2px 0 #000, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '10px',
    alignSelf: 'flex-end',
    marginBottom: '0'
};

// Side button (DRESS ME) - 3D beveled, double height of nav bar
const sideButtonStyleRight = {
    width: '20vw',
    minWidth: '70px',
    height: 'calc(12vh + 16px)',
    minHeight: '116px',
    backgroundColor: '#c0c0c0',
    borderTop: '8px solid #fff',
    borderLeft: '8px solid #fff',
    borderBottom: '8px solid #404040',
    borderRight: '8px solid #404040',
    boxShadow: '2px 2px 0 #000, inset -2px -2px 0 #808080, inset 2px 2px 0 #dfdfdf',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '10px',
    alignSelf: 'flex-end',
    marginBottom: '0'
};

// Nav button (left/right arrows) - 3D beveled
const navButtonStyle = {
    flex: 1,
    height: '100%',
    backgroundColor: '#c0c0c0',
    borderTop: '6px solid #fff',
    borderLeft: '6px solid #fff',
    borderBottom: '6px solid #404040',
    borderRight: '6px solid #404040',
    boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #dfdfdf',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0
};

// Middle play button - 3D beveled
const navButtonMidStyle = {
    flex: 1,
    height: '100%',
    backgroundColor: '#c0c0c0',
    borderTop: '6px solid #fff',
    borderLeft: '6px solid #fff',
    borderBottom: '6px solid #404040',
    borderRight: '6px solid #404040',
    boxShadow: 'inset -1px -1px 0 #808080, inset 1px 1px 0 #dfdfdf',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0
};

// Button label text style
const buttonLabelStyle = {
    fontFamily: 'ChicagoFLF, Chicago, Geneva, sans-serif',
    fontSize: 'clamp(28px, 8vw, 88px)',
    fontWeight: 'bold',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

// Arrow/symbol styling
const arrowStyle = {
    color: '#2a2a2a',
    fontSize: 'clamp(16px, 12vh, 70px)',
    fontWeight: 'bold'
};

export default Wardrobe;
