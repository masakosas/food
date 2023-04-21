<script setup>
import { defineProps, defineEmits } from 'vue';
import RestaurantCard from './RestaurantCard.vue';
import IntersectionComponent from './IntersectionComponent.vue';

defineProps({
  restaurants: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['request-restaurants']);
</script>

<template>
  <div class="restaurants">
    <h2 class="text-2xl font-bold mb-4">
      Все заведения
    </h2>
    <RestaurantCard
      v-for="(restaurant, idx) in restaurants"
      :key="idx"
      :restaurant="restaurant.restaurant"
      :delivery="restaurant.delivery"
    />
    <IntersectionComponent
      v-if="restaurants.length"
      :is-loading="isLoading"
      @intersected="$emit('request-restaurants')"
    />
  </div>
</template>
