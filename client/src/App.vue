<template>
  <div>

    <div class="d-flex" id="wrapper">
      <!-- HEADER: sidebar-->
      <div class="border-end bg-white" id="sidebar-wrapper">
          <div class="sidebar-heading border-bottom bg-light">AnimalHouse</div>
          <div class="list-group list-group-flush">
              <span v-if="isAuth">
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/dashboard">Dashboard</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/profile">Profile</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/leaderboard">Leaderboard</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/mybookings">My bookings</router-link>
              </span>
              <span v-else>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/login">Log in</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/register">Register</router-link>
              </span>
              <span v-if="isAdmin">
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/manage-adoptions">Manage adoptions</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/manage-events">Manage events</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/manage-volunteering">Manage volunteering</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/appointments">Appointments</router-link>
                <router-link class="list-group-item list-group-item-action list-group-item-light p-3" to="/users">Users</router-link>
              </span>
          </div>
      </div>
      <div id="page-content-wrapper">
        <!-- HEADER: navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container-fluid">
                <button class="btn btn-primary" id="sidebarToggle"><img id="userIcon" src="/icons/ic_user.png"></button>
                <!-- <a  href="/"><img id="logoHeader" src="/icons/logo-name.png"></a> -->
                <router-link id="nameHeader" to="/">AnimalHouse</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li class="nav-item"><router-link class="nav-link" to="/adoption">Adoption</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/volunteering">Volunteering</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/events">Events</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/funfacts">Fun facts</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/funnypets">Funny pets</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/topvideoanimal">Top 10 Videos</router-link></li>
                        <li class="nav-item dropdown">
                            <router-link class="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Games</router-link>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <router-link class="dropdown-item" to="/quiz">Quiz</router-link>
                                <router-link class="dropdown-item" to="/hangman">Hangman</router-link>
                                <!-- <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#!">Something else here</a> -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="container-fluid">
          <!-- CONTENT -->
          <router-view/>
          <!-- FOOTER -->
          <footer class="footer">
            <div class="footer__text container">
              <img src="/icons/logo-white.png" id="footerLogo" />
              <p>
                  Our mission (and passion) is to help get homeless pets out of the shelters and into loving homes.
              </p>
              <p>
                  &copy; Copyright 2022 AnimalHouse
              </p>
              <hr class="footer__hr">
            </div>
            <div class="footer__sections container">
                <div class="footer__section">
                    <span class="footer__title">Contact us</span>
                    <div class="footer__contact">animalhouse@mail.com</div>
                    <div class="footer__contact">+123 456 7890</div>
                    <div class="footer__contact">King's Street 30, New York</div>
                </div>
                <div class="footer__section"></div>
                <div class="footer__section">
                    <span class="footer__title">AnimalHouse</span>
                    <router-link to="/" class="footer__link">Home</router-link>
                    <router-link to="/adoption" class="footer__link">Adoption</router-link>
                    <router-link to="/volunteering" class="footer__link">Volunteering</router-link>
                    <router-link to="/events" class="footer__link">Events</router-link>
                </div>
                <div class="footer__section">
                    <span class="footer__title">To have fun</span>
                    <router-link to="/funfacts" class="footer__link">Fun facts</router-link>
                    <router-link to="/funnypets" class="footer__link">Funny pets</router-link>
                    <router-link to="/quiz" class="footer__link">Quiz</router-link>
                    <router-link to="/hangman" class="footer__link">Hangman</router-link>
                </div>
            </div>
          </footer>
        </div> <!-- <div class="container-fluid"> -->
      </div> <!-- <div id="page-content-wrapper"> -->
    </div> <!-- <div class="d-flex" id="wrapper"> -->

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isAuth: null,
        isAdmin: null,
      }
    },
    created() {
      if(localStorage.getItem('isLogged') == true) {
        this.isAuth = true;
        if(localStorage.getItem('isAdmin') != null) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isAuth = false;
      }
    },
    mounted() {
      if(localStorage.getItem('token') != null) {
        this.isAuth = true;
        if(localStorage.getItem('isAdmin') != null) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isAuth = false;
      }
      window.addEventListener('isLogged-localstorage-logout', () => {
          this.isAuth = false;
          this.isAdmin = false;
      });
      window.addEventListener('isLogged-localstorage-login', () => {
          this.isAuth = true;
      });  
      window.addEventListener('isAdmin-localstorage-true', () => {
          this.isAdmin = true;
      }); 
    }
  }
</script>
