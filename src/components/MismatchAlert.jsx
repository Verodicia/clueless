import React from 'react';

const MismatchAlert = ({ onClose }) => {
    return (
        <div className="window" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: '450px'
        }}>
            <div className="title-bar" style={{ backgroundColor: '#ff0000', fontSize: '20px', padding: '6px' }}>WARNING</div>
            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d4d0c8' }}>
                <img src="/Mis-match.png" alt="Mismatch" style={{ maxWidth: '100%', marginBottom: '20px', border: '2px solid black' }} />
                <div style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '22px', textAlign: 'center' }}>AS IF! COMPLETE MISMATCH!</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={onClose} style={{ fontSize: '18px', padding: '10px 30px' }}>TRY AGAIN</button>
                    <button onClick={onClose} style={{ fontSize: '18px', padding: '10px 30px' }}>IGNORE</button>
                </div>
            </div>
        </div>
    );
};

export default MismatchAlert;
