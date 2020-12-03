const diseaseGraphCanva = document.getElementById('diseaseGraph');
const legend = document.querySelector("legend[for='diseaseGraph']");
let ulYears;
diseaseGraphCanva.width = 1200;
diseaseGraphCanva.height = 800;

const context = diseaseGraphCanva.getContext('2d');

let dataCancer = {"1995":845693,"1996":687019,"1997":713273,"1998":765911,"1999":674895,"2000":747097,"2001":969357,"2002":884857,"2003":926371,"2004":974134,"2005":825637,"2006":739180,"2007":687759,"2008":648259,"2009":622712,"2010":582366,"2011":610639,"2012":606959,"2013":552268,"2014":540632,"2015":523385,"2016":531803,"2017":503587,"2018":468975,"2019":483119}
let dataSida = {"1995":36673,"1996":37188,"1997":35400,"1998":33052,"1999":35334,"2000":40689,"2001":50214,"2002":49596,"2003":45758,"2004":49120,"2005":47330,"2006":50672,"2007":52047,"2008":52661,"2009":59193,"2010":67345,"2011":68292,"2012":75028,"2013":83657,"2014":91357,"2015":89354,"2016":98856,"2017":97178,"2018":95330,"2019":106230}
let dataCold = {"1995":7438698,"1996":8060179,"1997":7159757,"1998":6912769,"1999":6584301,"2000":6749240,"2001":7651627,"2002":7699428,"2003":7333245,"2004":7642809,"2005":7816248,"2006":7277538,"2007":6233709,"2008":6117987,"2009":7080652,"2010":6870819,"2011":6879799,"2012":6324157,"2013":6114508,"2014":5595562,"2015":5790105,"2016":5535843,"2017":5197421,"2018":5110659,"2019":4904339}

//We use this function for drawing the grid lines of the chart
function drawLine(context, startPointX, startPointY, endPointX, endPointY, color) {
    context.save();
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(startPointX, startPointY);
    context.lineTo(endPointX, endPointY);
    context.stroke();
    context.restore();
}

//We use this function to draw a bar
function drawBar(context, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    context.save();
    context.fillStyle = color;
    context.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    context.restore();
}

let DeseaseBarchart = function (options) {
    this.options = options;
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.colors = options.colors;

    this.draw = () => {
        let maxValueOfBar = 0;

        //Calculating the maximum value of our bars
        for (let el in this.options.data) {
            maxValueOfBar = Math.max(maxValueOfBar, this.options.data[el]);
        }
        //Setting canvas Height and Width
        let canvasH = this.canvas.height - this.options.padding * 2;
        let canvasW = this.canvas.width - this.options.padding * 2;

        //Draw the grid lines
        let gridLineValue = 0;
        while (gridLineValue <= maxValueOfBar) {
            let grid = canvasH * (1 - gridLineValue / maxValueOfBar) + this.options.padding;
            drawLine(this.context, 0, grid, this.canvasW, grid, this.options.gridColor)

            // Write grid values
            this.context.save();
            this.context.fillStyle = this.options.gridColor;
            this.context.font = "bold 10px Arial";
            this.context.fillText(gridLineValue, 10, grid - 2);
            this.context.restore();

            gridLineValue += this.options.gridScale;
        }


        // Draw the bars
        let barIndex = 0;
        let noBars = Object.keys(this.options.data).length;
        let barSize = (canvasW) / noBars;

        for (let el in this.options.data) {
            let curr = this.options.data[el];
            let barHeight = Math.round(canvasH * curr / maxValueOfBar);
            drawBar(this.context, this.options.padding + barIndex * barSize, this.canvas.height - barHeight - this.options.padding, barSize, barHeight, this.colors[barIndex % this.colors.length]);
            barIndex++;
        }

    }
}

var CancerChart = new DeseaseBarchart({
    canvas: diseaseGraphCanva,
    padding: 120,
    gridScale: 30000,
    gridColor: '#130202',
    data: dataCancer,
    colors: ["#980B0B", "#F78D8D", "#4B0606", "#ED1D1D", "#FF4754", "#FF0A1B"]
});

var SidaChart = new DeseaseBarchart({
    canvas: diseaseGraphCanva,
    padding: 120,
    gridScale: 30000,
    gridColor: '#130202',
    data: dataSida,
    colors: ["#980B0B", "#F78D8D", "#4B0606", "#ED1D1D", "#FF4754", "#FF0A1B"]
});

var ColdChart = new DeseaseBarchart({
    canvas: diseaseGraphCanva,
    padding: 120,
    gridScale: 600000,
    gridColor: '#130202',
    data: dataCold,
    colors: ["#980B0B", "#F78D8D", "#4B0606", "#ED1D1D", "#FF4754", "#FF0A1B"]
});

let deseaseOptionCancer = document.querySelector('.option-cancer');
let deseaseOptionSida = document.querySelector('.option-sida');
let deseaseOptionCold = document.querySelector('.option-cold');

deseaseOptionCancer.addEventListener('click',() => {
    context.clearRect(0, 0, diseaseGraphCanva.width, diseaseGraphCanva.height);
    CancerChart.draw();
    barIndex = 0;
    let dataValues = Object.values(dataCancer);
    if(ulYears) {
        //If there is a legend already we delete it
        legend.removeChild(ulYears);
        //After that we draw the new legend
        drawLegend(dataCancer,dataValues,CancerChart);
    } else {
        //If there is no legend we draw it
        drawLegend(dataCancer,dataValues,CancerChart);
    }
})

deseaseOptionSida.addEventListener('click', () => {
    context.clearRect(0, 0, diseaseGraphCanva.width, diseaseGraphCanva.height);
    SidaChart.draw();
    barIndex = 0;
        let dataValues = Object.values(dataSida);
        if(ulYears) {
            legend.removeChild(ulYears);
            drawLegend(dataSida,dataValues,SidaChart);
        } else {
            drawLegend(dataSida,dataValues,SidaChart);
        }
       
})

deseaseOptionCold.addEventListener('click', () => {
    context.clearRect(0, 0, diseaseGraphCanva.width, diseaseGraphCanva.height);
    ColdChart.draw();
    barIndex = 0;
        let dataValues = Object.values(dataCold);
        if(ulYears) {
            legend.removeChild(ulYears);
            drawLegend(dataCold,dataValues,ColdChart);
        } else {
            drawLegend(dataCold,dataValues,ColdChart);
        } 
})

function drawLegend(dataObj,dataObjValues,chart) {
    ulYears = document.createElement("ul");
    ulYears.setAttribute('class','legend');
    let statisticSection = document.querySelector(".statistics-options");
    legend.append(ulYears);
    for (el in dataObj) {
        var li = document.createElement("li");
        li.setAttribute('class', 'graphic-legend-item')
        li.style.borderBottom = "10px solid " + chart.colors[barIndex % chart.colors.length];
        li.textContent = el + "- " + dataObjValues[barIndex] + " cases";
        ulYears.append(li);
        barIndex++;
    }
}