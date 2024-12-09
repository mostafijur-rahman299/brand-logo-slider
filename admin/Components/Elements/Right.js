import { useEffect, useState } from 'react';
import useWPAjax from '../../utils/useWPAjax';
import { Navigation, A11y, Autoplay, Mousewheel, EffectCards, EffectFlip, EffectCoverflow, EffectCube, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import Layout from '../../../Common/Layout';

const Right = () => {
    const [allData, setData] = useState([]);
    const { data, isLoading, refetch } = useWPAjax('bls_ph_brand_logo_data', { nonce: window.wpApiSettings.nonce }, true);
    const { items } = data || {};

    // Event Listener for refetching data
    useEffect(() => {
        const handleDataFetched = () => {
            refetch();
        };

        window.addEventListener('dataFetched', handleDataFetched);

        // Cleanup event listener when component unmounts
        return () => {
            window.removeEventListener('dataFetched', handleDataFetched);
        };
    }, [refetch]);

    // Update logoItems when data is loaded
    useEffect(() => {
        if (!isLoading && data) {
            setData(data);
        }
    }, [isLoading, data]);

    return (
        <div className="right">
            <Layout allData={allData} />
        </div>
    );
};

export default Right;
