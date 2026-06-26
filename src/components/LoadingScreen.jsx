import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('Initializing Experience...');
    const [isFadeOut, setIsFadeOut] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 15;
            if (currentProgress > 100) currentProgress = 100;
            
            setProgress(currentProgress);
            
            if (currentProgress === 100) {
                clearInterval(interval);
                setText('Welcome.');
                setTimeout(() => {
                    setIsFadeOut(true);
                    setTimeout(() => {
                        setIsRemoved(true);
                        if (onComplete) onComplete();
                    }, 800);
                }, 500);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    if (isRemoved) return null;

    return (
        <div id="loading-screen" className={`loading-screen ${isFadeOut ? 'fade-out' : ''}`}>
            <div className="loader-container">
                <div className="loader-logo">PJ</div>
                <div className="loader-progress">
                    <div className="loader-progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="loader-text">{text}</div>
            </div>
        </div>
    );
}
