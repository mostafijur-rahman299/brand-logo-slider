
import { createRoot } from 'react-dom/client';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';

document.addEventListener('DOMContentLoaded', () => {
    const ele = document.querySelector('.mainArea');
    
    createRoot(ele).render(<div className='bls_mainArea'>
        <Header/>
        <Body/>
        <Footer/>
    </div>);

});

