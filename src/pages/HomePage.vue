
<script lang setup>

import { reactive, ref, watch } from 'vue';
import axios from 'axios';
import { serializeRestaurantsMainList } from '@/serializers/RestaurantMain';
import VerticalRestaurants from '@/components/VerticalRestaurants.vue';
import HorizontalRestaurants from '@/components/HorizontalRestaurants.vue';


const verticalRestaurants = reactive([]);
const isVerticalRestaurantsLoading = ref(false);
const verticalRestaurantsPage = ref(1);

function getVerticalRestaurants() {
  isVerticalRestaurantsLoading.value = true;
  axios.get(
    'https://chocofood.kz/fast-hermes/v1/delivery_area_content/restaurants/',
    {
      params: {
        page: verticalRestaurantsPage.value,
        limit: 18,
        latitude: 43.237606,
        longitude: 76.906672,
      },
    },
  ).then((response) => {
    console.log(response);
    verticalRestaurants.push(...serializeRestaurantsMainList(response.data.result));
    if (response.data.result.length === 18) isVerticalRestaurantsLoading.value = false;
  });
}

getVerticalRestaurants();

watch(
  () => verticalRestaurantsPage.value,
  () => {
    console.log('request requested')
    getVerticalRestaurants();
  }
);

const popularRestaurants = reactive([]);

function fetchPopularRestaurants() {
  axios.get(
    'https://chocofood.kz/fast-hermes/v1/delivery_area_content/popular/',
    {
      params: {
        limit: 18,
        latitude: 43.237606,
        longitude: 76.906672,
      },
    },
  ).then((response) => {
    console.log(response);
    popularRestaurants.push(...serializeRestaurantsMainList(response.data.result));
  });
}

fetchPopularRestaurants();


const newRestaurants = reactive([]);

function fetchNewRestaurants() {
  axios.get(
    'https://chocofood.kz/fast-hermes/v1/delivery_area_content/popular/',
    {
      params: {
        limit: 18,
        latitude: 43.237606,
        longitude: 76.906672,
        sort_by: 'new',
      },
    },
  ).then((response) => {
    console.log(response);
    newRestaurants.push(...serializeRestaurantsMainList(response.data.result));
  });
}

fetchNewRestaurants();

</script>

<template>
  <div class="px-2">
    <HorizontalRestaurants title="Новые заведения" :restaurants="newRestaurants" />
    <HorizontalRestaurants title="Популярные заведения" :restaurants="popularRestaurants" />
    <VerticalRestaurants :restaurants="verticalRestaurants" :is-loading="isVerticalRestaurantsLoading"
      @request-restaurants="verticalRestaurantsPage += 1" />
  </div>
</template>
