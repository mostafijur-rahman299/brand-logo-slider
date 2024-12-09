import {__experimentalInputControl as InputControl } from '@wordpress/components';

const MediaUpload = ({ value, onChange }) => {
    
    const openMediaModal = () => {
        // Initialize wp.media modal
        var customMedia = wp.media({
            state: 'customState',
            states: [
                new wp.media.controller.Library({
                    id: 'customState',
                    title: 'Library',
                    library: wp.media.query({
                        type: 'image',
                    }),
                    multiple: false,
                    date: false,
                })
            ]
        });

        // Open the media modal
        customMedia.open();

        // Handle the selected image
        customMedia.on('select', () => {
            const selected = customMedia.state().get('selection').first().toJSON();
            onChange(selected.url);  // Pass the URL to the parent component
        });
    };

    return (
        <div className="ph_media_upload">
            <InputControl value={value} placeholder="URL" />
            <button className="uploadBtn" onClick={openMediaModal}>Upload Image</button>
        </div>
    );
};

export default MediaUpload;
