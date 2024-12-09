

import { createRoot } from 'react-dom/client';
import Layout from './Layout';




// Block Directory
document.addEventListener('DOMContentLoaded', () => {
	const productSwipeEl = document.getElementById('bslMainLayout');

	renderPlugin(productSwipeEl);
});


const renderPlugin = (el) => {
	if (el) {
		const attributes = JSON.parse(el?.dataset.attributes);

		createRoot(el).render(<>
			<Layout allData={attributes} />
		</>);

		el?.removeAttribute('data-attributes');
	}
}

