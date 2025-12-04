<template>
  <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8667 8.88889C16.252 8.88889 16.626 8.93333 17 8.98889V3.63333L8.5 0L0 3.63333V9.08889C0 14.1333 3.62667 18.8556 8.5 20C9.12333 19.8556 9.724 19.6444 10.3133 19.3889C9.53133 18.3 9.06667 16.9778 9.06667 15.5556C9.06667 11.8778 12.1153 8.88889 15.8667 8.88889Z" :fill="color"/>
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
