import React from "react";
import axios from "axios";

function CategoriesList() {
  const [postData, setPostData] = React.useState([]);
  console.info(postData.categories);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}//api/category`
      )
      .then((response) => {
        setPostData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="col-12 d-flex flex-row">
      {postData?.categories.map((data) => {
        return (
          <div className="col-3 d-flex flex-column">
            <img src="" height="100px" width="100px" alt="" />
            <h6 className="">{data}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesList;
