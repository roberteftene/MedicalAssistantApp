const diseaseGraphCanva = document.getElementById('diseaseGraph');
diseaseGraphCanva.width = 500;
diseaseGraphCanva.height = 500;

const context = diseaseGraphCanva.getContext('2d');

let data = {
    "1992": 200,
    "1993" : 100,
    "1994" : 150,
    "1995" : 200
}

//We use this function for drawing the grid lines of the chart
function drawLine(context, startPointX, startPointY, endPointX, endPointY,color){
    context.save();
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(startPointX,startPointY);
    context.lineTo(endPointX,endPointY);
    context.stroke();
    context.restore();
}

//We use this function to draw a bar
function drawBar(context, upperLeftCornerX, upperLeftCornerY, width, height,color){
    context.save();
    context.fillStyle=color;
    context.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    context.restore();
}

let DeseaseBarchart = function(options) {
    this.options = options;
    this.canvas = options.canvas;
    this.context = this.canvas.getContext('2d');
    this.colors = options.colors;

    this.draw = () => {
        let maxValueOfBar = 0;
        
        //Calculating the maximum value of our bars
        for(let el in this.options.data) {
            maxValueOfBar = Math.max(maxValueOfBar,this.options.data[el]);
        }
        //Setting canvas Height and Width
        let canvasH = this.canvas.height - this.options.padding * 2;
        let canvasW = this.canvas.width - this.options.padding * 2;

        //Draw the grid lines
        let gridLineValue = 0;
        while (gridLineValue <= maxValueOfBar) {
            let grid = canvasH * (1 - gridLineValue/maxValueOfBar) + this.options.padding;
            drawLine(this.context, 0,grid,this.canvasW,grid,this.options.gridColor)

            // Write grid values
            this.context.save();
            this.context.fillStyle = this.options.gridColor;
            this.context.font = "bold 10px Arial";
            this.context.fillText(gridLineValue, 10,grid - 2);
            this.context.restore();

            gridLineValue += this.options.gridScale;
        }

        // Draw the bars
        let barIndex = 0;
        let noBars = Object.keys(this.options.data).length;
        let barSize = (canvasW)/noBars;

        for (let el in this.options.data) {
            let curr = this.options.data[el];
            let barHeight = Math.round( canvasH * curr/maxValueOfBar);
            drawBar(this.context,this.options.padding + barIndex * barSize, this.canvas.height - barHeight - this.options.padding, barSize, barHeight,this.colors[barIndex%this.colors.length]);
            barIndex++;
        }
    }
}

var deseaseChart = new DeseaseBarchart(
    {
    canvas:diseaseGraphCanva,
    padding: 60,
    gridScale: 20,
    gridColor: '#130202',
    data:data,
    colors:["#980B0B","#F78D8D", "#4B0606","#ED1D1D"]
});

deseaseChart.draw();
