<template>
  <div class="dashboard-container">
    <div class="breadcrumb">
      <font-awesome-icon icon="chevron-left" color="#123D8B" class="icon-back" />
      <router-link to="/dashboard" title="DashBoard" class="title-page">DashBoard</router-link>
    </div>
    <div class="box-container">
      <div class="box-task">
        <div class="box-title">Task</div>
        <div class="task-list">
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
        </div>
      </div>

      <div class="box-log">
        <div class="box-title">Task</div>
        <div class="log-list">
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
          <div class="item">
            <span>Khách sạn 1</span>
            <span>Connect to server failed</span>
            <span class="date">26.02.2019</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "email", "roles"])
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 17px 30px;

    .title-page {
      margin-left: 16px;
      font-size: 26px;
      color: #123d8b;
      font-weight: bold;
      line-height: 35px;
      display: block;
    }

    .breadcrumb {
      display: flex;
      justify-content: flex-start;
    }

    .icon-back {
      margin-top: 10px;
    }

    .box-container {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
    }

    .box-task {
      background: #ffffff;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      padding: 19px 15px;
      width: 505px;

      .box-title {
        color: #212121;
        font-size: 18px;
        font-weight: bold;
      }

      .task-list {
        margin-top: 18px;
      }

      .item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: 1px solid #e2e6ee;

        .date {
          color: #123d8b;
          font-weight: bold;
        }
      }
    }

    .box-log {
      background: #ffffff;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      padding: 19px 15px;
      width: 505px;
      border-top: 4px solid #123D8B;

      .box-title {
        color: #212121;
        font-size: 18px;
        font-weight: bold;
      }

      .log-list {
        margin-top: 18px;
      }

      .item {
        display: flex;
        justify-content: space-between;
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: 1px solid #e2e6ee;

        .date {
          color: #123d8b;
          font-weight: bold;
        }
      }
    }

  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
