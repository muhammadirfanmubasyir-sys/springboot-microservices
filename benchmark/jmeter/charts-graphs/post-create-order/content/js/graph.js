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
        data: {"result": {"minY": 99.0, "minX": 0.0, "maxY": 2156.0, "series": [{"data": [[0.0, 99.0], [0.1, 99.0], [0.2, 99.0], [0.3, 99.0], [0.4, 99.0], [0.5, 114.0], [0.6, 114.0], [0.7, 114.0], [0.8, 114.0], [0.9, 122.0], [1.0, 122.0], [1.1, 122.0], [1.2, 122.0], [1.3, 125.0], [1.4, 125.0], [1.5, 125.0], [1.6, 125.0], [1.7, 130.0], [1.8, 130.0], [1.9, 130.0], [2.0, 130.0], [2.1, 131.0], [2.2, 131.0], [2.3, 131.0], [2.4, 131.0], [2.5, 131.0], [2.6, 131.0], [2.7, 131.0], [2.8, 131.0], [2.9, 132.0], [3.0, 132.0], [3.1, 132.0], [3.2, 132.0], [3.3, 133.0], [3.4, 133.0], [3.5, 133.0], [3.6, 133.0], [3.7, 134.0], [3.8, 134.0], [3.9, 134.0], [4.0, 134.0], [4.1, 138.0], [4.2, 138.0], [4.3, 138.0], [4.4, 138.0], [4.5, 141.0], [4.6, 141.0], [4.7, 141.0], [4.8, 141.0], [4.9, 145.0], [5.0, 145.0], [5.1, 145.0], [5.2, 145.0], [5.3, 146.0], [5.4, 146.0], [5.5, 146.0], [5.6, 146.0], [5.7, 148.0], [5.8, 148.0], [5.9, 148.0], [6.0, 148.0], [6.1, 151.0], [6.2, 151.0], [6.3, 151.0], [6.4, 151.0], [6.5, 151.0], [6.6, 151.0], [6.7, 151.0], [6.8, 151.0], [6.9, 154.0], [7.0, 154.0], [7.1, 154.0], [7.2, 154.0], [7.3, 156.0], [7.4, 156.0], [7.5, 156.0], [7.6, 156.0], [7.7, 157.0], [7.8, 157.0], [7.9, 157.0], [8.0, 157.0], [8.1, 158.0], [8.2, 158.0], [8.3, 158.0], [8.4, 158.0], [8.5, 158.0], [8.6, 158.0], [8.7, 158.0], [8.8, 158.0], [8.9, 159.0], [9.0, 159.0], [9.1, 159.0], [9.2, 159.0], [9.3, 159.0], [9.4, 159.0], [9.5, 159.0], [9.6, 159.0], [9.7, 159.0], [9.8, 159.0], [9.9, 159.0], [10.0, 159.0], [10.1, 159.0], [10.2, 159.0], [10.3, 159.0], [10.4, 159.0], [10.5, 163.0], [10.6, 163.0], [10.7, 163.0], [10.8, 163.0], [10.9, 164.0], [11.0, 164.0], [11.1, 164.0], [11.2, 164.0], [11.3, 164.0], [11.4, 164.0], [11.5, 164.0], [11.6, 164.0], [11.7, 165.0], [11.8, 165.0], [11.9, 165.0], [12.0, 165.0], [12.1, 167.0], [12.2, 167.0], [12.3, 167.0], [12.4, 167.0], [12.5, 167.0], [12.6, 167.0], [12.7, 167.0], [12.8, 167.0], [12.9, 168.0], [13.0, 168.0], [13.1, 168.0], [13.2, 168.0], [13.3, 170.0], [13.4, 170.0], [13.5, 170.0], [13.6, 170.0], [13.7, 173.0], [13.8, 173.0], [13.9, 173.0], [14.0, 173.0], [14.1, 173.0], [14.2, 173.0], [14.3, 173.0], [14.4, 173.0], [14.5, 175.0], [14.6, 175.0], [14.7, 175.0], [14.8, 175.0], [14.9, 177.0], [15.0, 177.0], [15.1, 177.0], [15.2, 177.0], [15.3, 178.0], [15.4, 178.0], [15.5, 178.0], [15.6, 178.0], [15.7, 178.0], [15.8, 178.0], [15.9, 178.0], [16.0, 178.0], [16.1, 180.0], [16.2, 180.0], [16.3, 180.0], [16.4, 180.0], [16.5, 182.0], [16.6, 182.0], [16.7, 182.0], [16.8, 182.0], [16.9, 183.0], [17.0, 183.0], [17.1, 183.0], [17.2, 183.0], [17.3, 183.0], [17.4, 183.0], [17.5, 183.0], [17.6, 183.0], [17.7, 183.0], [17.8, 183.0], [17.9, 183.0], [18.0, 183.0], [18.1, 185.0], [18.2, 185.0], [18.3, 185.0], [18.4, 185.0], [18.5, 187.0], [18.6, 187.0], [18.7, 187.0], [18.8, 187.0], [18.9, 187.0], [19.0, 187.0], [19.1, 187.0], [19.2, 187.0], [19.3, 188.0], [19.4, 188.0], [19.5, 188.0], [19.6, 188.0], [19.7, 190.0], [19.8, 190.0], [19.9, 190.0], [20.0, 190.0], [20.1, 191.0], [20.2, 191.0], [20.3, 191.0], [20.4, 191.0], [20.5, 191.0], [20.6, 191.0], [20.7, 191.0], [20.8, 191.0], [20.9, 192.0], [21.0, 192.0], [21.1, 192.0], [21.2, 192.0], [21.3, 192.0], [21.4, 192.0], [21.5, 192.0], [21.6, 192.0], [21.7, 193.0], [21.8, 193.0], [21.9, 193.0], [22.0, 193.0], [22.1, 194.0], [22.2, 194.0], [22.3, 194.0], [22.4, 194.0], [22.5, 196.0], [22.6, 196.0], [22.7, 196.0], [22.8, 196.0], [22.9, 197.0], [23.0, 197.0], [23.1, 197.0], [23.2, 197.0], [23.3, 197.0], [23.4, 197.0], [23.5, 197.0], [23.6, 197.0], [23.7, 198.0], [23.8, 198.0], [23.9, 198.0], [24.0, 198.0], [24.1, 198.0], [24.2, 198.0], [24.3, 198.0], [24.4, 198.0], [24.5, 201.0], [24.6, 201.0], [24.7, 201.0], [24.8, 201.0], [24.9, 202.0], [25.0, 202.0], [25.1, 202.0], [25.2, 202.0], [25.3, 202.0], [25.4, 203.0], [25.5, 203.0], [25.6, 203.0], [25.7, 203.0], [25.8, 204.0], [25.9, 204.0], [26.0, 204.0], [26.1, 204.0], [26.2, 206.0], [26.3, 206.0], [26.4, 206.0], [26.5, 206.0], [26.6, 206.0], [26.7, 206.0], [26.8, 206.0], [26.9, 206.0], [27.0, 207.0], [27.1, 207.0], [27.2, 207.0], [27.3, 207.0], [27.4, 208.0], [27.5, 208.0], [27.6, 208.0], [27.7, 208.0], [27.8, 208.0], [27.9, 208.0], [28.0, 208.0], [28.1, 208.0], [28.2, 209.0], [28.3, 209.0], [28.4, 209.0], [28.5, 209.0], [28.6, 209.0], [28.7, 209.0], [28.8, 209.0], [28.9, 209.0], [29.0, 209.0], [29.1, 209.0], [29.2, 209.0], [29.3, 209.0], [29.4, 211.0], [29.5, 211.0], [29.6, 211.0], [29.7, 211.0], [29.8, 212.0], [29.9, 212.0], [30.0, 212.0], [30.1, 212.0], [30.2, 212.0], [30.3, 212.0], [30.4, 212.0], [30.5, 212.0], [30.6, 214.0], [30.7, 214.0], [30.8, 214.0], [30.9, 214.0], [31.0, 215.0], [31.1, 215.0], [31.2, 215.0], [31.3, 215.0], [31.4, 215.0], [31.5, 215.0], [31.6, 215.0], [31.7, 215.0], [31.8, 216.0], [31.9, 216.0], [32.0, 216.0], [32.1, 216.0], [32.2, 218.0], [32.3, 218.0], [32.4, 218.0], [32.5, 218.0], [32.6, 219.0], [32.7, 219.0], [32.8, 219.0], [32.9, 219.0], [33.0, 222.0], [33.1, 222.0], [33.2, 222.0], [33.3, 222.0], [33.4, 224.0], [33.5, 224.0], [33.6, 224.0], [33.7, 224.0], [33.8, 226.0], [33.9, 226.0], [34.0, 226.0], [34.1, 226.0], [34.2, 228.0], [34.3, 228.0], [34.4, 228.0], [34.5, 228.0], [34.6, 229.0], [34.7, 229.0], [34.8, 229.0], [34.9, 229.0], [35.0, 229.0], [35.1, 229.0], [35.2, 229.0], [35.3, 229.0], [35.4, 230.0], [35.5, 230.0], [35.6, 230.0], [35.7, 230.0], [35.8, 230.0], [35.9, 230.0], [36.0, 230.0], [36.1, 230.0], [36.2, 231.0], [36.3, 231.0], [36.4, 231.0], [36.5, 231.0], [36.6, 232.0], [36.7, 232.0], [36.8, 232.0], [36.9, 232.0], [37.0, 233.0], [37.1, 233.0], [37.2, 233.0], [37.3, 233.0], [37.4, 233.0], [37.5, 233.0], [37.6, 233.0], [37.7, 233.0], [37.8, 234.0], [37.9, 234.0], [38.0, 234.0], [38.1, 234.0], [38.2, 236.0], [38.3, 236.0], [38.4, 236.0], [38.5, 236.0], [38.6, 236.0], [38.7, 236.0], [38.8, 236.0], [38.9, 236.0], [39.0, 241.0], [39.1, 241.0], [39.2, 241.0], [39.3, 241.0], [39.4, 243.0], [39.5, 243.0], [39.6, 243.0], [39.7, 243.0], [39.8, 243.0], [39.9, 243.0], [40.0, 243.0], [40.1, 243.0], [40.2, 246.0], [40.3, 246.0], [40.4, 246.0], [40.5, 246.0], [40.6, 247.0], [40.7, 247.0], [40.8, 247.0], [40.9, 247.0], [41.0, 250.0], [41.1, 250.0], [41.2, 250.0], [41.3, 250.0], [41.4, 253.0], [41.5, 253.0], [41.6, 253.0], [41.7, 253.0], [41.8, 254.0], [41.9, 254.0], [42.0, 254.0], [42.1, 254.0], [42.2, 254.0], [42.3, 254.0], [42.4, 254.0], [42.5, 254.0], [42.6, 254.0], [42.7, 254.0], [42.8, 254.0], [42.9, 254.0], [43.0, 256.0], [43.1, 256.0], [43.2, 256.0], [43.3, 256.0], [43.4, 258.0], [43.5, 258.0], [43.6, 258.0], [43.7, 258.0], [43.8, 259.0], [43.9, 259.0], [44.0, 259.0], [44.1, 259.0], [44.2, 260.0], [44.3, 260.0], [44.4, 260.0], [44.5, 260.0], [44.6, 261.0], [44.7, 261.0], [44.8, 261.0], [44.9, 261.0], [45.0, 262.0], [45.1, 262.0], [45.2, 262.0], [45.3, 262.0], [45.4, 263.0], [45.5, 263.0], [45.6, 263.0], [45.7, 263.0], [45.8, 264.0], [45.9, 264.0], [46.0, 264.0], [46.1, 264.0], [46.2, 266.0], [46.3, 266.0], [46.4, 266.0], [46.5, 266.0], [46.6, 266.0], [46.7, 266.0], [46.8, 266.0], [46.9, 266.0], [47.0, 266.0], [47.1, 266.0], [47.2, 266.0], [47.3, 266.0], [47.4, 268.0], [47.5, 268.0], [47.6, 268.0], [47.7, 268.0], [47.8, 268.0], [47.9, 268.0], [48.0, 268.0], [48.1, 268.0], [48.2, 269.0], [48.3, 269.0], [48.4, 269.0], [48.5, 269.0], [48.6, 269.0], [48.7, 269.0], [48.8, 269.0], [48.9, 269.0], [49.0, 270.0], [49.1, 270.0], [49.2, 270.0], [49.3, 270.0], [49.4, 271.0], [49.5, 271.0], [49.6, 271.0], [49.7, 271.0], [49.8, 272.0], [49.9, 272.0], [50.0, 272.0], [50.1, 272.0], [50.2, 272.0], [50.3, 274.0], [50.4, 274.0], [50.5, 274.0], [50.6, 274.0], [50.7, 275.0], [50.8, 275.0], [50.9, 275.0], [51.0, 275.0], [51.1, 278.0], [51.2, 278.0], [51.3, 278.0], [51.4, 278.0], [51.5, 278.0], [51.6, 278.0], [51.7, 278.0], [51.8, 278.0], [51.9, 280.0], [52.0, 280.0], [52.1, 280.0], [52.2, 280.0], [52.3, 280.0], [52.4, 280.0], [52.5, 280.0], [52.6, 280.0], [52.7, 280.0], [52.8, 280.0], [52.9, 280.0], [53.0, 280.0], [53.1, 280.0], [53.2, 280.0], [53.3, 280.0], [53.4, 280.0], [53.5, 281.0], [53.6, 281.0], [53.7, 281.0], [53.8, 281.0], [53.9, 288.0], [54.0, 288.0], [54.1, 288.0], [54.2, 288.0], [54.3, 290.0], [54.4, 290.0], [54.5, 290.0], [54.6, 290.0], [54.7, 294.0], [54.8, 294.0], [54.9, 294.0], [55.0, 294.0], [55.1, 298.0], [55.2, 298.0], [55.3, 298.0], [55.4, 298.0], [55.5, 298.0], [55.6, 298.0], [55.7, 298.0], [55.8, 298.0], [55.9, 299.0], [56.0, 299.0], [56.1, 299.0], [56.2, 299.0], [56.3, 303.0], [56.4, 303.0], [56.5, 303.0], [56.6, 303.0], [56.7, 303.0], [56.8, 303.0], [56.9, 303.0], [57.0, 303.0], [57.1, 303.0], [57.2, 303.0], [57.3, 303.0], [57.4, 303.0], [57.5, 303.0], [57.6, 303.0], [57.7, 303.0], [57.8, 303.0], [57.9, 305.0], [58.0, 305.0], [58.1, 305.0], [58.2, 305.0], [58.3, 307.0], [58.4, 307.0], [58.5, 307.0], [58.6, 307.0], [58.7, 308.0], [58.8, 308.0], [58.9, 308.0], [59.0, 308.0], [59.1, 308.0], [59.2, 308.0], [59.3, 308.0], [59.4, 308.0], [59.5, 312.0], [59.6, 312.0], [59.7, 312.0], [59.8, 312.0], [59.9, 313.0], [60.0, 313.0], [60.1, 313.0], [60.2, 313.0], [60.3, 315.0], [60.4, 315.0], [60.5, 315.0], [60.6, 315.0], [60.7, 318.0], [60.8, 318.0], [60.9, 318.0], [61.0, 318.0], [61.1, 318.0], [61.2, 318.0], [61.3, 318.0], [61.4, 318.0], [61.5, 319.0], [61.6, 319.0], [61.7, 319.0], [61.8, 319.0], [61.9, 321.0], [62.0, 321.0], [62.1, 321.0], [62.2, 321.0], [62.3, 321.0], [62.4, 321.0], [62.5, 321.0], [62.6, 321.0], [62.7, 323.0], [62.8, 323.0], [62.9, 323.0], [63.0, 323.0], [63.1, 323.0], [63.2, 323.0], [63.3, 323.0], [63.4, 323.0], [63.5, 331.0], [63.6, 331.0], [63.7, 331.0], [63.8, 331.0], [63.9, 334.0], [64.0, 334.0], [64.1, 334.0], [64.2, 334.0], [64.3, 335.0], [64.4, 335.0], [64.5, 335.0], [64.6, 335.0], [64.7, 338.0], [64.8, 338.0], [64.9, 338.0], [65.0, 338.0], [65.1, 344.0], [65.2, 344.0], [65.3, 344.0], [65.4, 344.0], [65.5, 347.0], [65.6, 347.0], [65.7, 347.0], [65.8, 347.0], [65.9, 349.0], [66.0, 349.0], [66.1, 349.0], [66.2, 349.0], [66.3, 360.0], [66.4, 360.0], [66.5, 360.0], [66.6, 360.0], [66.7, 361.0], [66.8, 361.0], [66.9, 361.0], [67.0, 361.0], [67.1, 365.0], [67.2, 365.0], [67.3, 365.0], [67.4, 365.0], [67.5, 372.0], [67.6, 372.0], [67.7, 372.0], [67.8, 372.0], [67.9, 377.0], [68.0, 377.0], [68.1, 377.0], [68.2, 377.0], [68.3, 378.0], [68.4, 378.0], [68.5, 378.0], [68.6, 378.0], [68.7, 381.0], [68.8, 381.0], [68.9, 381.0], [69.0, 381.0], [69.1, 382.0], [69.2, 382.0], [69.3, 382.0], [69.4, 382.0], [69.5, 385.0], [69.6, 385.0], [69.7, 385.0], [69.8, 385.0], [69.9, 385.0], [70.0, 385.0], [70.1, 385.0], [70.2, 385.0], [70.3, 391.0], [70.4, 391.0], [70.5, 391.0], [70.6, 391.0], [70.7, 398.0], [70.8, 398.0], [70.9, 398.0], [71.0, 398.0], [71.1, 399.0], [71.2, 399.0], [71.3, 399.0], [71.4, 399.0], [71.5, 400.0], [71.6, 400.0], [71.7, 400.0], [71.8, 400.0], [71.9, 400.0], [72.0, 400.0], [72.1, 400.0], [72.2, 400.0], [72.3, 409.0], [72.4, 409.0], [72.5, 409.0], [72.6, 409.0], [72.7, 411.0], [72.8, 411.0], [72.9, 411.0], [73.0, 411.0], [73.1, 419.0], [73.2, 419.0], [73.3, 419.0], [73.4, 419.0], [73.5, 425.0], [73.6, 425.0], [73.7, 425.0], [73.8, 425.0], [73.9, 429.0], [74.0, 429.0], [74.1, 429.0], [74.2, 429.0], [74.3, 431.0], [74.4, 431.0], [74.5, 431.0], [74.6, 431.0], [74.7, 431.0], [74.8, 431.0], [74.9, 431.0], [75.0, 431.0], [75.1, 431.0], [75.2, 432.0], [75.3, 432.0], [75.4, 432.0], [75.5, 432.0], [75.6, 435.0], [75.7, 435.0], [75.8, 435.0], [75.9, 435.0], [76.0, 436.0], [76.1, 436.0], [76.2, 436.0], [76.3, 436.0], [76.4, 439.0], [76.5, 439.0], [76.6, 439.0], [76.7, 439.0], [76.8, 447.0], [76.9, 447.0], [77.0, 447.0], [77.1, 447.0], [77.2, 449.0], [77.3, 449.0], [77.4, 449.0], [77.5, 449.0], [77.6, 452.0], [77.7, 452.0], [77.8, 452.0], [77.9, 452.0], [78.0, 456.0], [78.1, 456.0], [78.2, 456.0], [78.3, 456.0], [78.4, 456.0], [78.5, 456.0], [78.6, 456.0], [78.7, 456.0], [78.8, 460.0], [78.9, 460.0], [79.0, 460.0], [79.1, 460.0], [79.2, 462.0], [79.3, 462.0], [79.4, 462.0], [79.5, 462.0], [79.6, 464.0], [79.7, 464.0], [79.8, 464.0], [79.9, 464.0], [80.0, 466.0], [80.1, 466.0], [80.2, 466.0], [80.3, 466.0], [80.4, 466.0], [80.5, 466.0], [80.6, 466.0], [80.7, 466.0], [80.8, 468.0], [80.9, 468.0], [81.0, 468.0], [81.1, 468.0], [81.2, 471.0], [81.3, 471.0], [81.4, 471.0], [81.5, 471.0], [81.6, 474.0], [81.7, 474.0], [81.8, 474.0], [81.9, 474.0], [82.0, 478.0], [82.1, 478.0], [82.2, 478.0], [82.3, 478.0], [82.4, 485.0], [82.5, 485.0], [82.6, 485.0], [82.7, 485.0], [82.8, 485.0], [82.9, 485.0], [83.0, 485.0], [83.1, 485.0], [83.2, 497.0], [83.3, 497.0], [83.4, 497.0], [83.5, 497.0], [83.6, 497.0], [83.7, 497.0], [83.8, 497.0], [83.9, 497.0], [84.0, 505.0], [84.1, 505.0], [84.2, 505.0], [84.3, 505.0], [84.4, 516.0], [84.5, 516.0], [84.6, 516.0], [84.7, 516.0], [84.8, 526.0], [84.9, 526.0], [85.0, 526.0], [85.1, 526.0], [85.2, 526.0], [85.3, 526.0], [85.4, 526.0], [85.5, 526.0], [85.6, 529.0], [85.7, 529.0], [85.8, 529.0], [85.9, 529.0], [86.0, 624.0], [86.1, 624.0], [86.2, 624.0], [86.3, 624.0], [86.4, 686.0], [86.5, 686.0], [86.6, 686.0], [86.7, 686.0], [86.8, 733.0], [86.9, 733.0], [87.0, 733.0], [87.1, 733.0], [87.2, 776.0], [87.3, 776.0], [87.4, 776.0], [87.5, 776.0], [87.6, 779.0], [87.7, 779.0], [87.8, 779.0], [87.9, 779.0], [88.0, 790.0], [88.1, 790.0], [88.2, 790.0], [88.3, 790.0], [88.4, 806.0], [88.5, 806.0], [88.6, 806.0], [88.7, 806.0], [88.8, 857.0], [88.9, 857.0], [89.0, 857.0], [89.1, 857.0], [89.2, 901.0], [89.3, 901.0], [89.4, 901.0], [89.5, 901.0], [89.6, 903.0], [89.7, 903.0], [89.8, 903.0], [89.9, 903.0], [90.0, 955.0], [90.1, 955.0], [90.2, 955.0], [90.3, 955.0], [90.4, 1028.0], [90.5, 1028.0], [90.6, 1028.0], [90.7, 1028.0], [90.8, 1034.0], [90.9, 1034.0], [91.0, 1034.0], [91.1, 1034.0], [91.2, 1035.0], [91.3, 1035.0], [91.4, 1035.0], [91.5, 1035.0], [91.6, 1068.0], [91.7, 1068.0], [91.8, 1068.0], [91.9, 1068.0], [92.0, 1069.0], [92.1, 1069.0], [92.2, 1069.0], [92.3, 1069.0], [92.4, 1070.0], [92.5, 1070.0], [92.6, 1070.0], [92.7, 1070.0], [92.8, 1106.0], [92.9, 1106.0], [93.0, 1106.0], [93.1, 1106.0], [93.2, 1128.0], [93.3, 1128.0], [93.4, 1128.0], [93.5, 1128.0], [93.6, 1134.0], [93.7, 1134.0], [93.8, 1134.0], [93.9, 1134.0], [94.0, 1168.0], [94.1, 1168.0], [94.2, 1168.0], [94.3, 1168.0], [94.4, 1205.0], [94.5, 1205.0], [94.6, 1205.0], [94.7, 1205.0], [94.8, 1231.0], [94.9, 1231.0], [95.0, 1231.0], [95.1, 1231.0], [95.2, 1251.0], [95.3, 1251.0], [95.4, 1251.0], [95.5, 1251.0], [95.6, 1261.0], [95.7, 1261.0], [95.8, 1261.0], [95.9, 1261.0], [96.0, 1263.0], [96.1, 1263.0], [96.2, 1263.0], [96.3, 1263.0], [96.4, 1327.0], [96.5, 1327.0], [96.6, 1327.0], [96.7, 1327.0], [96.8, 1375.0], [96.9, 1375.0], [97.0, 1375.0], [97.1, 1375.0], [97.2, 1402.0], [97.3, 1402.0], [97.4, 1402.0], [97.5, 1402.0], [97.6, 1432.0], [97.7, 1432.0], [97.8, 1432.0], [97.9, 1432.0], [98.0, 1532.0], [98.1, 1532.0], [98.2, 1532.0], [98.3, 1532.0], [98.4, 1533.0], [98.5, 1533.0], [98.6, 1533.0], [98.7, 1533.0], [98.8, 2010.0], [98.9, 2010.0], [99.0, 2010.0], [99.1, 2010.0], [99.2, 2033.0], [99.3, 2033.0], [99.4, 2033.0], [99.5, 2033.0], [99.6, 2156.0], [99.7, 2156.0], [99.8, 2156.0], [99.9, 2156.0]], "isOverall": false, "label": "Order Service - POST Create Order", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 79.0, "series": [{"data": [[0.0, 1.0], [2100.0, 1.0], [600.0, 2.0], [700.0, 4.0], [200.0, 79.0], [800.0, 2.0], [900.0, 3.0], [1000.0, 6.0], [1100.0, 4.0], [1200.0, 5.0], [300.0, 38.0], [1300.0, 2.0], [1400.0, 2.0], [1500.0, 2.0], [400.0, 31.0], [100.0, 60.0], [500.0, 5.0], [2000.0, 2.0]], "isOverall": false, "label": "Order Service - POST Create Order", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 5.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 209.0, "series": [{"data": [[0.0, 209.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 35.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 5.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 9.799086757990867, "minX": 1.78392822E12, "maxY": 10.0, "series": [{"data": [[1.78392828E12, 9.799086757990867], [1.78392822E12, 10.0]], "isOverall": false, "label": "Order Service - POST Create Order", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392828E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 358.01250000000016, "minX": 2.0, "maxY": 2156.0, "series": [{"data": [[8.0, 2033.0], [4.0, 1070.0], [2.0, 1388.5], [9.0, 2010.0], [10.0, 358.01250000000016], [5.0, 1327.0], [6.0, 2156.0], [3.0, 1106.0], [7.0, 1168.0]], "isOverall": false, "label": "Order Service - POST Create Order", "isController": false}, {"data": [[9.823293172690763, 399.87951807228933]], "isOverall": false, "label": "Order Service - POST Create Order-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 178.5, "minX": 1.78392822E12, "maxY": 6099.15, "series": [{"data": [[1.78392828E12, 1303.05], [1.78392822E12, 178.5]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78392828E12, 6099.15], [1.78392822E12, 835.5]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392828E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 392.95433789954325, "minX": 1.78392822E12, "maxY": 450.4333333333334, "series": [{"data": [[1.78392828E12, 392.95433789954325], [1.78392822E12, 450.4333333333334]], "isOverall": false, "label": "Order Service - POST Create Order", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392828E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 392.8173515981735, "minX": 1.78392822E12, "maxY": 448.0333333333333, "series": [{"data": [[1.78392828E12, 392.8173515981735], [1.78392822E12, 448.0333333333333]], "isOverall": false, "label": "Order Service - POST Create Order", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392828E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.78392822E12, "maxY": 5.2, "series": [{"data": [[1.78392828E12, 0.0], [1.78392822E12, 5.2]], "isOverall": false, "label": "Order Service - POST Create Order", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392828E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 99.0, "minX": 1.78392822E12, "maxY": 2156.0, "series": [{"data": [[1.78392828E12, 2156.0], [1.78392822E12, 1533.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78392828E12, 114.0], [1.78392822E12, 99.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78392828E12, 857.0], [1.78392822E12, 1411.9000000000005]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78392828E12, 2028.4000000000003], [1.78392822E12, 1533.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78392828E12, 278.0], [1.78392822E12, 237.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.78392828E12, 1168.0], [1.78392822E12, 1532.45]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392828E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 167.0, "minX": 7.0, "maxY": 1351.0, "series": [{"data": [[9.0, 439.0], [10.0, 1351.0], [44.0, 242.0], [22.0, 576.5], [46.0, 209.0], [25.0, 167.0], [28.0, 336.5], [7.0, 1205.0], [30.0, 237.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 46.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 167.0, "minX": 7.0, "maxY": 1351.0, "series": [{"data": [[9.0, 439.0], [10.0, 1351.0], [44.0, 241.5], [22.0, 576.0], [46.0, 209.0], [25.0, 167.0], [28.0, 336.5], [7.0, 1205.0], [30.0, 237.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 46.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.6666666666666666, "minX": 1.78392822E12, "maxY": 3.4833333333333334, "series": [{"data": [[1.78392828E12, 3.4833333333333334], [1.78392822E12, 0.6666666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392828E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.5, "minX": 1.78392822E12, "maxY": 3.65, "series": [{"data": [[1.78392828E12, 3.65], [1.78392822E12, 0.5]], "isOverall": false, "label": "201", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78392828E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.5, "minX": 1.78392822E12, "maxY": 3.65, "series": [{"data": [[1.78392828E12, 3.65], [1.78392822E12, 0.5]], "isOverall": false, "label": "Order Service - POST Create Order-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392828E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.5, "minX": 1.78392822E12, "maxY": 3.65, "series": [{"data": [[1.78392828E12, 3.65], [1.78392822E12, 0.5]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78392828E12, "title": "Total Transactions Per Second"}},
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

