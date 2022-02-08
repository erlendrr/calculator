<template>
	<div></div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { key } from '../store/index'

const store = useStore(key)

store.state.count // typed as number
</script>

<style lang="scss" scoped></style>
