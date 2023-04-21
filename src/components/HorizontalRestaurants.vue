<script setup>
import {
  defineProps,
  ref,
} from 'vue';

import RestaurantCard from './RestaurantCard.vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  restaurants: {
    type: Array,
    default: () => [],
  },
});

const windowWidth = ref(35);

function getWidth() {
  const width = window.innerWidth;
  if(width < 640) {
    windowWidth.value = 45;
  } else {
    windowWidth.value = 35;
  }
}

getWidth();

window.addEventListener('resize', (e) => {
  console.log(e.target.innerWidth);
  getWidth();
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">
      {{ title }}
    </h2>
    <div class="hor-container w-full overflow-hidden">
      <div class="scroll-container w-full overflow-auto">
        <div
          class="inline-grid"
          :class="[`grid-rows-1`]"
          :style="{
            'grid-template-columns': `repeat(auto-fill, minmax(${windowWidth}vw, 1fr))`,
            width: (restaurants.length || 1) * windowWidth + 'vw',
          }"
        >
          <RestaurantCard
            v-for="(restaurant,idx) in restaurants"
            :key="idx"
            :restaurant="restaurant.restaurant"
            :delivery="restaurant.delivery"
            image-height="h-[10vh] lg:h-[20vh] md:h-[15vh]"
            class="col-span-[4] h-full row-span-1"
            :class="[`max-w-[${windowWidth}vw]`]"
          />
        </div>
      </div>
    </div>
  </div>
</template>