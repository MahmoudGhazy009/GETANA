import React, { Component } from "react";
import "./css/home-style.css";
import { Link } from "react-router-dom";

import logo from "./images/about-1.jpg";
import about1 from "./images/about-1.jpg";
import about2 from "./images/about-2.jpg";
import about3 from "./images/about-3.jpg";
import FunFacts from "./component/funFacts";
class About extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <section
          id="Home"
          className="cover2"
          data-paroller-factor="0.3"
          style={{ backgroundPosition: "center 0", marginTop: 75 }}
        >
          <div className="coverwrap">
            <div className="coverinfo">
              <div className="covercontent">
                <div>
                  <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                    <h1
                      className="covertitle text-center"
                      style={{ paddingLeft: 160 }}
                    >
                      HASHTAGS <b>ARE</b> OUR <b>THING</b>
                    </h1>
                    <p
                      className="coversubtitle text-center"
                      style={{ paddingLeft: 160 }}
                    >
                      Simple, Intelligent, Analytics for Social Media Campaigns
                      & Events
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="TEAMM" className="Ourteam">
          <div className="x">
            <h1
              className="covertitle"
              style={{ textAlign: "center", color: "black", fontSize: 40 }}
            >
              MEET THE TEAM
            </h1>
            <p className="spantitlee" style={{ color: "black" }}>
              WE ARE HERE TO HELP YOU WITH ANYTHING YOU NEED
            </p>
            <div className="gg" />
          </div>
        </div>

        <div className="why">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="featurez">
                  <div className="d">
                    <h2>
                      Amr Khaled
                      <div className="gg" style={{ marginTop: 20 }} />
                    </h2>
                  </div>
                  <img src={logo} alt="Amr Khaled" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="featurez">
                  <div className="d">
                    <h2>
                      Mahmoud Ghazy
                      <div className="gg" style={{ marginTop: 20 }} />
                    </h2>
                  </div>
                  <img src={logo} alt="Mahmoud Ghazy" />
                </div>
              </div>

              <div className="col-md-4">
                <div className="featurez">
                  <div className="d">
                    <h2>
                      Khalid Amer
                      <div className="gg" style={{ marginTop: 20 }} />
                    </h2>
                  </div>
                  <img src={logo} alt="Khalid Amer" />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="featurez">
                <div className="d">
                  <h2>
                    Zeyad Elsawy
                    <div className="gg" style={{ marginTop: 20 }} />
                  </h2>
                </div>
                <img src={logo} alt="Zeyad Elsawy" />
              </div>
            </div>

            <div className="col-md-4">
              <div className="featurez">
                <div className="d">
                  <h2>
                    Khaled Seif
                    <div className="gg" style={{ marginTop: 20 }} />
                  </h2>
                </div>
                <img src={logo} alt="Khaled Seif" />
              </div>
            </div>
          </div>
        </div>

        <section id="Whoweare" className="third">
          <h1
            className="covertitle"
            style={{ textAlign: "center", color: "black", fontSize: 40 }}
          >
            WHO WE ARE
          </h1>
          <p className="spantitlee">SOME THINGS YOU SHOULD KNOW ABOUT US</p>
          <div className="gg" />

          <section className="features" id="feat">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide carousel-fade"
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="0"
                        className="active rounded-circle"
                      />
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="1"
                        className="active rounded-circle"
                      />
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to="2"
                        className="active rounded-circle"
                      />
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          className="d-block w-100"
                          src={about1}
                          alt="First slide"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block w-100"
                          src={about2}
                          alt="Second slide"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block w-100"
                          src={about3}
                          alt="Third slide"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="feature">
                    <p>
                      Gunung Rinjani adalah nama sebuah gunung yang berlokasi di
                      Pulau Lombok, Nusa Tenggara Barat. Gunung ini merupakan
                      gunung favorit bagi pendaki Indonesia karena keindahan
                      pemandangannya. Gunung ini merupakan bagian dari Taman
                      Nasional Gunung Rinjani yang memiliki luas sekitar 41.330
                      ha dan ini akan segera diusulkan penambahannya sehingga
                      menjadi 76.000 ha. Secara administratif gunung ini berada
                      dalam wilayah tiga kabupaten: Lombok Timur, Lombok Tengah
                      dan Lombok Barat.
                    </p>
                    <div>
                      <Link to="/about" className="btn btn-light btn-lg">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <FunFacts />

        <div id="ourgallery" className="OUR GALLERY">
          <div className="x">
            <h1
              className="covertitle"
              style={{ textAlign: "center", color: "black", fontSize: 40 }}
            >
              OUR GALLERY
            </h1>
            <p className="spantitlee" style={{ color: "black" }}>
              WE'RE ALL WORKING TOGETHER, THAT'S THE SECRET
            </p>
            <div className="gg" />
          </div>
          <div className="text-center bb">
            <button
              type="button"
              className=" btn btn-danger  btnbasecolor mt-1 "
            >
              ALL
            </button>
            <button type="button" className=" btn btn-danger btnbasecolor mt-1">
              CULTURE
            </button>
            <button type="button" className=" btn btn-danger btnbasecolor mt-1">
              TEAM
            </button>
            <button type="button" className=" btn btn-danger btnbasecolor mt-1">
              WORK SPACE
            </button>
          </div>

          <div className="why">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>

                    <img src={about1} alt="" />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="featurez">
                    <div className="d">
                      <h2>IMAGE CAPTION 1</h2>
                    </div>
                    <img src={about1} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;
