import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider = ({ allData }) => {

    const { items, settings } = allData;
    const { slidesView } = settings || {};

    const SwiperEl = () => (
        <Swiper modules={[Navigation, A11y]} spaceBetween={20} navigation pagination={{ clickable: true }} loop={true} breakpoints={{
            0: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            577: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            // Small Desktop devices (769px to 1024px)
            769: {
                slidesPerView: slidesView?.desktop,
                spaceBetween: 10
            },
            // Large Desktop devices (1025px and above)
            1025: {
                slidesPerView: slidesView?.desktop,
                spaceBetween: 10
            }
        }}>
            {items?.map((item, index) => (
                <SwiperSlide key={index}>  {/* Keep the key here */}
                    <div className="item">
                        <div className="img">
                            <img src={item?.url} alt={`Logo ${index + 1}`} />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );

    return <SwiperEl />;
}

export default Slider;
