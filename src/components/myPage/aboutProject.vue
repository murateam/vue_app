<template>
    <b-container>
        <b-row>
            <b-col>
                <navbar></navbar>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <h4>About Project</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                Here is some information about the project
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col cols="8">
                <p>
                    It's started since imaginary requirements for the future project
                    These requirements I made up what would i have a plan
                </p>
                <p>
                    This application created for multi brand store it is when one store
                    is selling a goods of different manufacturers.
                    The application allow to create client order with set of products of
                    different manufacturers.
                    And it allow to processing orders depending on requires.
                </p>
                <p>
                    For example i took a store of selling furnitures.
                    In the application implemented following features:
                </p>
            </b-col>
        </b-row>
        <b-row align-h="center">
            <b-col md="auto">
                <ul align="start">
                    <li>
                        For a seller:
                        <ul>
                            <li>
                                An input form for client;
                                <ul>
                                    <li>
                                        A possibility for created client
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import navbar from './navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
