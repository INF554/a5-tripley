var margin = { top: 20, left: 80, bottom: 50, right: 10 };
        var width = 850 - margin.left - margin.right;
        var height = 600 - margin.top - margin.bottom;

        var svg = d3.select("#chart").append("svg")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var x = d3.scaleBand();
        var y = d3.scaleLinear();

        var dataset;
        var mode = '#An';
        var filter = 'all10';
        var xAxis,yAxis;
        var temp_dataset;

        var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        console.log(h)

        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
        d3.json("data_countries.json", function (d) {
            return {
                key: d.key,
                value: d.value,
            };
        }).then(function (data) {
            console.log(data)
            dataset = data;
            dataset.sort(function(a, b) { return d3.ascending(a.key, b.key); });
            setMode("#An");
            setFilter("#all10");
            drawBars();
        });

        // set reset button
        d3.select("#reset")
            .on("click", function(){
                // use all the dataset
                temp_dataset = dataset;
                // sort dataset by An
                temp_dataset.sort(function(a, b) { return d3.ascending(a.key, b.key); });
                // set filter and mode
                select_reset();
                //  update x scale
                x.domain(temp_dataset.map(function (d) { return d.key; }));

                transitionBars();
                redrawBars(temp_dataset);



            });

        //sort bars
        d3.select("#An")
            .on("click", function () {
                if (typeof temp_dataset == 'undefined'){
                    temp_dataset = dataset;
                }
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.key, b.key); });
           
                setFilter(filter);
                setMode("#An");

                x.domain(temp_dataset.map(function (d) { return d.key; }));

                transitionBars();
                redrawBars(temp_dataset);

            
            });

        d3.select("#Av")
            .on("click", function () {
                if (typeof temp_dataset == 'undefined'){
                    temp_dataset = dataset;
                }
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.value, b.value); });
          
                setFilter(filter);
                setMode("#Av");
                x.domain(temp_dataset.map(function (d) { return d.key; }));

            
                transitionBars();
                redrawBars(temp_dataset);
            });

        d3.select("#Dv")
            .on("click", function () {
                if (typeof temp_dataset == 'undefined'){
                    temp_dataset = dataset;
                }
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.descending(a.value, b.value); });
           
            setFilter(filter);
                setMode("#Dv");
                x.domain(temp_dataset.map(function (d) { return d.key; }));

            
                transitionBars();
                redrawBars(temp_dataset);
            });

        //add/remove earth checkbox
        d3.select("#all10").on("click", function () {
           
            temp_dataset = dataset;

            if (mode === "#An") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.key, b.key); }).slice(0,10);
            } else if (mode === "#Av") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.value, b.value); }).slice(0,10);
            } else if (mode === "#Dv") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.descending(a.value, b.value); }).slice(0,10);
            }
            setMode(mode);
            setFilter("#all10");
            x.domain(temp_dataset.map(function (d) {return d.key;}));

            transitionBars();
            
            redrawBars(temp_dataset);
            });


            d3.select("#top5").on("click", function () {
            // var index = dataset.map(function (d) { return d.name; }).indexOf('EARTH');
            temp_dataset = dataset;
            
            if (mode === "#An") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.key, b.key); });
                temp_dataset = temp_dataset.slice(5,10);
            } else if (mode === "#Av") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.value, b.value); });
                temp_dataset = temp_dataset.slice(5,10);
            } else if (mode === "#Dv") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.descending(a.value, b.value); });
                temp_dataset = temp_dataset.slice(5,10);
            }
            setMode(mode);

            setFilter("#top5");
            x.domain(temp_dataset.map(function (d) {return d.key;}));
            transitionBars();

            redrawBars(temp_dataset);


            });


            d3.select("#buttom5").on("click", function () {
            // var index = dataset.map(function (d) { return d.name; }).indexOf('EARTH');
            temp_dataset = dataset;
            
            if (mode === "#An") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.key, b.key); });
                temp_dataset = temp_dataset.slice(0,5);
            } else if (mode === "#Av") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.ascending(a.value, b.value); });
                temp_dataset = temp_dataset.slice(0,5);
            } else if (mode === "#Dv") {
                temp_dataset = temp_dataset.sort(function(a, b) { return d3.descending(a.value, b.value); });
                temp_dataset = temp_dataset.slice(0,5);
            }
            setMode(mode);

            setFilter("#buttom5");
            x.domain(temp_dataset.map(function (d) {return d.key;}));
            transitionBars();

            redrawBars(temp_dataset);


            });

            
            


        function transitionBars() {
            // //update scale

            var transition = svg.transition()
                .duration(750);

            var delay = function (d, i) {
                return i * 50;
            };

            xAxis = d3.axisBottom()
                .scale(x)
                .tickSize(3);
            transition.select("#x-axis")
                .call(xAxis);

            
        }

        function redrawBars(){
            //update scale
            x.domain(temp_dataset.map(function (d) { return d.key; }));
            
            ////////////////////////////////
            // DATA JOIN FOR BARS.
            var bars = svg.selectAll(".bar")
                .data(temp_dataset, function (d) { return d.key; });

            var delay = function (d, i) {
                return i * 50;
            }

            // UPDATE.
            bars.transition()
                .duration(750)
                .delay(delay)
                .attr("x", function (d) { return x(d.key); })
                .attr("width", x.bandwidth());

            // ENTER.
            bars.enter().append("rect")
                .attr("x", function (d) { return x(d.key); })
                .attr("y", function (d) { return y(d.value); })
                .transition()
                .duration(1000)
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.key)+1; })
                .attr("y", function (d) { return y(d.value); })
                .attr("width", x.bandwidth())
                .attr("height", function (d) { return height - y(d.value); });

            // EXIT.
            bars.exit()
                .transition()
                .duration(750)
                .attr("x", function (d) { return x(d.key); })
                .attr("width", x.bandwidth())
                .style("opacity", 0)
                .remove();


        }

        // Use setMode function to record order
        function setMode(id) {
            d3.select("#An").style("background-color", "whitesmoke");
            d3.select("#Av").style("background-color", "whitesmoke");
            d3.select("#Dv").style("background-color", "whitesmoke");
            d3.select(id).style("background-color", "lightblue");
            mode = id;
        }

        function setFilter(id){
            d3.select("#all10").style("background-color", "whitesmoke");
            d3.select("#top5").style("background-color", "whitesmoke");
            d3.select("#buttom5").style("background-color", "whitesmoke");
            d3.select(id).style("background-color", "lightblue");
            filter = id;

        }
        function select_reset(){
            d3.select("#all10").style("background-color", "lightblue");
            d3.select("#top5").style("background-color", "whitesmoke");
            d3.select("#buttom5").style("background-color", "whitesmoke");
            d3.select("#reset").style("background-color", "whitesmoke");
            d3.select("#An").style("background-color", "lightblue");
            d3.select("#Av").style("background-color", "whitesmoke");
            d3.select("#Dv").style("background-color", "whitesmoke");
            mode = "#An";
            filter = "#all10"
        }



        function drawBars() {
            x.domain(dataset.map(function (d) { return d.key; }))
                .range([0, width])
                .paddingInner(0.05);

            y.domain([0, 1.0])
                .range([height, 0]);

            svg.selectAll(".bar")
                .data(dataset, function (d) { return d.key; })
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.key); })
                .attr("y", function (d) { return y(d.value); })
                .attr("width", x.bandwidth())
                .attr("height", function (d) { return height - y(d.value); });

            xAxis = d3.axisBottom()
                .scale(x)
                .tickSize(3);


            svg.append("g")
                .attr("id", "x-axis")
                .attr("class", "axis")
                .attr("transform", "translate(1," + height + ")")
                .call(xAxis);

            var yAxis = d3.axisLeft()
                .scale(y)
                .ticks(10);

            svg.append("g")
                .attr("class", "axis")
                .call(yAxis);

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom * 0.7)
                .attr('class', 'xlabel')
                .append("tspan").text("Countries")
                .style("baseline-shift", "super")
                .style("font-size", "12px");

            svg.append("text")
                .attr("x", - height / 2)
                .attr("y", - margin.left * 0.7)
                .attr("transform", "rotate(-90)")
                .attr('class', 'ylabel')
                .append("tspan").text("Gross enrollment ratio - Tertiary (female)")
                .style("baseline-shift", "super")
                .style("font-size", "12px");
        }