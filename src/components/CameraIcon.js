import React from 'react';
import './Loader.css';

const CameraIcon = () => {
    return (
        <div className="camera-icon">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.25C14.8995 17.25 17.25 14.8995 17.25 12C17.25 9.10051 14.8995 6.75 12 6.75C9.10051 6.75 6.75 9.10051 6.75 12C6.75 14.8995 9.10051 17.25 12 17.25Z" fill="currentColor" />
                <path d="M20.25 4.5H16.6286L14.7714 2.25H9.22863L7.37138 4.5H3.75C2.92125 4.5 2.25 5.17125 2.25 6V19.5C2.25 20.3287 2.92125 21 3.75 21H20.25C21.0788 21 21.75 20.3287 21.75 19.5V6C21.75 5.17125 21.0788 4.5 20.25 4.5ZM12 18.75C8.825 18.75 6.25 16.175 6.25 13C6.25 9.825 8.825 7.25 12 7.25C15.175 7.25 17.75 9.825 17.75 13C17.75 16.175 15.175 18.75 12 18.75Z" fill="currentColor" />
            </svg>
        </div>
    );
};

export default CameraIcon;
