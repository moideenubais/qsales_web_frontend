import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";

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
  console.log("yoyo", adsReducer?.data?.ads);
  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      {showBannerAds && (
        <div className="col-12 col-md-9 col-lg-9 mx-auto">
          <span
            style={{
              position: "absolute",
              right: "15%",
              zIndex: 100,
            }}
            onClick={() => setShowBannerAds(false)}
          >
            <img src="./assets/images/close-svg.svg" height={20} width={20} />
          </span>
          <Carousel
            ref={carouselRef}
            itemsToShow={1}
            enableAutoPlay={true}
            transitionMs={1000}
            style={{ position: "relative" }}
            onNextEnd={({ index }) => {
              clearTimeout(resetTimeout);
              if (index + 1 === totalPages) {
                resetTimeout = setTimeout(() => {
                  carouselRef.current.goTo(0);
                }, 1000);
              }
            }}
          >
            {adsReducer?.data?.ads?.map((ad, index) => (
              <img
                src={`${imageBaseUrl}${ad?.ad_url}`}
                className="w-100"
                style={{ height: "150px" }}
                alt={ad?.name}
              />
            ))}
          </Carousel>
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
