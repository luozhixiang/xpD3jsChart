var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function D3LinesChart(){};
	smr.D3LinesChart = D3LinesChart; 
  
	D3LinesChart.prototype.build = function(data,config){
		var html = hrender("tmpl-D3LinesChart",{});
		return html;
	}
		
	D3LinesChart.prototype.postDisplay = function(pdata, config) {
		   var $e = this.$element;
		   var thisC = this;
				
		   function generateData() {
				var data = [];
				var i = 20;
	
				while (i--) {
					var date = new Date();
					date.setDate(date.getDate() - i);
					date.setHours(0, 0, 0, 0);
					var obj = {'value' : Math.round(Math.random()*1200), 'date' : date};
					data.push(obj);
				}
				return data;
			}

		    var data = generateData();
		    var data1 = generateData();

			
			var margin = {top: 10, right: 10, bottom: 20, left: 40},
			    width = 900,
			    height = 450;

			var max = d3.max(data, function(d) { return d.value });
			var min = 0;
			
			var x = d3.time.scale().range([0, width - margin.left * 2]).domain([data[0].date, data[data.length - 1].date]);
			var y = d3.scale.linear().range([height - margin.left * 2, 0]).domain([min, max]);

			var xAxis = d3.svg.axis().scale(x).tickSize(-370).tickPadding(10);
			var yAxis = d3.svg.axis().scale(y).orient('left').tickSize(-820).tickPadding(10)

			var line = d3.svg.line()
				.x(function(d,i) { return x(data[i].date); })
				.y(function(d,i) { return y(data[i].value); });
			
			var line1 = d3.svg.line()
				.x(function(d,i) { return x(data1[i].date); })
				.y(function(d,i) { return y(data1[i].value); });

			var svg = d3.select("#lines-chart").append("svg")
				.datum(data)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.attr('class', 'viz')
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			
			svg.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(0," + (height-80) + ")")
			    .call(xAxis);

			svg.append("g")
			    .attr("class", "y axis")
			    .call(yAxis);

			svg.append("path")
				.attr("class", "line")
				.attr("d", line);
			
			svg.append("path")
				.attr("class", "line")
				.attr("d", line1);
				
			svg.selectAll(".dot")
				.data(data)
				.enter().append("circle")
				.attr("class", "dot")
				.attr("cx", line.x())
				.attr("cy", line.y())
				.attr("r", 3.5);
			
			svg.selectAll(".dot1")
				.data(data1)
				.enter().append("circle")
				.attr("class", "dot1")
				.attr("cx", line1.x())
				.attr("cy", line1.y())
				.attr("r", 3.5);
			
			svg.selectAll(".dot").data(data);
			svg.selectAll(".dot1").data(data1);
			
	        $('svg circle').tipsy({ 
		        gravity: 'w', 
		        html: true, 
		        title: function() {
		          var d = this.__data__;
			      var pDate = d.date;
		          return 'Date: ' + pDate.getDate() + " " + pDate.getFullYear() + '<br>Value: ' + d.value; 
		        }
		    });

	}
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("D3LinesChart",{
		emptyParent: true,
		loadTmpl: true
	},
	function(){
		return new smr.D3LinesChart();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
