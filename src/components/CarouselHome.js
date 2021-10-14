import React from 'react'
import Carousel from 'react-elastic-carousel'

function CarouselHome() {

    const [index, setIndex] = React.useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    return (
        <React.Fragment>
            <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="col-12 col-md-9 col-lg-9 mx-auto">
            <Carousel itemsToShow={1} enableAutoPlay={true}>
                <img src="https://k.nooncdn.com/cms/pages/20210715/1d4fccf1fc8ac14e073a6d6bc29c395a/en_hero-01.png" className="w-100" />
                <img src="https://k.nooncdn.com/cms/pages/20210715/e3470bc5c6a8823fa7c9c0f91c67e6d8/en_noon-slider-01.gif" className="w-100"/>
                <img src="https://k.nooncdn.com/cms/pages/20210715/1d4fccf1fc8ac14e073a6d6bc29c395a/en_hero-01.png" className="w-100"/>
            </Carousel>
</div>
</div>

        </React.Fragment>
    )
    
}
export default CarouselHome
