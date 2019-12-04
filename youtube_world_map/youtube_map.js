function legend({
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues
} = {}) {

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible")
        .style("display", "block");

    let x;

    // Continuous
    if (color.interpolator) {
        x = Object.assign(color.copy()
            .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
            { range() { return [marginLeft, width - marginRight]; } });

        svg.append("image")
            .attr("x", marginLeft)
            .attr("y", marginTop)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", ramp(color.interpolator()).toDataURL());

        // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
            if (tickValues === undefined) {
                const n = Math.round(ticks + 1);
                tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
            }
            if (typeof tickFormat !== "function") {
                tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
            }
        }
    }

    // Discrete
    else if (color.invertExtent) {
        const thresholds
            = color.thresholds ? color.thresholds() // scaleQuantize
                : color.quantiles ? color.quantiles() // scaleQuantile
                    : color.domain(); // scaleThreshold

        const thresholdFormat
            = tickFormat === undefined ? d => d
                : typeof tickFormat === "string" ? d3.format(tickFormat)
                    : tickFormat;

        x = d3.scaleLinear()
            .domain([-1, color.range().length - 1])
            .rangeRound([marginLeft, width - marginRight]);

        svg.append("g")
            .selectAll("rect")
            .data(color.range())
            .join("rect")
            .attr("x", (d, i) => x(i - 1))
            .attr("y", marginTop)
            .attr("width", (d, i) => x(i) - x(i - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", d => d);

        tickValues = d3.range(thresholds.length);
        tickFormat = i => thresholdFormat(thresholds[i], i);
    }

    svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize)
            .tickValues(tickValues))
        .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title));

    return svg.node();
}
function drawPieBig(data, country, topcat) {
    console.log("data")
    console.log(data.value)

    var w = 200;
    var h = 200;
    var legend_svg = d3.select(".big")
        .append("svg")
        .attr("class", "biglegend")
        .attr("width", w)
        .attr("height", h);
    var color = d3.scaleOrdinal()
        .domain(topcat)
        .range([ "#a50f15","#de2d26","#fb6a4a","#fcae91","#fee5d9"])

        // .range(d3.schemeReds[5])
    var legendOrdinal = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
        .shapePadding(10)
        .scale(color);
    legend_svg.append("g")
        .attr("class", "legendbig")
        .attr("transform", "translate(20,20)");
    legend_svg.select(".legendbig")
        .call(legendOrdinal);


    var width = 360,
        height = 360,
        radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal()
        .range(["#a50f15", "#de2d26", "#fb6a4a", "#fcae91", "#fee5d9"])

        // .range(d3.schemeReds[5])


    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.total; });

    var svg = d3.select(".big")
        .append("svg")
        .attr("class", "donutpienew " + country)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 3 + "," + height / 3 + ")");

    svg
        .transition()
        .delay(200)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var path_pop = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 40);

    var g = svg.selectAll(".arc")
        .data(pie(data.value))
        .enter().append("g")
        .attr("class", "arc");
    g.append("circle")
        .attr("class", "inside_circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 120)
        .style("fill", "lightgrey")


    g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '2.4em')
        .attr('y', 7)
        .text(country)

    var a = g.append("path")
        .style("fill", function (d) { return color(d.data.name); })

    a.transition().delay(function (d, i) {
        return i * 100;
    }).duration(100)
        .attrTween('d', function (d) {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return path(d)
            }
        });

    a.on("mouseover", function (d, i) {
        d3.select(this)
            .attr("d", path_pop)
            .transition()
            .duration(50)
            .attr('opacity', ".85");
        g.append("circle")
            .attr("class", "inside_circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 120)
            .style("fill", "lightgrey")
        g.append("text")
            .attr("text-anchor", "middle")
            .attr('font-size', '2.4em')
            .attr('y', -60)
            .text(country)
            .transition()
            .duration(50)
        g.append("text")
            .attr("class", "namecat")
            .attr("text-anchor", "middle")
            .attr('font-size', '1.8em')
            .attr("y", -10)
            .text(d.data.name)
            .transition()
            .duration(50)

        g.append("text")
            .attr("class", "nametotal")
            .attr("text-anchor", "middle")
            .attr('font-size', '1.8em')
            // .attr("x", -15)
            .attr("y", 35)
            .text(d.data.total)
            .transition()
            .duration(50)

        g.append("text")
            .attr("class", "namepercent")
            .attr("text-anchor", "middle")
            .attr('font-size', '1.8em')
            // .attr("x", -12)
            .attr("y", 80)
            .text(d.data.percent + "%")
            .transition()
            .duration(1000)
    })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .transition()
                .duration(800)
                .ease(d3.easeBounce)
                .attr("d", path)
                .attr('opacity', "1");

            d3.selectAll(".name").remove();
            d3.selectAll(".total").remove();
            d3.selectAll(".percent").remove();
        });


}
var div = d3.select("body").append("div").attr("class", "toolTip");

function drawPie(data, country) {
    var w = 200;
    var h = 200;
    var legend_svg = d3.select("#donut")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        
    var color = d3.scaleOrdinal()
        .domain(["Entertainment", "People & Blogs", "Music", "News & Politics", "Comedy"])
        .range([ "#a50f15","#de2d26","#fb6a4a","#fcae91","#fee5d9"])

    var legendOrdinal = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
        .shapePadding(10)
        .scale(color);
    legend_svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(20,20)");
    legend_svg.select(".legend")
        .call(legendOrdinal);

    var width = 200,
        height = 200,
        radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal()
        .range([ "#a50f15","#de2d26","#fb6a4a","#fcae91","#fee5d9"])
        // .range(d3.schemeReds[5])

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.total; });

    var svg = d3.select("body")
        .append("svg")
        .attr("class", "donutpie " + country)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var path_pop = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 40);

    var g = svg.selectAll(".arc")
        .data(pie(data.value))
        .enter()
        .append("g")
        .attr("class", "arc");

    g.append("circle")
        .attr("class", "inside_circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "lightgrey")

    g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '1.8em')
        .attr('y', 7)
        .text(country)

    var a = g.append("path")
        .style("fill", function (d) { return color(d.data.name); })


    a.transition().delay(function (d, i) {
        return i * 100;
    }).duration(100)
        .attrTween('d', function (d) {
            var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return path(d)
            }
        });

    a.on("mouseover", function (d, i) {
        d3.select(this)
            .attr("d", path_pop)
            .transition()
            .duration(50)
            .attr('opacity', ".85");
        g.append("circle")
            .attr("class", "inside_circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 50)
            .style("fill", "lightgrey")
        g.append("text")
            .attr("class", "country_up")
            .attr("text-anchor", "middle")
            .attr('font-size', '1.2em')
            .attr('y', -25)
            .text(country)
            .transition()
            .duration(50)

        g.append("text")
            .attr("class", "donname")
            .attr("text-anchor", "middle")
            .attr('font-size', '0.9em')
            .attr("y", -10)
            .text(d.data.name)
            .transition()
            .duration(50)

        g.append("text")
            .attr("class", "total")
            .attr("text-anchor", "middle")
            .attr("y", 10)
            .text(d.data.total)
            .transition()
            .duration(50)

        g.append("text")
            .attr("class", "percent")
            .attr("text-anchor", "middle")
            .attr("y", 28)
            .text(d.data.percent + "%")
            .transition()
            .duration(1000)
    })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .transition()
                .duration(800)
                .ease(d3.easeBounce)
                .attr("d", path)
                .attr('opacity', "1");
            g.append("text")
                .attr("text-anchor", "middle")
                .attr('font-size', '1.8em')
                .attr('y', 7)
                .text(country)

            d3.selectAll(".donname").remove();
            d3.selectAll(".total").remove();
            d3.selectAll(".percent").remove();
            d3.selectAll(".country_up").remove();



        });
}


// d3.json("donut.json").then(function (data) {
//     drawPie(data[0], "USA")
//     drawPie(data[1], "FRA")
//     drawPie(data[2], "IND")
//     drawPie(data[3], "CAN")
//     drawPie(data[4], "DE")
//     drawPie(data[5], "BRT")
//     drawPie(data[6], "JPN")
//     drawPie(data[7], "KOR")
//     drawPie(data[8], "MX")

// })
var margin = { top: 40, left: 150, bottom: 40, right: 10 };
var width = 1000 - margin.left - margin.right;
var height = 550 - margin.top - margin.bottom;

var svg = d3.select("#cho").append("svg")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var x = d3.scaleBand();
var y = d3.scaleLinear();

var origindata, dataset, mode, mode1;
var ss = 0;
var ss1 = 4;

var donut_country = ["USA"]

var promises = [];
promises.push(d3.json("world.topojson"))
promises.push(d3.json("world_top.json"))
promises.push(d3.json("country_top5.json"))

d3.select("#c1")
    .on("click", function () {
        drawWorld("c1")
    })

d3.select("#c2")
    .on("click", function () {
        drawWorld("c2")
    })
d3.select("#c3")
    .on("click", function () {
        drawWorld("c3")
    })
d3.select("#c4")
    .on("click", function () {
        drawWorld("c4")
    })
d3.select("#c5")
    .on("click", function () {
        drawWorld("c5")

    })

d3.select("#re")
    .on("click", function () {
        drawWorld("c1");
        d3.select(".donutpienew").remove();
        d3.selectAll(".donutpie").remove();
        d3.json("donut.json").then(function (data) {
            // console.log(data[0])
            drawPie(data[0], "USA")
            drawPie(data[1], "FRA")
            drawPie(data[2], "IND")
            drawPie(data[3], "CAN")
            drawPie(data[4], "DE")
            drawPie(data[5], "BRT")
            drawPie(data[6], "JPN")
            drawPie(data[7], "KOR")
            drawPie(data[8], "MX")

        })
    })

Promise.all(promises).then(function (values) {
    drawWorld("c1");
})

function drawWorld(catid) {
    Promise.all(promises).then(function (values) {
        format = d => `${d}%`
        var world = values[0];
        var data = values[1];
        var country_top5 = values[2];

        var myArray = new Array();
        for (var i = 0; i < data.length; i++) {
            if (data[i]["cat"] == catid) {
                myArray.push(data[i])
            }
        }
        data = Object.assign(new Map(myArray.map((d) => [d.id, d.value])))
        data.title = "Youtube Category temperature in 9 countries";
        color = d3.scaleQuantize()
            .domain([3, 45])
            .range(d3.schemeReds[5])

        var margin = { top: 100, left: 50, right: 50, bottom: 50 },
            height = 600 - margin.top - margin.bottom,
            width = 800 - margin.left - margin.right;

        svg = d3.select("#cho")
            .append("svg")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right + 200)
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        var projection = d3.geoMercator()
            .translate([width / 2, height / 2])
            .scale(90)

        path = d3.geoPath().projection(projection)

        svg.append("g")
            .attr("transform", "translate(600,-100)")
            .append(() => legend({ color, title: data.title, width: 260 }));

        svg.append("g")
            .attr("fill", "lightgrey")
            .selectAll("path")
            .data(topojson)
            .data(topojson.feature(world, world.objects.countries1).features.map(d => (d.value = data.get(d.id), d)))
            .join("path")
            .attr("fill", d => color(data.get(d.id)))
            .attr("stroke", "white")
            .attr("d", path)
            .on("click", function (d, i) {
                d3.selectAll(".biglegend").remove();
                d3.selectAll(".legendCells").remove();
                d3.selectAll(".donutpienew").remove()
                d3.select("#donut").remove()
                donut_id = '.donutpie.' + d.id
                d3.selectAll(".donutpie").remove()

                var top = new Array();
                var topcat = new Array();
                for (var i = 0; i < country_top5.length; i++) {
                    if (country_top5[i].key == d.id) {
                        top.push(country_top5[i])
                        for (var j = 0; j < country_top5[i].value.length; j++) {
                            topcat.push(country_top5[i].value[j].name)
                        }
                    }
                }
                drawPieBig(top[0], d.id, topcat)


            })
            .append("title")
            .text(d => {
                if (d.value)
                    return `${d.properties.name} ${data.get(d.id)}`
                else
                    return ''
            })

        svg.append("path")
            .datum(topojson.mesh(world, world.objects.countries1, (a, b) => a !== b))
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path);

        svg.append("g")
            .attr("class", "line-title")
            .style("fill", "black")
            .append('text')
            .attr("x", 250)
            .attr("y", -80)
            .text("Youtube Category temperature in 9 countries")
            .style("font-size", "20px")

        return svg.node();
    })
}

function drawTitle() {
    var filter_d, order_d
    if (mode == "#sort_as") {
        order_d = "in Ascending by value"
    } else if (mode == "#sort_des") {
        order_d = " in Descending by value"
    } else if (mode == "#alp_default") {
        order_d = "in Alphabetic by name"
    }
    if (mode1 == "#All") {
        filter_d = "For All 10 Countries"
    } else if (mode1 == "#Top") {
        filter_d = "For Top 5 Countries"
    } else if (mode1 == "#Buttom") {
        filter_d = "For Buttom 5 Countries"
    }
    var data_title = [
        { "Key": "Order", "Value": order_d },
        { "Key": "Filter", "Value": filter_d }]

    var a = svg.selectAll(".title")
        .selectAll(".label")
        .data(data_title, function (d) { return d.Value; })
    a.enter()
        .append("text")
        .classed('label', true)
        .attr("x", function (d) {
            if (d.Key == "Filter") {
                if (d.Value == "For Buttom 5 Countries") return 260
                else return 285
            }
            // return 260
            else return 420
        })
        .attr("y", 0)
        .text(function (d) { return d.Value });

    // EXIT.
    a.exit()
        .transition()
        .duration(0)
        .style("opacity", 0)
        .remove();


}

