// Partículas espaciales
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
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

// D3.js Voronoi Stippling para Blog
const blogSvg = d3.select('#blog-svg');
const blogWidth = 300;
const blogHeight = 200;

const blogPoints = d3.range(100).map(() => ({
  x: Math.random() * blogWidth,
  y: Math.random() * blogHeight,
  vx: (Math.random() - 0.5) * 2,
  vy: (Math.random() - 0.5) * 2
}));

const blogSimulation = d3.forceSimulation(blogPoints)
  .force('collide', d3.forceCollide().radius(3))
  .force('x', d3.forceX(d => d.x).strength(0.1))
  .force('y', d3.forceY(d => d.y).strength(0.1))
  .on('tick', blogTicked);

const blogNodes = blogSvg.selectAll('circle')
  .data(blogPoints)
  .enter()
  .append('circle')
  .attr('r', 2)
  .attr('fill', '#00d4ff');

function blogTicked() {
  blogNodes
    .attr('cx', d => Math.max(2, Math.min(blogWidth - 2, d.x)))
    .attr('cy', d => Math.max(2, Math.min(blogHeight - 2, d.y)));
}

const voronoi = d3.voronoi()
  .extent([[0, 0], [blogWidth, blogHeight]]);

blogSvg.on('mousemove', function(event) {
  const [mx, my] = d3.pointer(event);
  blogPoints.forEach(d => {
    const dx = d.x - mx;
    const dy = d.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 50) {
      d.vx += (dx / dist) * 5;
      d.vy += (dy / dist) * 5;
    }
  });
  blogSimulation.alpha(0.3).restart();
});

// Funciones de arrastre (solo para Tech)
function dragStarted(event, d) {
  if (!event.active) {
    techSimulation.alphaTarget(0.3).restart();
  }
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnded(event, d) {
  if (!event.active) {
    techSimulation.alphaTarget(0);
  }
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
