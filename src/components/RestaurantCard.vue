<script setup>
import { defineProps } from 'vue';

defineProps({
  restaurant: {
    type: Object,
    default: () => ({}),
  },
  delivery: {
    type: Object,
    default: () => ({}),
  },
  imageHeight: {
    type: String,
    default: 'max-h-[20vh]'
  },
  cardHeight: {
    type: String,
    default: '',
  },

});
</script>


<template>
  <router-link :to="{ name: 'rests', params: { id: `${restaurant.id}`, title: `${restaurant.title}`, deli: `${restaurant.will_be_delivered_by}` } }">

    <a>{{ Rest }}</a>
    <div class="restaurant-container px-2">
      <div class="restaurant overflow-hidden rounded-xl pb-4 mb-4 shadow-md shadow-gray-300" :class="[cardHeight]">
        <div class="image-block">
          <img :src="restaurant.image" :alt="restaurant.title" class="w-full object-cover" :class="[imageHeight]">
        </div>
        <div class="description-block pl-2">
          <div class="title font-bold text-xl my-2">
            <h3 class="truncate">{{ restaurant.title }}</h3>
          </div>
          <div class="additional-info flex items-center">
            <div class="delivery-info flex items-center">
              <div class="delivery-type">
                <img :src="`/images/${restaurant.willBeDeliveredBy}-icon.svg`" :alt="restaurant.willBeDeliveredBy"
                  class="icon">
              </div>
              <div class="delivery-time mx-1">
                {{ delivery.lowLimitMinutes }} - {{ delivery.upperLimitMinutes }} мин
              </div>
            </div>
            <div class="rating flex items-center">
              <img src="/images/rating-icon.svg" alt="rating" class="icon ml-2 mr-1">
              {{ restaurant.rating }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>