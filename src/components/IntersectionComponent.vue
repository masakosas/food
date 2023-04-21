<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['intersected']);

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

const callback = (entries) => {
  entries.forEach((entry) => {
    console.log(entry, );
    if(entry.isIntersecting && !props.isLoading) {
      emit('intersected');
    }
  });
};

const observer = new IntersectionObserver(callback, options);

onMounted(() => {
  let target = document.querySelector(".intersection-point");
  console.log(target);
  observer.observe(target);
})
</script>

<template>
  <div class="intersection-point h-[1px] w-full mb-4"></div>
</template>