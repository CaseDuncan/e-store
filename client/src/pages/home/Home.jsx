import React from "react";
import Title from "../../components/title/Title";
import Header from "../../components/header/Header";
import testImage from '../../assets/blue3.jpg'

const Home = () => {
  return (
    <Header>
      <div className="container mt-5">
        <Title />
        <h3 className="display-4">Best Selling Products</h3>
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={testImage} class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src={testImage} class="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </Header>
  );
};

export default Home;
