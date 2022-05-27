const username = JSON.parse(document.getElementById('user_username').textContent)
const mapContainer = document.querySelector('.map-container')
let points_eu
let points_am
let points_af
let points_as
let points_oc

async function fetchPoints(){
    const response = await fetch('http://localhost:8000/global_stats_api')
    const data = await response.json()

    data.forEach(country => {

        createGraph(country)
    })
}

function createGraph(obj){
    const multiplier = 0.2
    const respWidth = mapContainer.clientWidth * multiplier
    const respHeight = mapContainer.clientHeight * multiplier
    const radius = respWidth * 0.2

    obj_points = [
        {name: 'W', value: (obj.points_workout === 0 ? 1 : obj.points_workout)},
        {name: 'T.', value: (obj.points_tabata === 0 ? 1 : obj.points_tabata)},
        {name: 'R.', value: (obj.points_speed === 0 ? 1 : obj.points_speed)},
        {name: 'M.', value: (obj.points_memory === 0 ? 1 : obj.points_memory)}
    ]

    const svg = d3.select(`.${obj.name}`)

    const g = svg.append('g').attr('transform', `translate(${respWidth/2}, ${respHeight/2})`)
                                 //blue    //light blue  //orange  //light orange
    const color = d3.scaleOrdinal([ '#0077B4', '#21B4FF', '#FE9A1F', '#FFB761'])
    const pie = d3.pie().sort(null).value( d => d.value)
    const path = d3.arc().outerRadius(radius).innerRadius(0)
    // const label = d3.arc().outerRadius(radius).innerRadius(radius)

    const pies = g.selectAll('.arc').data(pie(obj_points)).enter().append('g').attr('class', 'arc').style("stroke", "black");

    pies.append('path').attr('d', path).attr('fill', (d, i) => color(i))
    
    if (document.documentElement.clientWidth >= 768){
        pies.append('text')            
        .attr("y", (respHeight / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "1.3rem")
        .style("font-weight", "100")
        .text(`${obj.name}`)
    } else {
        pies.append('text')            
        .attr("y", (respHeight / 1.8))
        .attr("text-anchor", "middle")  
        .style("font-size", "0.8rem")
        .style("font-weight", "100")
        .text(`${obj.name.slice(0, 2).toUpperCase()}`)
    }

    // pies.append('text').text(d => `${d.data.name}, ${d.data.value}`).attr('transform', d => `translate(${label.centroid(d)})`)
}

fetchPoints()