var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function D3PieChart(){};
	smr.D3PieChart = D3PieChart; 
  
	D3PieChart.prototype.create = function(cdata,config){
		var html = hrender("tmpl-D3PieChart",{});
		return html;
	}
		
	D3PieChart.prototype.postDisplay = function(cdata, config) {
		var $e = this.$element;
		var thisC = this;
		cdata = cdata || {};
		
		var tdata = [];
		tdata.push({name:"Chrome",value:397});
		tdata.push({name:"Opera",value:345});
		tdata.push({name:"Safari",value:312});
		tdata.push({name:"Firefox",value:310});
		tdata.push({name:"Internet Explorer",value:307});
		var total = 0;
		var data =[];
		var color = d3.scale.category20();
		
		$.each(tdata,function(j,item){total+=item.value;});
		$.each(tdata,function(j,item){
			item.color = color(j);
			item.index = j+1;
			item.percent = ((item.value/total).toFixed(4))*100;
			data.push((item.value/total).toFixed(4));
		});
		
		$e.find(".D3PieChart-table tbody").html(hrender("tmpl-dataTable-tableTbody",{tdata:tdata}));
		
		var width = 400,
		    height = 400,
		    outerRadius = 150,
		    innerRadius = 0,
		    donut = d3.layout.pie(),
		    arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
	
		var vis = d3.select("#D3PieChart")
		    .append("svg")
		    .data([data])
		    .attr("width", width)
		    .attr("height", height);
	
		var arcs = vis.selectAll("g.arc")
		    .data(donut)
		    .enter().append("g")
		    .attr("class", "arc")
		    .attr("transform", "translate(" + (outerRadius+50) + "," + (outerRadius+50) + ")");
	
		arcs.append("path")
			.attr("fill", function(d, i) { return color(i); })
			.attr("class", "fill-path-hover")
		    .attr("index", function(d, i) { return i; })
		    .attr("d", arc);
		
		arcs.append("text")
		    .attr("transform", function(d) { return "translate(" + arc.centroiddef(d,100) + ")"; })
		    .attr("dy", ".35em")
		    .attr("text-anchor", "middle")
		    .attr("display", function(d) { return d.value > 0.05 ? null : "none"; })
		    .text(function(d, i) { return d.value*100 +"%"; });	
		
		$e.find(".fill-path-hover").hover(
				function(){
					var $this = $(this);
					var index = $this.attr("index");
					$this.css("opacity","0.7");
					$e.find(".D3PieChart-table tbody").find("tr").removeClass("sel").eq(index).addClass("sel");
				},
				function(){
					var $this = $(this);
					$this.css("opacity","1");
					$e.find(".D3PieChart-table tbody").find("tr").removeClass("sel");
				}
		);
	
	}
	
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("D3PieChart",{
		emptyParent: true,
		loadTmpl: false
	},
	function(){
		return new smr.D3PieChart();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
