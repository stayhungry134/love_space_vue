<template>
  <div class="timing">
    <div class="container-fluid row justify-content-around">
      <div class="col-lg-5 time-down">
        <div class="time-title text-center">
          <h2 class="time-header">We Met Each Other</h2>
        </div>
        <div class="timing-container met-time">
          <div v-for="(value, type) in time_data"
               :key="type"
               class="container-segment"
               :class="type">
            <div class="segment-title">{{ type }}</div>
              <div class="segment">
                <div class="flip-card" v-for="(num, digit) in value"
                     :key="digit">
                  <div class="top">{{ num[0] }}</div>
                  <div class="bottom">{{ num[1] }}</div>
                  <div class="top-flip"
                       @animationstart="top_start($event, type, digit, num[6])"
                       @animationend="top_end($event, type, digit)"
                       v-show="num[2]">{{ num[4] }}</div>
                  <div class="bottom-flip" @animationend="bottom_end($event, type, digit, num[6])" v-show="num[3]">{{ num[5] }}</div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "TimeOfMeet",

  data() {
    return {
      met_time: new Date(2022, 10, 227, 19, 26),
      together_time: new Date(2023, 1, 17, 20),
      time_data: {
        // 列表分别对应为 top_card, bottom_card, top_flip 显示？ bottom_flip 显示？top_flip bottom_flip
        years:{
          nums: [0, 0, false, false, 0, 0, 0],
          ones: [0, 0, false, false, 0, 0, 0],
        },
        days: {
          tens: [0, 0, false, false, 0, 0, 0],
          ones: [0, 0, false, false, 0, 0, 0],
        },
        hours: {
          tens: [0, 0, false, false, 0, 0, 0],
          ones: [0, 0, false, false, 0, 0, 0],
        },
        minutes: {
          tens: [0, 0, false, false, 0, 0, 0],
          ones: [0, 0, false, false, 0, 0, 0],
        },
        seconds:{
          tens: [0, 0, false, false, 0, 0, 0],
          ones: [0, 0, false, false, 0, 0, 0],
        }
      },
      flags: {
        met_hundred: 0,
        met_years: 0,
        together_hundred: 0,
        together_years: 0,
      },
      boyfriend: {
        username: 'ethan',

      }
    }
  },

  methods: {
    // 翻转数字的主函数
    flip(flip_data, new_number) {
      if (flip_data) {
        // 如果新的数字和旧的数字一样，直接返回
        if (new_number === flip_data[0]) return
        // 显示两个 flip
        flip_data[2] = true
        flip_data[3] = true
        flip_data[1] = flip_data[0]
        flip_data[4] = flip_data[0]
        flip_data[5] = new_number
        flip_data[6] = new_number

        // this.start(flip_data, new_number)
        // // setTimeout(function (){flip_data[1] = false}, 250);
        // setTimeout(()=>{flip_data[2] = false;flip_data[1] = new_number}, 250);
      }
    },

    // 翻转所有的元素
    flip_all_cards(time) {
      const seconds = time % 60
      const minutes = Math.floor(time / 60) % 60;
      const hours = Math.floor(time / 3600) % 24;
      const days = Math.floor(time / (3600 * 24));

      // this.flip(this.$refs.days_hundreds, Math.floor(days / 100))
      this.flip(this.time_data.days.tens, Math.floor(days / 10 % 10 ))
      this.flip(this.time_data.days.ones, days %  10)
      this.flip(this.time_data.hours.tens, Math.floor(hours / 10))
      this.flip(this.time_data.hours.ones, hours % 10)
      this.flip(this.time_data.minutes.tens, Math.floor(minutes / 10))
      this.flip(this.time_data.minutes.ones, minutes % 10)
      this.flip(this.time_data.seconds.tens, Math.floor(seconds / 10))
      this.flip(this.time_data.seconds.ones, seconds % 10)
    },

    // 动画测试
    top_start(event, type, digit, new_number){
      this.time_data[type][digit][0] = new_number
    },
    top_end(event, type, digit){
      this.time_data[type][digit][2] = false
    },
    bottom_end(event, type, digit, new_number){
      this.time_data[type][digit][1] = new_number;
      this.time_data[type][digit][3] = false;
    },

    // 更新时间
    update_time(){
      setInterval(() => {
        const current_date = new Date()
        const time_between = Math.ceil((this.met_time - current_date) / 1000)
        this.flip_all_cards(time_between)
      }, 250)
    },
  },

  mounted() {
    // console.log(this.$refs.days_tens[0].firstChild)
    this.update_time()
  }
}

</script>

<style scoped lang="scss">
*, *::after, *::before {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.25rem;
}

body {
  background-color: #f2f1ed;
  color: #de4848;
}

.timing {
  width: 100%;
  //background: 50% 36px url("../images/main_photo_1.jpg") fixed;
  margin-top: 110px;
  padding-top: 30px;

  .time-down {
    margin-bottom: 40px;
    max-height: 250px;
  }

  .time-title {
    padding: 30px 0;
  }

  .time-header {
    color: white;
    font-size: 3em;
    font-family: courgette, Helvetica, sans-serif;
    margin: 0;
  }

  .timing-container {
    font-size: 50px;
    display: flex;
    gap: .5em;
    justify-content: center;

    .flip-card {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .2);
      border-radius: .1em;

      .top, .bottom, .top-flip, .bottom-flip {
        height: .75em;
        line-height: 1;
        padding: .25em;
        overflow: hidden;
      }

      .top, .flip-card .top-flip {
        background-color: #f7f7f7;
        border-top-right-radius: .1em;
        border-top-left-radius: .1em;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      .bottom, .bottom-flip {
        background-color: white;
        display: flex;
        align-items: flex-end;
        border-bottom-right-radius: .1em;
        border-bottom-left-radius: .1em;
      }

      .top-flip {
        position: absolute;
        width: 100%;
        background: #f7f7f7;
        animation: flip-top 250ms ease-in;
        transform-origin: bottom;
      }
    }

    @keyframes flip-top {
      100% {
        transform: rotateX(90deg);
      }
    }

    .bottom-flip {
      position: absolute;
      bottom: 0;
      width: 100%;
      animation: flip-bottom 250ms ease-out 250ms;
      transform-origin: top;
      transform: rotateX(90deg);
    }

    @keyframes flip-bottom {
      100% {
        transform: rotateX(0deg);
      }
    }
  }

  .container-segment {
    display: flex;
    flex-direction: column;
    gap: .1em;
    align-items: center;

    .segment {
      display: flex;
      gap: .1em;
    }

    .segment-title {
      font-size: .5em;
    }
  }

  .about-us {
    margin: 30px auto;
    position: relative;

    .about-us-block {
      position: relative;
      background: white;
      padding: 30px 20px;
      line-height: 1.5em;
      margin: 30px;

      > div:first-child {
        border-bottom: 2px solid #f2f2f2;
        margin-bottom: 20px;
      }

      img {
        width: 120px;
        height: 120px;
        padding: 0;
        border-radius: 50%;
      }

    }

    .heart {
      position: absolute;
      width: 50px;
      top: 70px;
      z-index: 2;
      padding: 0;

      img {
        width: 100px;
        height: 100px;
        transform: translate(-25px);
      }
    }
  }

  .about-us:hover {
    @-webkit-keyframes pulse {
      25% {
        -webkit-transform: scale(1.05);
        transform: scale(1.05)
      }
      75% {
        -webkit-transform: scale(.95);
        transform: scale(.95)
      }
    }
    @keyframes pulse {
      25% {
        -webkit-transform: scale(1.05);
        -ms-transform: scale(1.05);
        transform: scale(1.05)
      }
      75% {
        -webkit-transform: scale(.95);
        -ms-transform: scale(.95);
        transform: scale(.95)
      }
    }

    .heart {
      -webkit-animation-name: pulse;
      animation-name: pulse;
      -webkit-animation-duration: .9s;
      animation-duration: .9s;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
      -webkit-animation-iteration-count: infinite;
      animation-iteration-count: infinite
    }
  }
}
</style>