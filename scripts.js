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
      d.vx += (dx / dist) * 10; // Aumentar la fuerza de repulsión
      d.vy += (dy / dist) * 10;
    }
  });
  techSimulation.alpha(0.3).restart(); // Reiniciar la simulación para aplicar los cambios
});

function techTicked() {
  techNodes.attr('transform', d => `translate(${Math.max(20, Math.min(techWidth - 20, d.x))},${Math.max(20, Math.min(techHeight - 20, d.y))})`);
}

// D3.js Force Simulation para Connect
const connectSvg = d3.select('#connect-svg');
const connectWidth = connectSvg.node().getBoundingClientRect().width;
const connectHeight = 200;

const connectData = [
  { name: 'Twitter', url: 'https://twitter.com/jcazorla90', img: 'https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/jose-cazorla-gijón', img: 'https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg' },
  { name: 'Dev.to', url: 'https://dev.to/jcazorla90', img: 'https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/dev-dot-to.svg' },
  { name: 'CodePen', url: 'https://codepen.io/jcazorla90', img: 'https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/codepen.svg' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com/users/tipodeincognito', img: 'https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/stack-overflow.svg' }
];

const connectSimulation = d3.forceSimulation(connectData)
  .force('charge', d3.forceManyBody().strength(-100))
  .force('center', d3.forceCenter(connectWidth / 2, connectHeight / 2))
  .force('collision', d3.forceCollide().radius(50))
  .force('x', d3.forceX(connectWidth / 2).strength(0.05))
  .force('y', d3.forceY(connectHeight / 2).strength(0.05))
  .on('tick', connectTicked);

const connectNodes = connectSvg.selectAll('g')
  .data(connectData)
  .enter()
  .append('g')
  .call(d3.drag()
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded));

connectNodes.append('a')
  .attr('xlink:href', d => d.url)
  .attr('target', '_blank')
  .append('image')
  .attr('xlink:href', d => d.img)
  .attr('width', 40)
  .attr('height', 40)
  .attr('x', -20)
  .attr('y', -20);

connectNodes.append('text')
  .attr('dy', '30')
  .attr('text-anchor', 'middle')
  .style('fill', '#e0e0e0')
  .style('font-size', '12px')
  .text(d => d.name);

connectSvg.on('mousemove', function(event) {
  const [mx, my] = d3.pointer(event);
  connectData.forEach(d => {
    const dx = d.x - mx;
    const dy = d.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      d.vx += (dx / dist) * 10;
      d.vy += (dy / dist) * 10;
    }
  });
  connectSimulation.alpha(0.3).restart();
});

function connectTicked() {
  connectNodes.attr('transform', d => `translate(${Math.max(20, Math.min(connectWidth - 20, d.x))},${Math.max(20, Math.min(connectHeight - 20, d.y))})`);
}

// Funciones de arrastre
function dragStarted(event, d) {
  if (!event.active) {
    techSimulation.alphaTarget(0.3).restart();
    connectSimulation.alphaTarget(0.3).restart();
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
    connectSimulation.alphaTarget(0);
  }
  d.fx = null;
  d.fy = null;
}

// Inicializar y animar
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const newTechWidth = techSvg.node().getBoundingClientRect().width;
  const newConnectWidth = connectSvg.node().getBoundingClientRect().width;
  techSimulation.force('center', d3.forceCenter(newTechWidth / 2, techHeight / 2));
  connectSimulation.force('center', d3.forceCenter(newConnectWidth / 2, connectHeight / 2));
  techSimulation.alpha(1).restart();
  connectSimulation.alpha(1).restart();
});

initParticles();
animateParticles();
