/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 147.0, "minX": 0.0, "maxY": 2039.0, "series": [{"data": [[0.0, 147.0], [0.1, 147.0], [0.2, 147.0], [0.3, 147.0], [0.4, 147.0], [0.5, 147.0], [0.6, 147.0], [0.7, 156.0], [0.8, 156.0], [0.9, 156.0], [1.0, 156.0], [1.1, 156.0], [1.2, 156.0], [1.3, 160.0], [1.4, 160.0], [1.5, 160.0], [1.6, 160.0], [1.7, 160.0], [1.8, 160.0], [1.9, 160.0], [2.0, 161.0], [2.1, 161.0], [2.2, 161.0], [2.3, 161.0], [2.4, 161.0], [2.5, 161.0], [2.6, 170.0], [2.7, 170.0], [2.8, 170.0], [2.9, 170.0], [3.0, 170.0], [3.1, 170.0], [3.2, 170.0], [3.3, 170.0], [3.4, 170.0], [3.5, 170.0], [3.6, 170.0], [3.7, 170.0], [3.8, 170.0], [3.9, 172.0], [4.0, 172.0], [4.1, 172.0], [4.2, 172.0], [4.3, 172.0], [4.4, 172.0], [4.5, 180.0], [4.6, 180.0], [4.7, 180.0], [4.8, 180.0], [4.9, 180.0], [5.0, 180.0], [5.1, 180.0], [5.2, 180.0], [5.3, 180.0], [5.4, 180.0], [5.5, 180.0], [5.6, 180.0], [5.7, 180.0], [5.8, 186.0], [5.9, 186.0], [6.0, 186.0], [6.1, 186.0], [6.2, 186.0], [6.3, 186.0], [6.4, 186.0], [6.5, 188.0], [6.6, 188.0], [6.7, 188.0], [6.8, 188.0], [6.9, 188.0], [7.0, 188.0], [7.1, 189.0], [7.2, 189.0], [7.3, 189.0], [7.4, 189.0], [7.5, 189.0], [7.6, 189.0], [7.7, 189.0], [7.8, 189.0], [7.9, 189.0], [8.0, 189.0], [8.1, 189.0], [8.2, 189.0], [8.3, 189.0], [8.4, 191.0], [8.5, 191.0], [8.6, 191.0], [8.7, 191.0], [8.8, 191.0], [8.9, 191.0], [9.0, 191.0], [9.1, 191.0], [9.2, 191.0], [9.3, 191.0], [9.4, 191.0], [9.5, 191.0], [9.6, 191.0], [9.7, 192.0], [9.8, 192.0], [9.9, 192.0], [10.0, 192.0], [10.1, 192.0], [10.2, 192.0], [10.3, 200.0], [10.4, 200.0], [10.5, 200.0], [10.6, 200.0], [10.7, 200.0], [10.8, 200.0], [10.9, 205.0], [11.0, 205.0], [11.1, 205.0], [11.2, 205.0], [11.3, 205.0], [11.4, 205.0], [11.5, 205.0], [11.6, 206.0], [11.7, 206.0], [11.8, 206.0], [11.9, 206.0], [12.0, 206.0], [12.1, 206.0], [12.2, 206.0], [12.3, 206.0], [12.4, 206.0], [12.5, 206.0], [12.6, 206.0], [12.7, 206.0], [12.8, 206.0], [12.9, 207.0], [13.0, 207.0], [13.1, 207.0], [13.2, 207.0], [13.3, 207.0], [13.4, 207.0], [13.5, 208.0], [13.6, 208.0], [13.7, 208.0], [13.8, 208.0], [13.9, 208.0], [14.0, 208.0], [14.1, 208.0], [14.2, 209.0], [14.3, 209.0], [14.4, 209.0], [14.5, 209.0], [14.6, 209.0], [14.7, 209.0], [14.8, 210.0], [14.9, 210.0], [15.0, 210.0], [15.1, 210.0], [15.2, 210.0], [15.3, 210.0], [15.4, 227.0], [15.5, 227.0], [15.6, 227.0], [15.7, 227.0], [15.8, 227.0], [15.9, 227.0], [16.0, 227.0], [16.1, 232.0], [16.2, 232.0], [16.3, 232.0], [16.4, 232.0], [16.5, 232.0], [16.6, 232.0], [16.7, 235.0], [16.8, 235.0], [16.9, 235.0], [17.0, 235.0], [17.1, 235.0], [17.2, 235.0], [17.3, 235.0], [17.4, 239.0], [17.5, 239.0], [17.6, 239.0], [17.7, 239.0], [17.8, 239.0], [17.9, 239.0], [18.0, 242.0], [18.1, 242.0], [18.2, 242.0], [18.3, 242.0], [18.4, 242.0], [18.5, 242.0], [18.6, 246.0], [18.7, 246.0], [18.8, 246.0], [18.9, 246.0], [19.0, 246.0], [19.1, 246.0], [19.2, 246.0], [19.3, 246.0], [19.4, 246.0], [19.5, 246.0], [19.6, 246.0], [19.7, 246.0], [19.8, 246.0], [19.9, 248.0], [20.0, 248.0], [20.1, 248.0], [20.2, 248.0], [20.3, 248.0], [20.4, 248.0], [20.5, 248.0], [20.6, 249.0], [20.7, 249.0], [20.8, 249.0], [20.9, 249.0], [21.0, 249.0], [21.1, 249.0], [21.2, 254.0], [21.3, 254.0], [21.4, 254.0], [21.5, 254.0], [21.6, 254.0], [21.7, 254.0], [21.8, 273.0], [21.9, 273.0], [22.0, 273.0], [22.1, 273.0], [22.2, 273.0], [22.3, 273.0], [22.4, 273.0], [22.5, 284.0], [22.6, 284.0], [22.7, 284.0], [22.8, 284.0], [22.9, 284.0], [23.0, 284.0], [23.1, 298.0], [23.2, 298.0], [23.3, 298.0], [23.4, 298.0], [23.5, 298.0], [23.6, 298.0], [23.7, 298.0], [23.8, 300.0], [23.9, 300.0], [24.0, 300.0], [24.1, 300.0], [24.2, 300.0], [24.3, 300.0], [24.4, 303.0], [24.5, 303.0], [24.6, 303.0], [24.7, 303.0], [24.8, 303.0], [24.9, 303.0], [25.0, 303.0], [25.1, 312.0], [25.2, 312.0], [25.3, 312.0], [25.4, 312.0], [25.5, 312.0], [25.6, 312.0], [25.7, 314.0], [25.8, 314.0], [25.9, 314.0], [26.0, 314.0], [26.1, 314.0], [26.2, 314.0], [26.3, 316.0], [26.4, 316.0], [26.5, 316.0], [26.6, 316.0], [26.7, 316.0], [26.8, 316.0], [26.9, 316.0], [27.0, 318.0], [27.1, 318.0], [27.2, 318.0], [27.3, 318.0], [27.4, 318.0], [27.5, 318.0], [27.6, 319.0], [27.7, 319.0], [27.8, 319.0], [27.9, 319.0], [28.0, 319.0], [28.1, 319.0], [28.2, 319.0], [28.3, 321.0], [28.4, 321.0], [28.5, 321.0], [28.6, 321.0], [28.7, 321.0], [28.8, 321.0], [28.9, 323.0], [29.0, 323.0], [29.1, 323.0], [29.2, 323.0], [29.3, 323.0], [29.4, 323.0], [29.5, 324.0], [29.6, 324.0], [29.7, 324.0], [29.8, 324.0], [29.9, 324.0], [30.0, 324.0], [30.1, 324.0], [30.2, 325.0], [30.3, 325.0], [30.4, 325.0], [30.5, 325.0], [30.6, 325.0], [30.7, 325.0], [30.8, 332.0], [30.9, 332.0], [31.0, 332.0], [31.1, 332.0], [31.2, 332.0], [31.3, 332.0], [31.4, 332.0], [31.5, 337.0], [31.6, 337.0], [31.7, 337.0], [31.8, 337.0], [31.9, 337.0], [32.0, 337.0], [32.1, 337.0], [32.2, 337.0], [32.3, 337.0], [32.4, 337.0], [32.5, 337.0], [32.6, 337.0], [32.7, 340.0], [32.8, 340.0], [32.9, 340.0], [33.0, 340.0], [33.1, 340.0], [33.2, 340.0], [33.3, 340.0], [33.4, 345.0], [33.5, 345.0], [33.6, 345.0], [33.7, 345.0], [33.8, 345.0], [33.9, 345.0], [34.0, 347.0], [34.1, 347.0], [34.2, 347.0], [34.3, 347.0], [34.4, 347.0], [34.5, 347.0], [34.6, 347.0], [34.7, 349.0], [34.8, 349.0], [34.9, 349.0], [35.0, 349.0], [35.1, 349.0], [35.2, 349.0], [35.3, 350.0], [35.4, 350.0], [35.5, 350.0], [35.6, 350.0], [35.7, 350.0], [35.8, 350.0], [35.9, 354.0], [36.0, 354.0], [36.1, 354.0], [36.2, 354.0], [36.3, 354.0], [36.4, 354.0], [36.5, 354.0], [36.6, 358.0], [36.7, 358.0], [36.8, 358.0], [36.9, 358.0], [37.0, 358.0], [37.1, 358.0], [37.2, 363.0], [37.3, 363.0], [37.4, 363.0], [37.5, 363.0], [37.6, 363.0], [37.7, 363.0], [37.8, 363.0], [37.9, 371.0], [38.0, 371.0], [38.1, 371.0], [38.2, 371.0], [38.3, 371.0], [38.4, 371.0], [38.5, 375.0], [38.6, 375.0], [38.7, 375.0], [38.8, 375.0], [38.9, 375.0], [39.0, 375.0], [39.1, 375.0], [39.2, 377.0], [39.3, 377.0], [39.4, 377.0], [39.5, 377.0], [39.6, 377.0], [39.7, 377.0], [39.8, 387.0], [39.9, 387.0], [40.0, 387.0], [40.1, 387.0], [40.2, 387.0], [40.3, 387.0], [40.4, 387.0], [40.5, 387.0], [40.6, 387.0], [40.7, 387.0], [40.8, 387.0], [40.9, 387.0], [41.0, 387.0], [41.1, 394.0], [41.2, 394.0], [41.3, 394.0], [41.4, 394.0], [41.5, 394.0], [41.6, 394.0], [41.7, 397.0], [41.8, 397.0], [41.9, 397.0], [42.0, 397.0], [42.1, 397.0], [42.2, 397.0], [42.3, 397.0], [42.4, 408.0], [42.5, 408.0], [42.6, 408.0], [42.7, 408.0], [42.8, 408.0], [42.9, 408.0], [43.0, 411.0], [43.1, 411.0], [43.2, 411.0], [43.3, 411.0], [43.4, 411.0], [43.5, 411.0], [43.6, 414.0], [43.7, 414.0], [43.8, 414.0], [43.9, 414.0], [44.0, 414.0], [44.1, 414.0], [44.2, 414.0], [44.3, 416.0], [44.4, 416.0], [44.5, 416.0], [44.6, 416.0], [44.7, 416.0], [44.8, 416.0], [44.9, 426.0], [45.0, 426.0], [45.1, 426.0], [45.2, 426.0], [45.3, 426.0], [45.4, 426.0], [45.5, 426.0], [45.6, 426.0], [45.7, 426.0], [45.8, 426.0], [45.9, 426.0], [46.0, 426.0], [46.1, 426.0], [46.2, 436.0], [46.3, 436.0], [46.4, 436.0], [46.5, 436.0], [46.6, 436.0], [46.7, 436.0], [46.8, 438.0], [46.9, 438.0], [47.0, 438.0], [47.1, 438.0], [47.2, 438.0], [47.3, 438.0], [47.4, 438.0], [47.5, 443.0], [47.6, 443.0], [47.7, 443.0], [47.8, 443.0], [47.9, 443.0], [48.0, 443.0], [48.1, 461.0], [48.2, 461.0], [48.3, 461.0], [48.4, 461.0], [48.5, 461.0], [48.6, 461.0], [48.7, 461.0], [48.8, 462.0], [48.9, 462.0], [49.0, 462.0], [49.1, 462.0], [49.2, 462.0], [49.3, 462.0], [49.4, 464.0], [49.5, 464.0], [49.6, 464.0], [49.7, 464.0], [49.8, 464.0], [49.9, 464.0], [50.0, 464.0], [50.1, 465.0], [50.2, 465.0], [50.3, 465.0], [50.4, 465.0], [50.5, 465.0], [50.6, 465.0], [50.7, 469.0], [50.8, 469.0], [50.9, 469.0], [51.0, 469.0], [51.1, 469.0], [51.2, 469.0], [51.3, 472.0], [51.4, 472.0], [51.5, 472.0], [51.6, 472.0], [51.7, 472.0], [51.8, 472.0], [51.9, 472.0], [52.0, 479.0], [52.1, 479.0], [52.2, 479.0], [52.3, 479.0], [52.4, 479.0], [52.5, 479.0], [52.6, 484.0], [52.7, 484.0], [52.8, 484.0], [52.9, 484.0], [53.0, 484.0], [53.1, 484.0], [53.2, 484.0], [53.3, 492.0], [53.4, 492.0], [53.5, 492.0], [53.6, 492.0], [53.7, 492.0], [53.8, 492.0], [53.9, 494.0], [54.0, 494.0], [54.1, 494.0], [54.2, 494.0], [54.3, 494.0], [54.4, 494.0], [54.5, 510.0], [54.6, 510.0], [54.7, 510.0], [54.8, 510.0], [54.9, 510.0], [55.0, 510.0], [55.1, 510.0], [55.2, 519.0], [55.3, 519.0], [55.4, 519.0], [55.5, 519.0], [55.6, 519.0], [55.7, 519.0], [55.8, 519.0], [55.9, 519.0], [56.0, 519.0], [56.1, 519.0], [56.2, 519.0], [56.3, 519.0], [56.4, 519.0], [56.5, 527.0], [56.6, 527.0], [56.7, 527.0], [56.8, 527.0], [56.9, 527.0], [57.0, 527.0], [57.1, 527.0], [57.2, 527.0], [57.3, 527.0], [57.4, 527.0], [57.5, 527.0], [57.6, 527.0], [57.7, 543.0], [57.8, 543.0], [57.9, 543.0], [58.0, 543.0], [58.1, 543.0], [58.2, 543.0], [58.3, 543.0], [58.4, 554.0], [58.5, 554.0], [58.6, 554.0], [58.7, 554.0], [58.8, 554.0], [58.9, 554.0], [59.0, 572.0], [59.1, 572.0], [59.2, 572.0], [59.3, 572.0], [59.4, 572.0], [59.5, 572.0], [59.6, 572.0], [59.7, 576.0], [59.8, 576.0], [59.9, 576.0], [60.0, 576.0], [60.1, 576.0], [60.2, 576.0], [60.3, 581.0], [60.4, 581.0], [60.5, 581.0], [60.6, 581.0], [60.7, 581.0], [60.8, 581.0], [60.9, 587.0], [61.0, 587.0], [61.1, 587.0], [61.2, 587.0], [61.3, 587.0], [61.4, 587.0], [61.5, 587.0], [61.6, 594.0], [61.7, 594.0], [61.8, 594.0], [61.9, 594.0], [62.0, 594.0], [62.1, 594.0], [62.2, 597.0], [62.3, 597.0], [62.4, 597.0], [62.5, 597.0], [62.6, 597.0], [62.7, 597.0], [62.8, 597.0], [62.9, 601.0], [63.0, 601.0], [63.1, 601.0], [63.2, 601.0], [63.3, 601.0], [63.4, 601.0], [63.5, 603.0], [63.6, 603.0], [63.7, 603.0], [63.8, 603.0], [63.9, 603.0], [64.0, 603.0], [64.1, 603.0], [64.2, 615.0], [64.3, 615.0], [64.4, 615.0], [64.5, 615.0], [64.6, 615.0], [64.7, 615.0], [64.8, 617.0], [64.9, 617.0], [65.0, 617.0], [65.1, 617.0], [65.2, 617.0], [65.3, 617.0], [65.4, 619.0], [65.5, 619.0], [65.6, 619.0], [65.7, 619.0], [65.8, 619.0], [65.9, 619.0], [66.0, 619.0], [66.1, 624.0], [66.2, 624.0], [66.3, 624.0], [66.4, 624.0], [66.5, 624.0], [66.6, 624.0], [66.7, 627.0], [66.8, 627.0], [66.9, 627.0], [67.0, 627.0], [67.1, 627.0], [67.2, 627.0], [67.3, 627.0], [67.4, 631.0], [67.5, 631.0], [67.6, 631.0], [67.7, 631.0], [67.8, 631.0], [67.9, 631.0], [68.0, 633.0], [68.1, 633.0], [68.2, 633.0], [68.3, 633.0], [68.4, 633.0], [68.5, 633.0], [68.6, 639.0], [68.7, 639.0], [68.8, 639.0], [68.9, 639.0], [69.0, 639.0], [69.1, 639.0], [69.2, 639.0], [69.3, 640.0], [69.4, 640.0], [69.5, 640.0], [69.6, 640.0], [69.7, 640.0], [69.8, 640.0], [69.9, 699.0], [70.0, 699.0], [70.1, 699.0], [70.2, 699.0], [70.3, 699.0], [70.4, 699.0], [70.5, 699.0], [70.6, 750.0], [70.7, 750.0], [70.8, 750.0], [70.9, 750.0], [71.0, 750.0], [71.1, 750.0], [71.2, 765.0], [71.3, 765.0], [71.4, 765.0], [71.5, 765.0], [71.6, 765.0], [71.7, 765.0], [71.8, 798.0], [71.9, 798.0], [72.0, 798.0], [72.1, 798.0], [72.2, 798.0], [72.3, 798.0], [72.4, 798.0], [72.5, 859.0], [72.6, 859.0], [72.7, 859.0], [72.8, 859.0], [72.9, 859.0], [73.0, 859.0], [73.1, 889.0], [73.2, 889.0], [73.3, 889.0], [73.4, 889.0], [73.5, 889.0], [73.6, 889.0], [73.7, 889.0], [73.8, 925.0], [73.9, 925.0], [74.0, 925.0], [74.1, 925.0], [74.2, 925.0], [74.3, 925.0], [74.4, 933.0], [74.5, 933.0], [74.6, 933.0], [74.7, 933.0], [74.8, 933.0], [74.9, 933.0], [75.0, 969.0], [75.1, 969.0], [75.2, 969.0], [75.3, 969.0], [75.4, 969.0], [75.5, 969.0], [75.6, 969.0], [75.7, 1054.0], [75.8, 1054.0], [75.9, 1054.0], [76.0, 1054.0], [76.1, 1054.0], [76.2, 1054.0], [76.3, 1055.0], [76.4, 1055.0], [76.5, 1055.0], [76.6, 1055.0], [76.7, 1055.0], [76.8, 1055.0], [76.9, 1055.0], [77.0, 1055.0], [77.1, 1055.0], [77.2, 1055.0], [77.3, 1055.0], [77.4, 1055.0], [77.5, 1055.0], [77.6, 1072.0], [77.7, 1072.0], [77.8, 1072.0], [77.9, 1072.0], [78.0, 1072.0], [78.1, 1072.0], [78.2, 1072.0], [78.3, 1081.0], [78.4, 1081.0], [78.5, 1081.0], [78.6, 1081.0], [78.7, 1081.0], [78.8, 1081.0], [78.9, 1110.0], [79.0, 1110.0], [79.1, 1110.0], [79.2, 1110.0], [79.3, 1110.0], [79.4, 1110.0], [79.5, 1112.0], [79.6, 1112.0], [79.7, 1112.0], [79.8, 1112.0], [79.9, 1112.0], [80.0, 1112.0], [80.1, 1112.0], [80.2, 1138.0], [80.3, 1138.0], [80.4, 1138.0], [80.5, 1138.0], [80.6, 1138.0], [80.7, 1138.0], [80.8, 1139.0], [80.9, 1139.0], [81.0, 1139.0], [81.1, 1139.0], [81.2, 1139.0], [81.3, 1139.0], [81.4, 1139.0], [81.5, 1143.0], [81.6, 1143.0], [81.7, 1143.0], [81.8, 1143.0], [81.9, 1143.0], [82.0, 1143.0], [82.1, 1153.0], [82.2, 1153.0], [82.3, 1153.0], [82.4, 1153.0], [82.5, 1153.0], [82.6, 1153.0], [82.7, 1172.0], [82.8, 1172.0], [82.9, 1172.0], [83.0, 1172.0], [83.1, 1172.0], [83.2, 1172.0], [83.3, 1172.0], [83.4, 1183.0], [83.5, 1183.0], [83.6, 1183.0], [83.7, 1183.0], [83.8, 1183.0], [83.9, 1183.0], [84.0, 1287.0], [84.1, 1287.0], [84.2, 1287.0], [84.3, 1287.0], [84.4, 1287.0], [84.5, 1287.0], [84.6, 1287.0], [84.7, 1328.0], [84.8, 1328.0], [84.9, 1328.0], [85.0, 1328.0], [85.1, 1328.0], [85.2, 1328.0], [85.3, 1328.0], [85.4, 1328.0], [85.5, 1328.0], [85.6, 1328.0], [85.7, 1328.0], [85.8, 1328.0], [85.9, 1352.0], [86.0, 1352.0], [86.1, 1352.0], [86.2, 1352.0], [86.3, 1352.0], [86.4, 1352.0], [86.5, 1352.0], [86.6, 1372.0], [86.7, 1372.0], [86.8, 1372.0], [86.9, 1372.0], [87.0, 1372.0], [87.1, 1372.0], [87.2, 1373.0], [87.3, 1373.0], [87.4, 1373.0], [87.5, 1373.0], [87.6, 1373.0], [87.7, 1373.0], [87.8, 1373.0], [87.9, 1374.0], [88.0, 1374.0], [88.1, 1374.0], [88.2, 1374.0], [88.3, 1374.0], [88.4, 1374.0], [88.5, 1376.0], [88.6, 1376.0], [88.7, 1376.0], [88.8, 1376.0], [88.9, 1376.0], [89.0, 1376.0], [89.1, 1376.0], [89.2, 1381.0], [89.3, 1381.0], [89.4, 1381.0], [89.5, 1381.0], [89.6, 1381.0], [89.7, 1381.0], [89.8, 1430.0], [89.9, 1430.0], [90.0, 1430.0], [90.1, 1430.0], [90.2, 1430.0], [90.3, 1430.0], [90.4, 1442.0], [90.5, 1442.0], [90.6, 1442.0], [90.7, 1442.0], [90.8, 1442.0], [90.9, 1442.0], [91.0, 1442.0], [91.1, 1456.0], [91.2, 1456.0], [91.3, 1456.0], [91.4, 1456.0], [91.5, 1456.0], [91.6, 1456.0], [91.7, 1464.0], [91.8, 1464.0], [91.9, 1464.0], [92.0, 1464.0], [92.1, 1464.0], [92.2, 1464.0], [92.3, 1464.0], [92.4, 1474.0], [92.5, 1474.0], [92.6, 1474.0], [92.7, 1474.0], [92.8, 1474.0], [92.9, 1474.0], [93.0, 1475.0], [93.1, 1475.0], [93.2, 1475.0], [93.3, 1475.0], [93.4, 1475.0], [93.5, 1475.0], [93.6, 1495.0], [93.7, 1495.0], [93.8, 1495.0], [93.9, 1495.0], [94.0, 1495.0], [94.1, 1495.0], [94.2, 1495.0], [94.3, 1565.0], [94.4, 1565.0], [94.5, 1565.0], [94.6, 1565.0], [94.7, 1565.0], [94.8, 1565.0], [94.9, 1587.0], [95.0, 1587.0], [95.1, 1587.0], [95.2, 1587.0], [95.3, 1587.0], [95.4, 1587.0], [95.5, 1587.0], [95.6, 1630.0], [95.7, 1630.0], [95.8, 1630.0], [95.9, 1630.0], [96.0, 1630.0], [96.1, 1630.0], [96.2, 1643.0], [96.3, 1643.0], [96.4, 1643.0], [96.5, 1643.0], [96.6, 1643.0], [96.7, 1643.0], [96.8, 1703.0], [96.9, 1703.0], [97.0, 1703.0], [97.1, 1703.0], [97.2, 1703.0], [97.3, 1703.0], [97.4, 1703.0], [97.5, 1777.0], [97.6, 1777.0], [97.7, 1777.0], [97.8, 1777.0], [97.9, 1777.0], [98.0, 1777.0], [98.1, 1914.0], [98.2, 1914.0], [98.3, 1914.0], [98.4, 1914.0], [98.5, 1914.0], [98.6, 1914.0], [98.7, 1914.0], [98.8, 1919.0], [98.9, 1919.0], [99.0, 1919.0], [99.1, 1919.0], [99.2, 1919.0], [99.3, 1919.0], [99.4, 2039.0], [99.5, 2039.0], [99.6, 2039.0], [99.7, 2039.0], [99.8, 2039.0], [99.9, 2039.0]], "isOverall": false, "label": "Product Service - GET All Products", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 29.0, "series": [{"data": [[600.0, 12.0], [700.0, 3.0], [200.0, 21.0], [800.0, 2.0], [900.0, 3.0], [1000.0, 5.0], [1100.0, 8.0], [300.0, 29.0], [1200.0, 1.0], [1300.0, 8.0], [1400.0, 7.0], [1500.0, 2.0], [100.0, 16.0], [400.0, 19.0], [1600.0, 2.0], [1700.0, 2.0], [1900.0, 2.0], [500.0, 13.0], [2000.0, 1.0]], "isOverall": false, "label": "Product Service - GET All Products", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 85.0, "series": [{"data": [[0.0, 85.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 62.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 9.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 9.69230769230769, "minX": 1.78392822E12, "maxY": 9.69230769230769, "series": [{"data": [[1.78392822E12, 9.69230769230769]], "isOverall": false, "label": "Product Service - GET All Products", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392822E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 574.0279720279722, "minX": 1.0, "maxY": 2039.0, "series": [{"data": [[8.0, 1110.0], [4.0, 1372.0], [1.0, 1352.0], [9.0, 1333.2], [10.0, 574.0279720279722], [5.0, 1374.0], [6.0, 2039.0], [3.0, 1328.0], [7.0, 1919.0]], "isOverall": false, "label": "Product Service - GET All Products", "isController": false}, {"data": [[9.69230769230769, 644.7051282051285]], "isOverall": false, "label": "Product Service - GET All Products-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 4009.2, "minX": 1.78392822E12, "maxY": 891254.0, "series": [{"data": [[1.78392822E12, 891254.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78392822E12, 4009.2]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392822E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 644.7051282051285, "minX": 1.78392822E12, "maxY": 644.7051282051285, "series": [{"data": [[1.78392822E12, 644.7051282051285]], "isOverall": false, "label": "Product Service - GET All Products", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392822E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 588.6794871794872, "minX": 1.78392822E12, "maxY": 588.6794871794872, "series": [{"data": [[1.78392822E12, 588.6794871794872]], "isOverall": false, "label": "Product Service - GET All Products", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392822E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.8910256410256415, "minX": 1.78392822E12, "maxY": 0.8910256410256415, "series": [{"data": [[1.78392822E12, 0.8910256410256415]], "isOverall": false, "label": "Product Service - GET All Products", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392822E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 147.0, "minX": 1.78392822E12, "maxY": 2039.0, "series": [{"data": [[1.78392822E12, 2039.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78392822E12, 147.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78392822E12, 1433.6000000000001]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78392822E12, 1970.6000000000008]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78392822E12, 464.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.78392822E12, 1593.4500000000003]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392822E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 246.0, "minX": 7.0, "maxY": 1381.0, "series": [{"data": [[33.0, 246.0], [34.0, 314.0], [17.0, 543.0], [19.0, 1381.0], [10.0, 1362.0], [14.0, 480.5], [7.0, 1141.0], [15.0, 527.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 34.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 224.0, "minX": 7.0, "maxY": 1313.0, "series": [{"data": [[33.0, 224.0], [34.0, 283.0], [17.0, 463.0], [19.0, 513.0], [10.0, 1313.0], [14.0, 392.0], [7.0, 1076.0], [15.0, 513.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 34.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.78392816E12, "maxY": 2.466666666666667, "series": [{"data": [[1.78392822E12, 2.466666666666667], [1.78392816E12, 0.13333333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392822E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 2.6, "minX": 1.78392822E12, "maxY": 2.6, "series": [{"data": [[1.78392822E12, 2.6]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392822E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 2.6, "minX": 1.78392822E12, "maxY": 2.6, "series": [{"data": [[1.78392822E12, 2.6]], "isOverall": false, "label": "Product Service - GET All Products-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392822E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 2.6, "minX": 1.78392822E12, "maxY": 2.6, "series": [{"data": [[1.78392822E12, 2.6]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392822E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

