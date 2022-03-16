import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Carousel from "react-elastic-carousel";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";
import { Link } from "react-router-dom";

function CarouselHome(props) {
  const { getData: propsGetData, adsReducer } = props;
  const [showBannerAds, setShowBannerAds] = useState(true);
  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;
  const carouselRef = useRef(null);
  const totalPages = adsReducer?.data?.ads.length;
  let resetTimeout;

  useEffect(() => {
    propsGetData(ActionTypes.GET_ADS, "/ad");
  }, [propsGetData]);
  return (
    <div className="col-md-9 col-lg-9 mx-auto col-sm-12 my-2">
      {showBannerAds && (
        <div className="col-12 pointer home-slider">
          {/* <span
            style={{
              position: "absolute",
              right: "0%",
              top:"-1%",
              zIndex: 100,
            }}
            onClick={() => setShowBannerAds(false)}
          >
            <img src="./assets/images/close-svg.svg" height={20} width={20} />
          </span> */}
          {/* <Carousel
            ref={carouselRef}
            itemsToShow={1}
            enableAutoPlay={true}
            transitionMs={1000}
            style={{ position: "relative" }}
            infinite={true}
            // onNextEnd={({ index }) => {
            //   clearTimeout(resetTimeout);
            //   if (index + 1 === totalPages) {
            //     resetTimeout = setTimeout(() => {
            //       carouselRef?.current?.goTo(0);
            //     }, 1000);
            //   }
            // }}
          >
            {adsReducer?.data?.ads?.map((ad, index) => (
              <img
                src={`${imageBaseUrl}${ad?.ad_url}`}
                className="w-100"
                style={{ height: "150px" }}
                alt={ad?.name}
              />
            ))}
          </Carousel> */}
          <Slider
            dots={true}
            arrows={true}
            slidesToShow={1}
            adaptiveHeight={true}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={2000}
          >
            {adsReducer?.data?.ads?.map((ad, index) => (
              <div className="slide">
                <Link
                  onClick={() =>
                    (window.location.href = ad?.url ? ad?.url : "")
                  }
                >
                  <img
                    src={`${ad?.ad_url}`}
                    className="w-100 "
                    alt={ad?.name}
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  adsReducer: state.getAdsReducer,
});

export default connect(mapStateToProps, {
  getData,
})(CarouselHome);
