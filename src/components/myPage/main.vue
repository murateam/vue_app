<template>
  <div>
    <b-container>
      <b-row><b-col>
      <navbar>
      </navbar>
      </b-col></b-row>
          <b-row align-h="center" class="mt-3">
            <b-col cols="8">
              <h4>
                <p class="font-weight-bold">
                  Hi there and welcome to my app!
                </p>
              </h4>
              <h5>
                <p>
                  My name is Andrei and i'm new in the web development.
                </p>
              </h5>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col cols="8">
              <b-embed type="video" controls>
                <source src="http://127.0.0.1:5000/media/bm_01.mp4" type="video/mp4">
              </b-embed>
            </b-col>
          </b-row>
          <b-row class="mt-3" align-h="center">
            <b-col cols="8">
              <p>
                I've always wanted to be in software development.
                But it seemed to me that programming it's difficult.
              </p>
              <p>
                It is, but i thought that i can't handle it.
              </p>
              <p>
                I began my path into development industry since 3D (gameDev)
                It seemed to me that 3D is more easily to understand then programming.
                During the work in 3D i faced several times with programming.
                For example the game engine "Unreal Engine" give us a possibility
                without knowledge in C++ implement some logic in depending on requireds
                with the help of "blueprints"...
                As deeper i sank into 3d as often I faced with programming.
                I've met with different tools written by enthusiasts or professionals
                for programs like Houdini or Autodesk Maya.
                At one point in time the idea struck me what i must know the programming.
                I can't develop further without these knowledges. If I stay here in 3d
                or somewhere else.
              </p>
              <p>
                Therefore i decided that i must to learn some programming language.
                But the simple learning of language doesn't make sense. I need a practiacal
                application for training in programming.
                I found by chance a course of
                <a href="https://skillfactory.ru/python-for-web-developers?utm_campaign=direct">
                "full stack web developer"</a> in python.
                This course fundamentally changed my attitude to programming.
                I've fallen in love with programming.
                Before this moment i was should to learn tools created someone else.
                And I needed to know the principles and requirements for use these tools.
                It's not a problem. But now when written instructions and sequences are
                becoming to the working mechanism, these is Awesome!
              </p>
            </b-col>
          </b-row>
          <b-row align-h="start">
            <b-col cols="8">
              <h5>
                <p class="">
                  At this course i learned following tools:
                </p>
              </h5>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <!-- <b-col cols="1"></b-col> -->
            <b-col md="auto">
              <ul align="start">
                <li>Python:
                  <ul class="margin: 5">
                    <li>Basic of language</li>
                    <li>Collections, cycles and logic</li>
                    <li>Functions and modules</li>
                    <li>Errors and exceptions. Automation testing</li>
                    <li>OOP in Python</li>
                    <li>Modules and packages</li>
                  </ul>
                </li>
                <li>html/css/js</li>
                <li>Bottle</li>
                <li>SQL</li>
                <li>Clouds (Heroku, Git), decorators and context</li>
                <li>Django (accounts, registration, tags and advanced features)</li>
                <li>Work with API (Telegram, Trello, post in Slack vai Python)</li>
                <li>Django REST framework (DRF)</li>
                <li>Monitoring and optimization (Sentry)</li>
                <li>Signals, caching, memcached</li>
                <li>Testing (unittest, pytest)</li>
                <li>Linux (virtual machine in cloud)</li>
                <li>Servers (nginx, postgres, gunicorn)</li>
                <li>Queues and asynchrony (Redis, Redis + Python, queues RQ)</li>
                <li>Celery and Docker (queues Celery, work with Docker, Docker compose)</li>
                <li>Vue js (SPA)</li>
              </ul>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p>Of course my skills don't have an excellent level and they still require further
                improvement.
                And I know that the learning process in programming should never stop.
              </p>
            </b-col>
          </b-row>
          <b-row align-h="center" class="mt-3 mb-5">
            <b-col md="auto" cols="8">
                I'm glad to present you this web app as a result of my learning
                on a Full Stack Web Developer course.
            </b-col>
          </b-row>
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
