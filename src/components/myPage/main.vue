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
                I didn't have enough confidence that i will succeed in programming.
              </p>
              <p>
                Меня всегда тянуло в разработку. Но так как мне казалось что программирование
                это сложно, решил начать с чего нибудь по проще, с 3Д.
                По моему мнения 3Д проще понять.
                Во время работы мне приходилось сталкиваться с программированием.
                Например в игровом движке Unreal Engine
                есть возможность без знаний языка C++
                собирать какую то логику различного назначения на blueprints.
                Чем глубже я погружался в 3д, тем чаще я сталкивался
                с различными дополнительными
                инструментами написанными энтузиастами или профессионалами
                для таких программ как autodesk maya или houdini.
                Тем более создание своих инструментов, а не использоание созданных
                до тебя казалось мне чем то магическим.
                И в один момент мне в голову пришла мысль что в настоящее время
                без знаний программирования не обойтись.
                Оставаясь в 3д индустрии или любой другой программной разработке.
                Знание программирования в целом увеличивает понимание всего процесса в целом.
                На основании этого я принял решения пройти обучения языку python.
                Но так как просто изучение языка не имеет смысла, а для отработки своих
                знания нужно какое то прикладное назначение языка
                Мне на глаза попался курс Веб разработки полного цикла на python.
                Этот курс координально изменил мое отношение к программированию.
                Я влюбился в программирование. Я закончил курс.
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
