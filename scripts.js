// Partículas espaciales
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 50;

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
  { name: 'RabbitMQ', url: 'https://www.rabbitmq.com', img: 'https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg' },
  { name: 'GitLab', url: 'https://about.gitlab.com', img: 'https://www.vectorlogo.zone/logos/gitlab/gitlab-icon.svg' },
  { name: 'GitHub', url: 'https://github.com', img: 'https://www.vectorlogo.zone/logos/github/github-icon.svg' },
  { name: 'Terraform', url: 'https://www.terraform.io', img: 'https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg' },
  { name: 'IBM Cloud', url: 'https://www.ibm.com/cloud', img: 'https://www.vectorlogo.zone/logos/ibm_cloud/ibm_cloud-ar21~bgwhite.svg' },
  { name: 'Splunk', url: 'https://www.splunk.com', img: 'https://www.vectorlogo.zone/logos/splunk/splunk-ar21~bgwhite.svg' },
  { name: 'Elastic', url: 'https://www.elastic.co', img: 'https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg' },
  { name: 'Argo', url: 'https://argoproj.github.io', img: 'https://www.vectorlogo.zone/logos/argoprojio/argoprojio-icon.svg' },
  { name: 'Apache Hadoop', url: 'https://hadoop.apache.org', img: 'https://www.vectorlogo.zone/logos/apache_hadoop/apache_hadoop-icon.svg' },
  { name: 'Zabbix', url: 'https://www.zabbix.com', img: 'https://www.vectorlogo.zone/logos/zabbix/zabbix-icon.svg' },
  { name: 'Ansible', url: 'https://www.ansible.com', img: 'https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg' }
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

// Cargar las últimas entradas del blog usando un proxy para evitar CORS
document.addEventListener('DOMContentLoaded', () => {
  const blogFeedUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://lamazmorradeliandroide.blogspot.com/feeds/posts/default?alt=json&max-results=3');
  
  fetch(blogFeedUrl)
    .then(response => response.json())
    .then(data => {
      const json = JSON.parse(data.contents);
      const blogPostsContainer = document.getElementById('blog-posts');
      if (!json.feed.entry) {
        blogPostsContainer.innerHTML = '<p>No se encontraron entradas recientes.</p>';
        return;
      }

      const entries = json.feed.entry.slice(0, 3); // Aseguramos solo 3 entradas
      entries.forEach(entry => {
        // Obtener el título
        const title = entry.title.$t;

        // Obtener el enlace (buscamos el enlace con rel="alternate")
        let link = '';
        for (let j = 0; j < entry.link.length; j++) {
          if (entry.link[j].rel === 'alternate') {
            link = entry.link[j].href;
            break;
          }
        }

        // Obtener un extracto del contenido (si existe)
        const summary = entry.summary ? entry.summary.$t : 'Sin descripción disponible.';
        // Limpiar HTML del extracto
        const div = document.createElement('div');
        div.innerHTML = summary;
        const cleanSummary = div.textContent || div.innerText || '';
        const maxLength = 100; // Límite de caracteres para el extracto
        const shortSummary = cleanSummary.length > maxLength ? cleanSummary.substring(0, maxLength) + '...' : cleanSummary;

        // Crear la tarjeta del blog
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
          <h3><a href="${link}" target="_blank">${title}</a></h3>
          <p>${shortSummary}</p>
        `;
        blogPostsContainer.appendChild(blogCard);
      });
    })
    .catch(error => {
      console.error('Error al cargar las entradas del blog:', error);
      const blogPostsContainer = document.getElementById('blog-posts');
      blogPostsContainer.innerHTML = '<p>Error al cargar las entradas del blog. Intenta de nuevo más tarde.</p>';
    });
});

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
