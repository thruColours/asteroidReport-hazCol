// let todayURL = 'https://api.nasa.gov/neo/rest/v1/feed/today?detail=true&api_key=IikTf9lHxDYg3tE65SLExHJhuGsf9x5Xc9g62Qsw';

let currentDate;
let yr;
let m;
let d;

let dSelect = '01';

yr = '2020';
m = '01';
d = dSelect;

currentDate = yr + '-' + m + '-' + d;

// change month here as well as above
let dateInput = '2020-01-' + dSelect;

let todayURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + dateInput + '&end_date=' + dateInput + '&api_key=IikTf9lHxDYg3tE65SLExHJhuGsf9x5Xc9g62Qsw';

let astHourSlice, astMinuSlice, astMiss, astSize;
    
let hazMissExtract, hazSizeExtract, astHourSliceHaz, astMinuSliceHaz;

let img;
let hundredMilKM_BoundaryCircRadius = 1000;

function preload() {
  img = loadImage('images/earth_black.png');
}

function setup() {
  //since the centre x,y coordinates that the asteroids are drawn
  //outwards from are dependent on canvas size, try overlaying
  //another canvas which can be repositioned, and then the main
  //canvas can be resized as required
  createCanvas(2400, 2400);
  angleMode(DEGREES);
  noLoop();
  loadJSON(todayURL,      gotData);

  // loadJSON('https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-07-17&end_date=2021-07-17&detailed=false&api_key=IikTf9lHxDYg3tE65SLExHJhuGsf9x5Xc9g62Qsw',      gotData);

  img = loadImage('images/earth_black.png')

}

function gotData(data){
  console.log(data);

  let astTimes = [];
  astMiss = [];
  astSize = [];
  
  let astHazTimes = [];
  let astHazMiss = [];
  let astHazSize = [];
  
  let hazTimesExtract = [];
  hazMissExtract = [];
  hazSizeExtract = [];

  const asteroids = data.near_earth_objects[currentDate];
  // console.log(asteroids);
  // astCount = asteroids.length;

  asteroids.forEach((item) =>
  astTimes.push(item.is_potentially_hazardous_asteroid === false && item.close_approach_data[0].close_approach_date_full) 
                    &&
  astMiss.push(item.is_potentially_hazardous_asteroid === false && item.close_approach_data[0].miss_distance.kilometers) 
                    &&
  astSize.push(item.is_potentially_hazardous_asteroid === false && item.estimated_diameter.meters.estimated_diameter_min) 
                    &&
  astHazTimes.push(item.is_potentially_hazardous_asteroid === true && item.close_approach_data[0].close_approach_date_full) 
                    &&
  astHazMiss.push(item.is_potentially_hazardous_asteroid === true && item.close_approach_data[0].miss_distance.kilometers) 
                    &&
  astHazSize.push(item.is_potentially_hazardous_asteroid === true && item.estimated_diameter.meters.estimated_diameter_min)                 
  );
  
   for( var i = 0; i < astTimes.length; i++){
     if ( astTimes[i] === false) {
       astTimes.splice(i, 1);
     }
  }
  
  //The above loop wasn't catching every 'false' for certain days. Couldn't identify why so just doubled the loop below & it seemed to work.
  
   for( var i = 0; i < astTimes.length; i++){
     if ( astTimes[i] === false) {
       astTimes.splice(i, 1);
     }
  }
  
  for( var a = 0; a < astMiss.length; a++){
     if ( astMiss[a] === false) {
       astMiss.splice(a, 1);
     }
  }
  
  for( var a = 0; a < astMiss.length; a++){
     if ( astMiss[a] === false) {
       astMiss.splice(a, 1);
     }
  }
  
  for( var b = 0; b < astSize.length; b++){
     if ( astSize[b] === false) {
       astSize.splice(b, 1);
     }
  }
  
  for( var b = 0; b < astSize.length; b++){
     if ( astSize[b] === false) {
       astSize.splice(b, 1);
     }
  }
  
  //no problems with just one filtration of haz data
  
  for( var c = 0; c < astHazTimes.length; c++){
     if ( astHazTimes[c] != false) {
       hazTimesExtract.push(astHazTimes[c]);
     }
  }
  
  for( var d = 0; d < astHazMiss.length; d++){
     if ( astHazMiss[d] != false) {
       hazMissExtract.push(astHazMiss[d]);
     }
  }
  
  for( var e = 0; e < astHazSize.length; e++){
     if ( astHazSize[e] != false) {
       hazSizeExtract.push(astHazSize[e]);
     }
  }
  
  // console.log(astTimes);
  // console.log(astMiss);
  // console.log(astSize);
  
  // console.log(astHazTimes);
  // console.log(astHazMiss);
  // console.log(astHazSize);
  
  // console.log(hazTimesExtract);
  // console.log(hazMissExtract);
  // console.log(hazSizeExtract);

  chopDate = x => x.slice(12, 14);
  astHourSlice = astTimes.map(chopDate);

  chopDatei = x => x.slice(15, 17);
  astMinuSlice = astTimes.map(chopDatei);
  
  chopDateHaz = x => x.slice(12, 14);
  astHourSliceHaz = hazTimesExtract.map(chopDateHaz);

  chopDateHazi = x => x.slice(15, 17);
  astMinuSliceHaz = hazTimesExtract.map(chopDateHazi);
  
//   //altMethod for nonhaz/haz separation
  
//    let astHaz = []
  
//     for( var e = 0; e < asteroids.length; e++){
//      if ( asteroids[e].is_potentially_hazardous_asteroid === true) {
//        astHaz++;
//      }
//   }
  
//   console.log(astHaz);

  // Don't pass any params to draw because it gets called by P5 from elsewhere
  // Instead look to the top of the sketch - those are now global vars that
  // can be set in this function and used in `draw()`

  // Don't do this -> draw(astHourSlice, astMinuSlice, astMiss);
  // Do this:
  redraw();
  // `noLoop()` is set in setup and then `redraw()` will make the `draw()`
  // run once more.
}

function draw() {

  background(128, 128, 128, 0);

  // This is here to make sure the draw function doesn't throw an error
  // when it runs at the beginning of the sketch, before gotData has
  // returned the data you need.
  if(astHourSlice === undefined || astHourSlice.length === 0){
    console.log('no data yet')
    return;
  }

    let x = height/2;
    let y = width/2;
    let earthDiamMetersLog = log(12756000);
    let earthDiamForDisp = (earthDiamMetersLog * 2) * 2;
    let earthRadiusForDisp = earthDiamForDisp/2;
    let earthToMoonKM = 384400;
    let earthToMoonDist = map(earthToMoonKM, 0, 100000000, 0, 500);
    let moonDiamMetersLog = log(3475000);
    let moonDiamForDisp = moonDiamMetersLog * 2;

    // 100,000,000 km boundary
    // stroke(255, 255, 255);
    // strokeWeight(0.5);
    noFill();
    // fill(20, 20, 20);
    // fill(200, 200, 200);
    noStroke();
    circle(width/2, height/2, (2000 + earthRadiusForDisp));

    // moon orbit
    // stroke(255, 248, 220);
    // circle(width/2, height/2, earthToMoonDist + earthDiamForDisp);
  
    // moon body
    // let moonOrbitEdgeDrawPoint = earthToMoonDist + earthRadiusForDisp;
    // let moonRadiusForDisp = moonDiamForDisp/2;
    // fill(255, 248, 220);
    // circle(x, y - (earthToMoonDist + earthRadiusForDisp + moonRadiusForDisp), moonDiamForDisp);
    

  // So you now have the three global vars set at the top and you can use
  // them to make a loop. I'm using the length of `astHourSlice` because it's
  // the first one I saw and I assume all those arrays will have the same length.

//   for(let i = 0; i < astHourSlice.length; i++){
//     // Pulling each item out of the arrays and assigning them to the
//     // the variable names you are using previously.
//     let hr = astHourSlice[i];
//     let min = astMinuSlice[i];
//     let astDist = astMiss[i];
//     let astSiize = astSize[i];

//     const angle = calculateAngle(hr,min) - 90;
//     // const indicatorAngle = calculateAngle(hr,min);
//     // console.log("ind. angle:" + indicatorAngle);

//     const circDiam = calculateSize(astSiize);
//     // console.log(circDiam);
    
//     // added circDiam/2 (circ radius) to distance as to draw circle/asteroid from edge
//     const distance = calculateDist(astDist) + circDiam/2;
//     // console.log("calculated distance:" + distance);

//     var dx = distance * cos(angle);
//     var dy = distance * sin(angle);

//     //colours for ast dots
//     const colAngle = calculateAngle(hr,min);
//     // console.log('colAngle:' + colAngle);
//     let colAngleMap = map(colAngle, 0, 360, 100, 255);

//     const colDistance = calculateDist(astDist);
//     // console.log('colDist:' + colDistance);
//     const colCircDiam = calculateSize(astSiize)*12;
//     // console.log('colCirc:' + colCircDiam);

// //     fill(colAngleMap, (colDistance/2), colCircDiam/2);
//     fill(0,0,0);
//     noStroke();
//     circle(x + dx, y + dy, circDiam);
    
//   }
    
   for(let i = 0; i < astHourSliceHaz.length; i++){
    // Pulling each item out of the arrays and assigning them to the
    // the variable names you are using previously.
    let hrHaz = astHourSliceHaz[i];
    let minHaz = astMinuSliceHaz[i];
    let astDistHaz = hazMissExtract[i];
    let astSiizeHaz = hazSizeExtract[i];

    const angleHaz = calculateAngle(hrHaz,minHaz) - 90;
    // const indicatorAngle = calculateAngle(hr,min);
    // console.log("ind. angle:" + indicatorAngle);

    const circDiamHaz = calculateSize(astSiizeHaz);
    // console.log(circDiam);
    
    // added circDiam/2 (circ radius) to distance as to draw circle/asteroid from edge
    const distanceHaz = calculateDist(astDistHaz) + circDiamHaz/2;
    // console.log("calculated distance:" + distance);

    var dxHaz = distanceHaz * cos(angleHaz);
    var dyHaz = distanceHaz * sin(angleHaz);

    // //colours for ast dots
    const colAngle = calculateAngle(hrHaz,minHaz);
    let colAngleMap = map(colAngle, 0, 360, 100, 255);

    const colDistance = calculateDist(astDistHaz);
    const colCircDiam = calculateSize(astSiizeHaz)*12;
  
    //older c/w
    // fill(colAngleMap, (colDistance/2), colCircDiam/2);
    // fill(255,0,0);
     
    //for black background
    // fill((colAngleMap*2), (colDistance), (colCircDiam));
    
    //for white background
    fill((colAngleMap), (colDistance/4), (colCircDiam/1.5)/1.5);
    // fill((colAngleMap), (colDistance/4), (colCircDiam/1.5)); 
    
    noStroke();
    circle(x + dxHaz, y + dyHaz, circDiamHaz);

  }
  
  //Earth
  noStroke();
  fill(255, 255, 255);
  // fill(0, 0, 0);
  circle(width/2, height/2, earthDiamForDisp);
  imageMode(CENTER);
  image(img, width/2, (height/2) -1, earthDiamForDisp + 5, earthDiamForDisp - 1);
  // image(img, width/2, height/2, earthDiamForDisp + 1, earthDiamForDisp + 1);
  
  // dayInMonthRing ();
  // monthInYearRing();
  keyTyped();
}


function calculateAngle (h,m) {
  const hourVar = 15;

  mi = (m/60) * 100;
  minu = (mi/100) * 15;

  timeAng = minu + (h * hourVar);
  return timeAng;
}

function calculateDist (closeApproach) {

  let earthDiamMetersLog = log(12756000);
  let earthDiamForDisp = (earthDiamMetersLog * 2) * 2;
  let earthRadiusForDisp = earthDiamForDisp/2;

  let mapDistance = map(closeApproach, 0, 100000000, 0, hundredMilKM_BoundaryCircRadius);
  return mapDistance + earthRadiusForDisp;
}

function calculateSize (minSize) {
  size = (log(minSize) * 2) * 2;
  return size;
}

// function mouseClicked(){
//   // save('2021-07-17' + 'tri');
//   save(currentDate);
//   // redraw();
// }

function keyTyped() {
  if (key === 'a') {
      save(currentDate + ' ' + '24k' + '_jusHaz');
  } else {
    
  }
}
