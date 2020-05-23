module.exports = [
  function globalConfirmed(data) {
    var gl = 0;

    for (var stateName in data) {
      for (var city in data[stateName].districtData) {
        gl = gl + parseInt(data[stateName].districtData[city].confirmed);
      }
    }

    return gl;
  },
  function globalActive(data) {
    var gl = 0;

    for (var stateName in data) {
      for (var city in data[stateName].districtData) {
        gl = gl + parseInt(data[stateName].districtData[city].active);
      }
    }

    return gl;
  },
  function globalRecovered(data) {
    var gl = 0;

    for (var stateName in data) {
      for (var city in data[stateName].districtData) {
        gl = gl + parseInt(data[stateName].districtData[city].recovered);
      }
    }

    return gl;
  },
  function globalDeaths(data) {
    var gl = 0;

    for (var stateName in data) {
      for (var city in data[stateName].districtData) {
        gl = gl + parseInt(data[stateName].districtData[city].deceased);
      }
    }

    return gl;
  },
];
