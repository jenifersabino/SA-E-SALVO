
// Simple masks (CPF, tel, cep) and chart init
function maskInput(e, type){
  const v = e.target.value.replace(/\D/g,'');
  let out = v;
  if(type==='cpf'){
    out = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if(type==='tel'){
    if(v.length <=10) out = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else out = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if(type==='cep'){
    out = v.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  e.target.value = out;
}

document.addEventListener('input', e => {
  const el = e.target.closest('[data-mask]');
  if(!el) return;
  maskInput(e, el.dataset.mask);
});

// Init sample charts if present
function initCharts(){
  if(typeof Chart === 'undefined') return;
  const pie = document.getElementById('chart-resources');
  if(pie){
    new Chart(pie, {
      type: 'pie',
      data: {
        labels:['Acolhimento','Tratamento','Reinserção','Prevenção'],
        datasets:[{data:[30,45,15,10]}]
      },
      options:{responsive:true,plugins:{legend:{position:'bottom'}}}
    });
  }
  const line = document.getElementById('chart-volunteers');
  if(line){
    new Chart(line, {
      type:'line',
      data:{
        labels:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        datasets:[{label:'Atendimentos',data:[5,8,12,18,25,30,35,40,45,50,55,60],fill:false}]
      },
      options:{responsive:true,plugins:{legend:{display:false}}}
    });
  }
  const bars = document.getElementById('chart-impact');
  if(bars){
    new Chart(bars, {
      type:'bar',
      data:{
        labels:['Norte','Nordeste','Centro-Oeste','Sudeste','Sul'],
        datasets:[{label:'Beneficiários',data:[120,200,80,250,160]}]
      },
      options:{responsive:true,plugins:{legend:{display:false}}}
    });
  }
}

document.addEventListener('DOMContentLoaded', initCharts);
--- Funções de Ajuda ---

    // 1. Atualiza a posição do carrossel
    const updateSlidePosition = () => {
        slide.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateIndicators();
    };

    // 2. Cria os indicadores (pontos)
    const createIndicators = () => {
        images.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateSlidePosition();
                resetAutoPlay();
            });
            indicatorsContainer.appendChild(indicator);
        });
    };

    // 3. Atualiza qual indicador está ativo
    const updateIndicators = () => {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
        });
    };

    // --- Funções de Navegação ---

    const goToNext = () => {
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
        updateSlidePosition();
    };

    const goToPrev = () => {
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
        updateSlidePosition();
    };

    // --- Auto-Play ---

    const startAutoPlay = () => {
        // Roda a cada 3000 milissegundos (3 segundos)
        autoPlayInterval = setInterval(goToNext, 3000); 
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    // --- Event Listeners e Inicialização ---

    // Define a largura correta (caso a janela seja redimensionada)
    window.addEventListener('resize', () => {
        slideWidth = images[0].clientWidth;
        updateSlidePosition(); // Reposiciona o slide após o redimensionamento
    });

    // Eventos dos Botões
    nextBtn.addEventListener('click', () => {
        goToNext();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        goToPrev();
        resetAutoPlay();
    });

    // Inicia o carrossel
    createIndicators();
    startAutoPlay();
});

