<template>
	<div class="headerallapp">
		<div class="headerall displayflex boxsizing">
			<img src="@/assets/img/logo.png" alt="">
			<div class="displayflex">
				<div class="headleft">
					<span>后台管理系统</span>
				</div>
				<div class="headright">
					<div class="btn-fullscreen" @click="handleFullScreen">
						<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
							<i class="el-icon-rank"></i>
						</el-tooltip>
					</div>
					<div>
						<img src="@/assets/img/logo.png" alt="">
						<span>admin</span>
						<ul>
							<li>
								<img src="@/assets/img/header/back.png" alt="">
								<span>退出登录</span>
							</li>
						</ul>
						<img src="@/assets/img/header/arrow.png" alt="">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "headerAll",
		data() {
			return {
				fullscreen: false,
			}
		},
		
		methods: {
			// 全屏事件
			handleFullScreen() {
				let element = document.documentElement;
				if (this.fullscreen) {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else {
					if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.webkitRequestFullScreen) {
						element.webkitRequestFullScreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.msRequestFullscreen) {
						// IE11
						element.msRequestFullscreen();
					}
				}
				this.fullscreen = !this.fullscreen;
			}
		}
	}
</script>
<style scoped>
	@import "./css/headerall.css";
</style>