<template>
  <div>
    <b-container>
      <b-row><b-col>
      <navbar>
      </navbar>
      </b-col></b-row>
      <b-container>
          <b-row class="mt-3">
            <b-col>
              <h5>
                <p>
                  Welcome to my app!
                </p>
              </h5>
              <p>
                My name is Andrei and i'm new in the web development.
              </p>
              <p>
                Programming has always seemed to me a difficult job but very interesting.
                I didn't have enough confidence that i will succeed in it
              </p>
              <p>
                This web app is a result of my learning on a Full Stack Web Developer cource.
              </p>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col cols="8">
              <!-- <div class="embed-responsive embed-responsive-16by9">
                <b-embed
                  class="embed-responsive-item"
                  type="iframe"
                  aspect="16by9"
                  src="http://127.0.0.1:5000/media/bm_01.mp4"
                ></b-embed>
              </div> -->
              <b-embed type="video" aspect="4by3" controls>
                <source src="http://127.0.0.1:5000/media/bm_01.mp4" type="video/mp4">
              </b-embed>
            </b-col>
          </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import navbar from './navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
