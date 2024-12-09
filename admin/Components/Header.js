import React, { useState } from 'react';

const Header = () => {
    const [copyText, setCopyText] = useState('Copy');

    // Function to handle copy
    const handleCopy = () => {
        const textToCopy = '[bls-slider]';

        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopyText('Copied!'); // Change text to "Copied!"

                // Reset text to "Copy" after 2 seconds
                setTimeout(() => setCopyText('Copy'), 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className='header_area'>
            <div className="shortCode">
                <div className="content">
                    <div className='left'>[bls-slider]</div>
                    <div className='right' onClick={handleCopy}>{copyText}</div>
                </div>
            </div>


        </div>
    );
};

export default Header;
