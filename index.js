const wheel = document.getElementById("wheel")
const spinButton = document.getElementById("spinButton")
const finalValue = document.getElementById("finalValue")

// Object tha stores values of minimum and maximum angle for a value

const rotationValue = [{
    minDeg:0,
    maxDeg:30,
    value:2
},
{
    minDeg:31,
    maxDeg:90,
    value:1
},
{
    minDeg:91,
    maxDeg:150,
    value:6
},
{
    minDeg:151,
    maxDeg:210,
    value:5
},
{
    minDeg:211,
    maxDeg:270,
    value:4
},
{
    minDeg:271,
    maxDeg:330,
    value:3
},
{
    minDeg:331,
    maxDeg:360,
    value:3
},
]

// size of each piece

const data = [16,16,16,16,16,16]

// background color for each color
let pieColors  =["#8b35bc",'#b163da',"#8b35bc","#b163da","#8b35bc","#b163da"]

// Create chart

let myChart  = new Chart(wheel,{
    // Plugin for displaying text on pie chart
    plugins:[ChartDataLabels],
    // chart type
    type:'pie',
    data:{
        // labels(values which are o be displayed )
        labels:[1,2,3,4,5,6],
        // Settings fo datasets/pie
        datasets:[
            {
                backgroundColor:pieColors,
                data:data
            },
        ],
    },
    options:{
        // responsive chart
        responsive:true,
        animation:{
          duration:0,
        },
        plugins:{
            // hide tooltip and legend
            tooltip:false,
            legend:{
                display:false
            },
            // display label inside the pie chart
             datalabels:{
                color:'#fff',
                formatter:(_,context)=>
                context.chart.data.labels[context.dataIndex],
                font:{
                    size:24
                },
                textAlign:"end",
             }


        }
    }
})
// display value based on the rando angle

const valueGeneraor = (angleValue)=>{
    for (let i of rotationValue){
        if (angleValue >= i.minDeg && angleValue <= i.maxDeg){
            finalValue.innerHTML =  `<p>Value: ${i.value}</p>`;
            spinButton.disabled = falsebreak;
        }
    }
}
// spinner function
let count = 0
// 100 rotations for animation and lastb rotation for result
let resultValue = 101;

spinButton.addEventListener("click",()=>{
    spinButton.disabled = true
    // empty final value
    finalValue.innerHTML = `<p>Good Luck</p>`
    // generae random degree to stop a
    let  randomDegree = Math.floor(Math.random()*
    (355-0+1)+0)
    // Intreval
    let IntervalRotation = window.setInterval(()=>{
        // set  rotation for piechart

        // Intially to make the pie chart rotate faser
        // we set resultValue to 101 so it rotate  101 degree at a time and this re
        // reduces at a time and this reduces by 1 with every count .Eventuially
        // on last rotation we rotate by 1 degree at a time
        myChart.options.rotation = myChart.options.rotation + resultValue;

        // update chart with new value
        myChart.update();
        // if   roation>360 reset it back to 0
        if(myChart.options.rotation >=360){
            count +=1
            resultValue -= 5
            myChart.options.rotation =0
        }
        else if(count > 15 && myChart.options.rotation == randomDegree){
            valueGeneraor(randomDegree)
            clearInterval(rotationValue)
            count =0
            resultValue = 101
        }

    },10)
})
