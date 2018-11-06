var ONE_DOT = 10 * 60 * 1000;
var NUMBER = 20000;

function getCurrentTime() {
  var date = new Date();
  var year = date.getFullYear();
  var mon = formatDigit(date.getMonth() + 1);
  var day = formatDigit(date.getDate());
  var hour = formatDigit(date.getHours());
  var min = formatDigit(date.getMinutes());
  var sec = formatDigit(date.getSeconds());
  return `${year}-${mon}-${day} ${hour}:${min}:${sec}`;
}

function formatTime(time) {
  var date = new Date(time);
  var mon = formatDigit(date.getMonth() + 1);
  var day = formatDigit(date.getDate());
  var hour = formatDigit(date.getHours());
  var min = formatDigit(date.getMinutes());
  return `${mon}-${day} ${hour}:${min}`;
}

function formatDigit(d) {
  return d > 9 ? `${d}` : `0${d}`;
}

var base = Date.now() - ONE_DOT * NUMBER;
var date = [];
var data = [Math.random() * 300];

for (var i = 1; i < NUMBER; i++) {
  date.push(formatTime(base += ONE_DOT));
  var value = Math.round((Math.random() - 0.5) * 20 + data[i - 1]);
  if (value <= 0) {
    value = Math.round(Math.random() * 10);
  }
  data.push(value);
}

var option = {
  backgroundColor: 'rgba(51,102,172,0.5)',
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    left: 'center',
    text: '事件态势',
    textStyle: {
      color: '#fff'
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: date,
    axisLine: {
      color: '#eee'
    },
    axisLabel: {
      color: '#eee'
    },
    axisLine: {
      color: '#fff'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    axisLine: {
      color: '#eee'
    },
    axisLabel: {
      color: '#eee'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100,
    handleStyle: {
      color: '#fff'
    }
  }, {
    start: 0,
    end: 10,
    handleSize: '80%',
    handleStyle: {
      color: '#fff',
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2
    }
  }],
  series: [{
    name: '事件数量',
    type: 'line',
    smooth: true,
    symbol: 'none',
    sampling: 'average',
    hoverAnimation: false,
    itemStyle: {
      color: 'rgb(255, 70, 131)'
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgb(255, 158, 68)'
      }, {
        offset: 1,
        color: 'rgb(255, 70, 131)'
      }])
    },
    data: data
  }]
};

var chart = null;

function initChart() {
  var ele = document.getElementById('events-quxian');
  chart = echarts.init(ele, 'chalk');
  chart.setOption(option);
  updateChartData();
}

function updateChartData() {
  // update data
  setInterval(function () {
    for (var i = 0; i < 200; i++) {
      data.shift();
      var value = Math.round((Math.random() - 0.5) * 20 + data[data.length - 1]);
      if (value <= 0) {
        value = Math.round(Math.random() * 10);
      }
      data.push(value);
    }
    chart.setOption({
      series: [{
        data: data
      }]
    });
  }, 1000);
}