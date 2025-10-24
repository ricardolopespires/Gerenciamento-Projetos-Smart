


import React from 'react'
import WhyChooseCard from './WhyChooseCard'

const WhyChoose = () => {
  return (
      <div className='pt-16 pb-16 bg-[#F7F6FB]'>
      <h1 className='mt-6 text-2xl md:text-3xl capitalize font-bold text-center'>
        Soluções para seus investimentos
      </h1>
      <div className="mt-20 w-[90%] grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12">
        <WhyChooseCard
          image="/images/i1.png"
          title="Inteligência Artificial"
          description="Algoritmos avançados que analisam dados em tempo real para identificar oportunidades de investimento com precisão."
        />      
        <WhyChooseCard
          image="/images/i5.png"
          title="Gestão de Carteiras"
          description="Gestão profissional e estratégica de ativos, com foco em risco x retorno e diversificação inteligente."
        />
        <WhyChooseCard
          image="/images/i4.png"
          title="Estratégias Financeiras"
          description="Modelos quantitativos que se adaptam às dinâmicas do mercado para proteger e alavancar seu patrimônio."
        />
      </div>
    </div>
  )
}

export default WhyChoose
