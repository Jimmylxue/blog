<script setup>
import { ref } from 'vue'
const recentList = ref([])
const fetchCurrent = async () => {
	const res = await fetch('https://api.github.com/users/jimmylxue/starred')
	const json = await res.json()
	console.log(json)
	recentList.value = json
}

fetchCurrent()
</script>

<template>
	<p class="component_title">Recent developments 🔥</p>
	<div class="member">
		<div class="memberInfo">
			<img
				class="avatar"
				src="https://avatars.githubusercontent.com/u/65758455?v=4"
				alt=""
				srcset=""
			/>
			<p class="name">jimmyxuexue</p>
			<div class="msg">
				<div class="msg_count">25</div>
				followers
				<div class="count">·</div>
				<div class="msg_count">18</div>
				following
			</div>
		</div>
		<div class="current">
			<div class="item" v-for="(item, index) in recentList" :key="index">
				<a class="title" :href="item.html_url">{{ item.full_name }}</a>
				<p class="content">
					{{ item.description }}
				</p>
				<div>
					<div>type: {{ item.language }}</div>
					<div>star: {{ item.stargazers_count }}</div>
					<div>fork: {{ item.forks_count }}</div>
					<div>{{ item.pushed_at }}</div>
				</div>
				<hr />
			</div>
		</div>
	</div>
</template>

<style scoped>
.component_title {
	text-align: center;
	color: #42b883;
	font-weight: bold;
	font-size: 36px;
	margin-top: 30px;
}
.member {
	position: relative;
	margin: 0 auto;
	max-width: 1280px;
	display: flex;
	margin-top: 30px;
}

.memberInfo {
	flex-shrink: 0;
	display: none;
}

.memberInfo > .name {
	font-size: 24px;
	line-height: 1.25;
	font-weight: bold;
	margin: 8px 0;
}

.msg {
	display: flex;
	color: #57606a;
}

.msg > .msg_count {
	font-weight: bold;
	margin-right: 5px;
}

.count {
	margin: 0 5px;
}

.avatar {
	width: 250px;
	height: 250px;
	border-radius: 50%;
	overflow: hidden;
}

.current {
	flex-grow: 1;
	margin-left: 15px;
}

.current > .item > div {
	display: flex;
}

.current > .item > .title {
	color: #42b883;
	font-size: 18px;
	font-weight: bold;
}

.current > .item > .content {
	margin-bottom: 10px;
	color: #57606a;
	margin-top: 10px;
}

.current > .item > div > div {
	margin-right: 8px;
	font-size: 14px;
	color: #57606a;
}

/* 宽度大于 640 采用的样式 */
@media (min-width: 640px) {
	.member {
		padding: 0 48px;
	}

	.member > .memberInfo {
		display: block;
	}
}

/* 宽度大于 960 采用的样式 */
@media (min-width: 960px) {
	.member {
		padding: 0 64px;
	}

	.member > .memberInfo {
		display: block;
	}
}
</style>
