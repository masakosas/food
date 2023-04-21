
    <script>
    import axios from "axios";
    import "@/style/main.css";
    import Modal from "@/components/Modal.vue"; 

    export default {
      data() {
        return {
          isModalOpen: false,
          isLoading: true,
          restaurants: [],
          deliveries: [],
          foodTypes: [],
          titles: '',
          selling_text: '',
          price: '',
          selectedFood: [],
          modifications: '',
          modification_choices: '',
          selectedFood: null
        }
      },
      components: {
        Modal,
      },

      created() {
        this.getRestaurants();
         const id = this.$route.params.id;
        axios.get(`https://chocofood.kz/extended_restaurants/${id}/`)
          .then(response => {
            this.foodTypes = response.data.food_types;
          })
          .catch(error => {
            console.log(error);
          });
      }, 

      methods: { 
        async getRestaurants() {
          const { id } = this.$route.params;
          const response = await axios.get(
            `https://chocofood.kz/fast-hermes/v1/delivery_area_content/restaurants/?offset=0&limit=1000&longitude=76.907176&latitude=43.237849`
          );
          const restaurantData = response.data.result.find(
            (data) => data.restaurant.id === parseInt(id)
          );
          const deliveryData = restaurantData.delivery;
          const restaurant = {
            id: restaurantData.restaurant.id,
            title: restaurantData.restaurant.title,
            rating: ((100 / restaurantData.restaurant.rating) || 0).toFixed(1),
            image: restaurantData.restaurant.image,
            will_be_delivered_by: (restaurantData.restaurant.will_be_delivered_by || '').toLowerCase()
          };
          const delivery = {
            lowLimitMinutes: deliveryData.low_limit_minutes,
            upperLimitMinutes: deliveryData.upper_limit_minutes,
            maxCost: deliveryData.delivery_max_cost,
            minCost: deliveryData.delivery_min_cost,
            description: deliveryData.description,
          };
          this.restaurants = [restaurant];
          this.isLoading = false;
          this.deliveries = [delivery];
        },
        showModal(food) {
          this.modalFoodTitle = food.title;
          this.modalFoodDescription = food.description;
          this.modalFoodPrice = food.price;
          this.modalFoodLogo = food.logo;
          this.isModalOpen = true;
        },
        openModal(food) {
          this.selectedFood = food;
          this.isModalOpen = true;
          document.body.classList.add('modal-open');
        },
        closeModal() {
          this.selectedFood = null;
          this.isModalOpen = false;
          document.body.classList.remove('modal-open');
        } 
      },
      async mounted() {
        this.getRestaurants();
        try {
          const id = this.$route.params.id;
          const response = await axios.get(`https://chocofood.kz/extended_restaurants/${id}/`);
          const foodTypes = response.data.food_types.map((foodType) => {
            const foods = foodType.foods.map((food) => {
              return {
                title: food.title,
                selling_text: food.selling_text,
                price: food.price,
                logo: food.logo
              }; 
            });
            return {
              title: foodType.title,
              logo: foodType.logo,
              foods: foods,
            };
          });
          this.foodTypes = foodTypes;
          this.titles = foodTypes[0].foods[0].title;
          this.selling_text = foodTypes[0].foods[0].selling_text;
          this.price = foodTypes[0].foods[0].price;
          this.restaurants = [{
            id: response.data.id,
            title: response.data.name,
            rating: ((100 / response.data.rating) || 0).toFixed(1),
            image: response.data.logo_url,
            will_be_delivered_by: (response.data.delivery_types[0] || '').toLowerCase()
          }];
          this.deliveries = [{
            lowLimitMinutes: response.data.delivery_time_min,
            upperLimitMinutes: response.data.delivery_time_max,
            maxCost: response.data.delivery_price,
            description: response.data.delivery_description,
          }];
        } catch (error) {
          console.log(error);
        }
      }
    };
    </script>

  <template>
    <div>

      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div v-for="restaurant in restaurants" :key="restaurant.id">
          <a href="/home">
            <img class='find' src="https://www.pngall.com/wp-content/uploads/8/Search-PNG-File.png">
            <img class='heart' src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png">
            <div class="imgbck">
              <img class="arrow" src="/images/backarrow.svg" alt="">
            </div>
          </a>
          <img :src="restaurant.image" class="mainimg" :alt="restaurant.title">
          <div v-for="(delivery, index) in deliveries" :key="delivery.id">

            <div class="resttitle">{{ restaurant.title }}</div>
            <div class="container">
              <div class="del">
                <img class="bag" src="https://cdn-icons-png.flaticon.com/512/67/67432.png" alt="">
                <h2 class="delitext">{{ delivery.minCost }} ₸</h2>
              </div>
              <div class="del">
                <img :src="`/images/${restaurant.will_be_delivered_by}-icon.svg`" class="delitype" alt="">
                <h2 class="timeofd">{{ delivery.lowLimitMinutes }} - {{ delivery.upperLimitMinutes }} мин</h2>
              </div>
              <div class="del">
                <div class="rate"><img class="rateimg" src="/images/rating-icon.cb50369.svg" alt=""> {{ restaurant.rating }}
                </div>
              </div>
              <div class="del">
                <img class='info' src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png" alt="">
              </div>
            </div>
          </div>
          <hr class="hr">

     <div v-for="(foodType, index) in foodTypes" :key="index">
      <div v-for="food in foodType.foods" :key="food.id"></div>
          <div>
            <div class="food-types">



              <div class="products-container">
               
                  
                    <h2 class="maintxt">{{ foodType.title }}</h2>
                    <div>
                      <div class="modal" v-if="isModalOpen">
                        <div class="modal-content">
                          <div class="modalimage">
                            <img
                              :src="selectedFood.logo ? selectedFood.logo : 'https://chocofood.kz/_nuxt/img/default_item.a3e53c0.svg'"
                              :alt="selectedFood.title" class="modallogo" />
                          </div>
                          <div class="modalsection">
                            <h3 class="modaltitle">{{ selectedFood.title }}</h3>
                            <p class="modaldescription">{{ selectedFood.selling_text }}</p>
                          </div>

                          <div class="modifybox" v-for="modification in selectedFood.modifications" :key="modification.id">
                            <div class="modifytitle" v-if="modification.title">{{ modification.title }}</div>
                            <div class='choicecontainer'
                              v-if="modification.modification_choices && modification.modification_choices.length">
                              <div class="choicebox" v-for="(choice, index) in modification.modification_choices"
                                :key="choice.id">
                                <input type="radio" :name="modification.id" :id="'choice_' + choice.id"
                                  class="choice-radio">
                                <label :for="'choice_' + choice.id" class="choicecontent">
                                  <span class="choice-title" v-if="choice.title">{{ choice.title }}</span>
                                  <span class="choice-price" v-if="choice.price !== null && choice.price !== undefined">(+
                                    {{ choice.price || choice.price === 0 ? choice.price : '0' }} ₸)</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="pricecontainer">
                          <button class="pricebox">
                            <h1 class="dashtext">В корзину</h1>
                            <h1 class="modalfoodprice">{{ selectedFood.price }} ₸</h1>

                          </button>
                        </div> 
                         <button class="modal-close" @click="closeModal">
                          <div class='cancelbox'>
                            <img class="cancelimg"
                              src="https://static.vecteezy.com/system/resources/previews/009/344/496/non_2x/x-transparent-free-png.png"
                              alt="">
                          </div>
                        </button>
                      </div>
                   

                    

                        
                    <div class="product" v-for="(food, index) in foodType.foods" :key="index" @click="openModal(food)"> 
                      <div class="product-image">
                        <img :src="food.logo ? food.logo : 'https://chocofood.kz/_nuxt/img/default_item.a3e53c0.svg'"
                          :alt="food.title" class="foodlogo" />
                        <div class='dashcontainer'>
                          <div class="dash">
                            <img class='plus' src="/images/pluss.svg" alt="">
                          </div>
                          <hr>
                        </div>
                      </div>

                      <div class="product-description">
                        <h3 class="foodtitle">{{ food.title }} </h3>
                        <p class="description">{{ food.selling_text }}</p>
                        <p class="foodprice">{{ food.price }} ₸</p>

                      </div>


                    </div>

                  </div>



                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
     
  </template>

