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
            <b-col cols="8">
                <ul align="start">
                    <li>
                        <h6 class="font-weight-bold"> Seller:</h6>
                        <ul>
                            <li>
                                An input form for client:
                                <ul>
                                    <li>
                                        To create a new client
                                    </li>
                                    <li>
                                        To edit the existing client
                                    </li>
                                </ul>
                            </li>
                            <li>
                                An input form for clinet order - it represents
                                is a draft / calculator, allows to fast calculate
                                the coast of the order. If the client paid more then
                                half of a total coast the ability of edit turns off
                                and one option stayed to send the order to the processing:
                                <ul>
                                    <li>
                                        To create a new client order
                                    </li>
                                    <li>
                                        To edit the existing client order
                                    </li>
                                    <li>
                                        The client order connected to the client
                                    </li>
                                    <li>
                                        The client can make use of a designer for developing
                                        a design his flat or something else.
                                        The form of the client order must contain fields for
                                        the designer name and the designer salary.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                A product form:
                                <ul>
                                    <li>
                                        There is adding the product to client order -
                                        the seller doesn't have a possibility to add new products
                                        into the data base. If the product doesn't exist or input
                                        incorrect the product will be saved but it will be labeld
                                        as incorrect and saved into the special field.
                                    </li>
                                    <li>
                                        Cost - the seller says a value from a price list.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                There is must be an automatic calculation of the cost in the local
                                currency (for this use the fixed rate, it must save rate if the
                                position of product sent to processing).
                            </li>
                        </ul>
                    </li>
                    <li class="mt-2">
                        <h6 class="font-weight-bold">Accountent:</h6>(it uses the same table of
                        client order and the same form of client order as the seller but without
                        possibility to edit):
                        <ul>
                            <li>
                                A form allow to create and connect a payment to the client order
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h6 class="font-weight-bold">Warehouse:</h6>
                        <ul>
                            <li>
                                At the moment there is no some logic. It made just for showing
                                all the products.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h6 class="font-weight-bold">Orders to factories:</h6>
                        <ul>
                            <li>
                                Order form to factories:
                                <ul>
                                    <li>
                                        Create new order;
                                    </li>
                                    <li>
                                        Edit exist order;
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Stock item's form
                                (more expanded than the form which the seller use):
                                <ul>
                                    <li>
                                        Adding the product to the factory order
                                    </li>
                                    <li>
                                        In this implementation the supplier is
                                        checking the product (The supplier can
                                        add new factory, new collection of factory
                                        and new product into DB).
                                        <p>
                                            The product considered correct if all
                                            three fields factory, factory collection
                                            and catalogue number are in data base
                                        </p>
                                        <p>
                                            So if you want to save the correct stock
                                            item you need filled all three fields
                                            (factory, collection and item) and fill
                                            in the field for factory price
                                        </p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                If the factor is more bigger than defining meaning the
                                background becomes green (for the sale to be profitable
                                we need to take into account all expenses) If the
                                factor green all the expenses is account
                            </li>
                            <li>
                                If all the items correct and their factors are green the
                                factory order can be send to the factory
                            </li>
                        </ul>
                    </li>
                </ul>
            </b-col>
    </b-row>
    <b-row>
      <b-col class="font-weight-bold">
        <h5>
          Thank you for your attention!
        </h5>
        <p class="mt-3">
          This is a demo project. It isn't ready for production.
        </p>
        <p>
          Many things aren't done
        </p>
        <p>
          This project has many not best but working solutions.
        </p>
        <p>
          I don't stop my study and the quality of my code will be growing
        </p>
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
