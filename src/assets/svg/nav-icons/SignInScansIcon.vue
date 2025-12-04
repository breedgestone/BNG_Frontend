<template>
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12V17.007C18.9997 17.2703 18.895 17.5227 18.7089 17.7089C18.5227 17.895 18.2703 17.9997 18.007 18H1.993C1.72964 18 1.47707 17.8954 1.29084 17.7092C1.10462 17.5229 1 17.2704 1 17.007V12H19ZM0 8H20V10H0V8ZM19 6H1V0.993C1 0.445 1.445 0 1.993 0H18.007C18.555 0 19 0.445 19 0.993V6Z" :fill="color"/>
  </svg>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: '#3E3B3B'
  }
})
</script>
