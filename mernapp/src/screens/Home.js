import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:5050/api/fooditems", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    response = await response.json();

    // console.log(response[0], response[1]);
    setFoodCat(response[1]);
    setFoodItems(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div
              class="carousel-caption d-none d-md-block"
              style={{ zIndex: "10" }}
            >
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900*700/?burger"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900*700/?tea"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900*700/?noodles"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div>
        {foodCat ? (
          foodCat.map((cat) => {
            return (
              <div className="row mb-3"  style={{backgroundColor:"#E0E1E4"}}>
                <div key={cat._id} className="fs-3 m-3">
                  {cat.CategoryName}
                </div>
                <hr />
                {foodItems ? (
                  foodItems
                    .filter((item) => (item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filterItem) => (
                      <div
                        key={filterItem.id}
                        className="col-12 col-md-6 col-lg-3 fs-3 m-3"
                      >
                        <Card
                          foodItem={filterItem}
                          options={filterItem.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div>Loading</div>
                )}
              </div>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
}
