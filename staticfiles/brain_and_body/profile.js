const username = JSON.parse(document.getElementById('user_username').textContent)
const svgContainer = document.querySelector('.svg-container')

const spanEl = document.querySelectorAll('span')
let user_points

spanEl.forEach(e => {
    e.addEventListener('click', async () => {
        await fetch(`http://localhost:8000/body/remove_exercise/${e.dataset.id}`)
        e.parentElement.remove()
    })
})

// POINTS GRAPH
async function fetchPoints(){
    const response = await fetch(`http://localhost:8000/${username}/points`)
    const data = await response.json()
    user_points = [
        {name: 'W', value: data.points_workout === 0 ? 1 : data.points_workout},
        {name: 'T', value: data.points_tabata === 0 ? 1 : data.points_tabata},
        {name: 'R', value: data.points_speed === 0 ? 1 : data.points_speed},
        {name: 'M', value: data.points_memory === 0 ? 1 : data.points_memory}
    ]

    createGraph()
}

function createGraph(){
    const respWidth = svgContainer.clientWidth
    const respHeight = svgContainer.clientHeight
    const radius = respWidth * 0.15

    const svg = d3.select('svg')

    const g = svg.append('g').attr('transform', `translate(${respWidth/2}, ${respHeight/2})`)
                                //blue    //light blue  //orange  //light orange
    const color = d3.scaleOrdinal([ '#0077B4', '#21B4FF', '#FE9A1F', '#FFB761'])
    const pie = d3.pie().sort(null).value( d => d.value)
    const path = d3.arc().outerRadius(radius).innerRadius(0)
    const label = d3.arc().outerRadius(radius).innerRadius(radius - 50)

    const pies = g.selectAll('.arc').data(pie(user_points)).enter().append('g').attr('class', 'arc')

    pies.append('path').attr('d', path).attr('fill', (d, i) => color(i))
    if (document.documentElement.clientWidth >= 600){
        pies.append('text').text(d => `${d.data.name}`).attr('transform', d => `translate(${label.centroid(d)})`)
    } 
}

fetchPoints()