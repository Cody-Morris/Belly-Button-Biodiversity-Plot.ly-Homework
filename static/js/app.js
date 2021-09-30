d3.json("./data/samples.json").then(({ names }) => {

  names.forEach(name => {
    d3.select('select').append('option').text(name)
  });

  showData();
});

function optionChanged() {
  showData();
};

function showData() {
  var val = d3.select('select').node().value

  d3.json('./data/samples.json').then(({ metadata, samples }) => {

    var meta = metadata.filter(obj => obj.id == val)[0];
    var samp = samples.filter(obj => obj.id == val)[0];
    console.log(meta, samp);

    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key, value]) => {
      d3.select('.panel-body').append('h6').text(key.toUpperCase() + ': ' + value)
    })

    var { otu_ids, sample_values, otu_lables } = samp

    var data = [
      {
        x:  sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).reverse().map(x => 'OTU ' + x),
        type: 'bar',
        orientation: 'h',
        // text: otu_lables.slice(0,10).reverse()
      }
    ];

    Plotly.newPlot('bar', data);

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        colorScale: 'Earth',
        color: otu_ids,
      },
      text: otu_lables    
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data);

    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 10] } }
      }
    ];
    
    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', data, layout);

  });


  // Plotly.newPlot('bubble', data, layout);
};

