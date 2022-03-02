import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import { Field, ModalInfo, Data, StyledSwiper } from "./styles";
//import Title4 from "../General/Titles/index";

const PeripheralsSwiper = (items) => {
  return (
    <StyledSwiper>
      <h4>Peripherals:</h4>
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {items.items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <ModalInfo>
                <Field>UID: </Field>
                <Data>{item.uid}</Data>
              </ModalInfo>
              <ModalInfo>
                <Field>Vendor: </Field>
                <Data>{item.vendor}</Data>
              </ModalInfo>
              <ModalInfo>
                <Field>Created: </Field>
                <Data>{item.created_at}</Data>
              </ModalInfo>
              <ModalInfo>
                <Field>Status: </Field>
                <Data color={item.status === 1 ? "#1890FF" : "#BFBFBF"}>
                  {item.status === 1 ? "ON" : "OFF"}
                </Data>
              </ModalInfo>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </StyledSwiper>
  );
};
export default PeripheralsSwiper;
