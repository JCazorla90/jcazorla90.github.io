// Partículas espaciales
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 50; // Reducimos para un look más profesional

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.05;
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 123, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.2) {
      particlesArray.splice(i, 1);
      i--;
      particlesArray.push(new Particle());
    }
  }
  requestAnimationFrame(animateParticles);
}

// D3.js Force Simulation para Tech
const techSvg = d3.select('#tech-svg');
const techWidth = techSvg.node().getBoundingClientRect().width;
const techHeight = 300;

const techData = [
  { name: 'AWS', url: 'https://aws.amazon.com', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Azure', url: 'https://azure.microsoft.com', img: 'https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg' },
  { name: 'GCP', url: 'https://cloud.google.com', img: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg' },
  { name: 'Kubernetes', url: 'https://kubernetes.io', img: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg' },
  { name: 'Docker', url: 'https://www.docker.com', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg' },
  { name: 'Python', url: 'https://www.python.org', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
  { name: 'Git', url: 'https://git-scm.com', img: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg' },
  { name: 'Grafana', url: 'https://grafana.com', img: 'https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg' },
  { name: 'Jenkins', url: 'https://www.jenkins.io', img: 'https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg' },
  { name: 'Linux', url: 'https://www.linux.org', img: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg' },
  { name: 'TensorFlow', url: 'https://www.tensorflow.org', img: 'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg' },
  { name: 'RabbitMQ', url: 'https://www.rabbitmq.com', img: 'https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg' }
];

const techSimulation = d3.forceSimulation(techData)
  .force('charge', d3.forceManyBody().strength(-100))
  .force('center', d3.forceCenter(techWidth / 2, techHeight / 2))
  .force('collision', d3.forceCollide().radius(50))
  .force('x', d3.forceX(techWidth / 2).strength(0.05))
  .force('y', d3.forceY(techHeight / 2).strength(0.05))
  .on('tick', techTicked);

const techNodes = techSvg.selectAll('g')
  .data(techData)
  .enter()
  .append('g')
  .call(d3.drag()
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded));

techNodes.append('image')
  .attr('xlink:href', d => d.img)
  .attr('width', 40)
  .attr('height', 40)
  .attr('x', -20)
  .attr('y', -20);

techNodes.append('text')
  .attr('dy', '30')
  .attr('text-anchor', 'middle')
  .style('fill', '#e0e0e0')
  .style('font-size', '12px')
  .text(d => d.name);

techSvg.on('mousemove', function(event) {
  const [mx, my] = d3.pointer(event);
  techData.forEach(d => {
    const dx = d.x - mx;
    const dy = d.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      d.vx += (dx / dist) * 10;
      d.vy += (dy / dist) * 10;
    }
  });
  techSimulation.alpha(0.3).restart();
});

function techTicked() {
  techNodes.attr('transform', d => `translate(${Math.max(20, Math.min(techWidth - 20, d.x))},${Math.max(20, Math.min(techHeight - 20, d.y))})`);
}

// Voronoi Stippling para Blog
const blogSvg = d3.select('#blog-svg');
const width = 300;
const height = 300;

const androidSvg = `
<svg width="300" height="300" viewBox="0 0 100 100">
  <g transform="translate(50, 50)">
    <circle cx="0" cy="-20" r="20" fill="#00d4ff" />
    <rect x="-15" y="0" width="30" height="40" fill="#00d4ff" />
    <line x1="-10" y1="0" x2="-10" y2="-20" stroke="#00d4ff" stroke-width="5" />
    <line x1="10" y1="0" x2="10" y2="-20" stroke="#00d4ff" stroke-width="5" />
    <line x1="-10" y1="40" x2="-20" y2="60" stroke="#00d4ff" stroke-width="5" />
    <line x1="10" y1="40" x2="20" y2="60" stroke="#00d4ff" stroke-width="5" />
  </g>
</svg>
`;

blogSvg.html(androidSvg);

const context = d3.select('#blog-svg').append('canvas')
  .attr('width', width)
  .attr('height', height)
  .style('position', 'absolute')
  .style('top', 0)
  .style('left', 0)
  .node().getContext('2d');

const image = new Image();
image.src = 'data:image/svg+xml,' + encodeURIComponent(androidSvg);
image.onload = function() {
  context.drawImage(image, 0, 0, width, height);

  const pixels = context.getImageData(0, 0, width, height);
  const data = pixels.data;

  const points = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * 4;
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (brightness > 100) { // Ajustamos umbral para capturar mejor el androide
        points.push([x, y]);
      }
    }
  }

  const delaunay = d3.Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  blogSvg.selectAll('path')
    .data(voronoi.cellPolygons())
    .enter()
    .append('path')
    .attr('d', d => "M" + d.join("L") + "Z")
    .attr('fill', 'none')
    .attr('stroke', '#007bff')
    .attr('stroke-width', 0.5);

  blogSvg.selectAll('circle')
    .data(points)
    .enter()
    .append('circle')
    .attr('cx', d => d[0])
    .attr('cy', d => d[1])
    .attr('r', 1)
    .attr('fill', '#007bff');
};

// Funciones de arrastre (solo para Tech)
function dragStarted(event, d) {
  if (!event.active) techSimulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnded(event, d) {
  if (!event.active) techSimulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// Inicializar y animar
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const newTechWidth = techSvg.node().getBoundingClientRect().width;
  techSimulation.force('center', d3.forceCenter(newTechWidth / 2, techHeight / 2));
  techSimulation.alpha(1).restart();
});

initParticles();
animateParticles();
console.log('Scripts loaded');
