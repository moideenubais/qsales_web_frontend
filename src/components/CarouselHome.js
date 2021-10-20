import React, { useEffect } from "react";
import Carousel from "react-elastic-carousel";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";

function CarouselHome(props) {
  const { getData: propsGetData, adsReducer } = props;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;

  useEffect(() => {
    propsGetData(ActionTypes.GET_ADS, "/ad");
  }, [propsGetData]);

  return (
    <div className="col-lg-12 col-md-12 col-sm-12">
      <div className="col-12 col-md-9 col-lg-9 mx-auto">
        <Carousel itemsToShow={1} enableAutoPlay={true}>
          {adsReducer?.data?.ads
            ?.filter((ad) => ad.ad_type === "top")[0]
            .ad_url?.map((ad) => (
              <img src={`${imageBaseUrl}${ad}`} className="w-100" alt={ad} />
            ))}
        </Carousel>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  adsReducer: state.getAdsReducer,
});

export default connect(mapStateToProps, {
  getData,
})(CarouselHome);
