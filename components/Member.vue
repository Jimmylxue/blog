<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import fetch from 'node-fetch'
const recentList = ref([])
const user = ref({})
const fetchCurrent = async () => {
	const res = await axios.get('https://api.github.com/users/jimmylxue/starred')
	recentList.value = res.data
}

const fetchUser = async () => {
	const res = await axios.get('https://api.github.com/users/jimmylxue')
	user.value = res.data
}

fetchCurrent()
fetchUser()
</script>

<template>
	<div class="msg_img">
		<img
			src="https://github-readme-stats.vercel.app/api?username=Jimmylxue&show_icons=true&hide=&count_private=true&title_color=3382ed&text_color=ffffff&icon_color=3382ed&bg_color=1c1917&hide_border=true&show_icons=true"
			alt="bestony's GitHub stats"
		/>
		<img
			src="https://github-readme-streak-stats.herokuapp.com/?user=Jimmylxue&stroke=ffffff&background=1c1917&ring=3382ed&fire=3382ed&currStreakNum=ffffff&currStreakLabel=3382ed&sideNums=ffffff&sideLabels=ffffff&dates=ffffff&hide_border=true"
		/>
	</div>
	<p class="component_title">Recent developments 🔥</p>
	<div class="member">
		<div class="memberInfo">
			<img class="avatar" :src="user.avatar_url" alt="" srcset="" />
			<p class="name">{{ user.name }}</p>
			<div class="msg">
				<div class="msg_count">{{ user.followers }}</div>
				followers
				<div class="count">·</div>
				<div class="msg_count">{{ user.following }}</div>
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
.msg_img {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	flex-direction: column;
}
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

	.msg_img {
		flex-direction: column;
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

	.msg_img {
		flex-direction: row;
	}
}
</style>
