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
              <!-- <p>
                Programming has always seemed to me a difficult job but very interesting.
                I didn't have enough confidence that i will succeed in programming.
              </p> -->
              <p>
                I have always wanted to be in software development.
                But it seemed to me that programming it's difficult.
                It is, but i thought that i can't handle it.
                I began my path into development industry since 3D (gameDev)
                It seemed to me that 3D is more easily to understand then programming.
                During the work in 3D i faced several times with programming.
                For example the game engine "Unreal Engine" give us a possibility
                without knowledge in C++ implement some logic in depending on requireds
                with the help of "blueprints".
                As deeper i sank into 3d as often I faced with programming.
                I've faced with different tools written by enthusiasts or professionals
                for programs like Houdini or Autodesk Maya written in Python language.
                At one point in time 
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
