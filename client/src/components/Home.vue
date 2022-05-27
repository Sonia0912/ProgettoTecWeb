<template>
    <div>
        <!-- CAROUSEL -->
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">

          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../../public/images/hero/hero4.jpg" class="d-block w-100">
              <div class="carousel-caption d-md-block">
                <h5>AnimalHouse is more than just a shelter...</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img src="../../public/images/hero/hero1.jpg" class="d-block w-100">
              <div class="carousel-caption d-md-block">
                <h5>Our dream is to help all dogs and cats in need</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img src="../../public/images/hero/hero3.jpg" class="d-block w-100">
              <div class="carousel-caption d-md-block">
                <h5>Because we believe every pet deserves not just food and shelter...</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img src="../../public/images/hero/hero2.jpg" class="d-block w-100">
              <div class="carousel-caption d-md-block">
                <h5>...but a home</h5>
              </div>
            </div>
          </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>

        </div>

        <!-- ABOUT US -->
        <div class="container aboutContainer blueBackground">
          <div class="row">
              <div class="col-md-12">
                  <div id="aboutDiv">
                      <div class="title">About us</div>
                      <div class="paragraph">
                          <div class="subParagraph">AnimalHouse's goal is to make shelters the first place potential adopters turn when looking to get a new pet, ensuring that all healthy and treatable pets find loving homes. We do this by breaking down misconceptions surrounding shelter pets and celebrating the unique bond between every shelter pet and parent.</div>
                          <div class="subParagraph">
                            At the moment we have 3 different shelters in New York:
                            <ul>
                              <li>King's Street, 30 - NY</li>
                              <li>Park Avenue, 29 - NY</li>
                              <li>Bay Avenue, 31 - NY</li>
                            </ul>
                          </div>
                          <div class="subParagraph">
                            You only need to create an account to benefit from the services we offer:
                            <ul>
                              <li>Adoption</li>
                              <li>Volunteering</li>
                              <li>Events</li>
                            </ul>
                              Come meet our pets!
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "home",
  }
</script>