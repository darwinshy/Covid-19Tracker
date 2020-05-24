module.exports = [
  function getMappedData(completeData) {
    var map = new Map();
    for (var stateName in completeData) {
      var c = 0,
        a = 0,
        r = 0,
        d = 0;
      for (var city in completeData[stateName].districtData) {
        c = c + parseInt(completeData[stateName].districtData[city].confirmed);
        a = a + parseInt(completeData[stateName].districtData[city].active);
        r = r + parseInt(completeData[stateName].districtData[city].recovered);
        d = d + parseInt(completeData[stateName].districtData[city].deceased);
      }

      map.set(stateName, {
        stateName: stateName,
        stateCode: completeData[stateName].statecode,
        Confirmed: c,
        Active: a,
        Recovered: r,
        Deaths: d,
      });
    }

    return map;
  },
];
