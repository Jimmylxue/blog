<script setup>
const props = defineProps({
	link: String,
})
</script>

<template>
	<div class="demo">
		<iframe
			:src="props.link"
			scrolling="no"
			border="0"
			frameborder="no"
			framespacing="0"
			allowfullscreen="true"
		>
		</iframe>
	</div>
</template>
<style>
.demo > iframe {
	width: 100%;
	height: 450px;
}
</style>
