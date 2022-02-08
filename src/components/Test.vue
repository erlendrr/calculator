<template>
	<div></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { key } from '../store/index'

const store = useStore(key)

console.log(store.state.count)
</script>

<style lang="scss" scoped></style>
