 const labels = ['May 24','May 25','May 26','May 27','May 28','May 29','May 30','May 31','Jun 01','Jun 02'];
  const data = {
    speed:    { actual:[13.2,13.0,12.8,12.1,11.4,11.2,11.8,12.4,12.9,13.1], plan:[13.6,13.6,13.6,13.6,13.6,13.6,13.6,13.6,13.6,13.6], yMin:10, yMax:15, label:'Speed (knots)', color:'#0056b3', planColor:'#aaa' },
    fuel:     { actual:[28.1,28.4,29.1,32.3,36.8,37.9,33.1,29.7,28.5,27.9], plan:[28,28,28,28,28,28,28,28,28,28], yMin:24, yMax:42, label:'Fuel MT/day', color:'#c0392b', planColor:'#aaa' },
    rpm:      { actual:[84,83,82,79,76,75,78,81,83,84], plan:null, yMin:70, yMax:92, label:'Shaft RPM', color:'#6f42c1', planColor:null },
    bf:       { actual:[3,4,5,6,7,6,5,4,3,3], plan:null, yMin:0, yMax:9, label:'Beaufort Scale', color:'#e65c00', planColor:null },
  };
  let chart = null;

  function showChart(type, btn) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (chart) chart.destroy();
    const d = data[type];
    const datasets = [{
      label: d.label,
      data: d.actual,
      borderColor: d.color,
      backgroundColor: d.color + '22',
      fill: true,
      tension: 0.3,
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: d.color
    }];
    if (d.plan) {
      datasets.push({ label:'Planned', data:d.plan, borderColor:d.planColor, borderDash:[5,5], fill:false, tension:0, borderWidth:1.5, pointRadius:0 });
    }
    chart = new Chart(ctx, {
      type: 'line',
      data: { labels: labels, datasets: datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { font:{ size:12 }, boxWidth:12 } } },
        scales: {
          x: { ticks: { font:{ size:11 }, maxRotation:30 }, grid: { color:'#eee' } },
          y: { min: d.yMin, max: d.yMax, ticks: { font:{ size:11 } }, grid: { color:'#eee' } }
        }
      }
    });
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
  }

  showChart('speed', document.querySelector('.tab.active'));