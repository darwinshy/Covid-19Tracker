module.exports = [
  function getMappedData(completeData) {
    var map = [];
    var finalmap = new Map();
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

      map.push(stateName, {
        stateName: stateName,
        stateCode: completeData[stateName].statecode,
        Confirmed: c,
        Active: a,
        Recovered: r,
        Deaths: d,
      });
    }

    map.sort(function (a, b) {
      var x = a.Confirmed;
      var y = b.Confirmed;

      if (x == undefined) {
        x = 0;
      }
      if (y == undefined) {
        y = 0;
      }

      if (x == y) {
        return 0;
      } else {
        return x > y ? -1 : 1;
      }
    });

    map.forEach((element) => {
      if (element["stateName"] != "State Unassigned")
        if (element.Confirmed != undefined) {
          finalmap.set(element.stateName, element);
        }
    });

    return finalmap;
  },
];
