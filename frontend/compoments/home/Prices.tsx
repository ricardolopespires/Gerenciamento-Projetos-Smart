import { LuBadgeCheck } from "react-icons/lu";
import Link from "next/link";
import React from 'react'

const plans = [
    {
        key: 'free',
        name: 'Grátis',
        priceLabel: 'R$0',
        description: 'Testar a plataforma e experimentar agentes básicos',
        items: [
            '1 agente simultâneo',
            '100 chamadas API/mês',
            'Acesso ao dashboard básico',
            'Comunidade (forum)'
        ],
        cta: '/contact'
    },
    {
        key: 'pro',
        name: 'Pro',
        priceLabel: 'R$249',
        description: 'Para profissionais que usam agentes e integrações em produção',
        items: [
            'Até 10 agentes simultâneos',
            '5.000 chamadas API/mês',
            'Integrações com corretoras (API)',
            'Relatórios e backtests básicos',
            'Suporte por e-mail'
        ],
        cta: '/pricing'
    },
    {
        key: 'enterprise',
        name: 'Enterprise',
        priceLabel: 'Sob consulta',
        description: 'Soluções customizadas para equipes e empresas',
        items: [
            'Agentes ilimitados',
            'Chamadas API dedicadas',
            'SLA e suporte 24/7',
            'Onboarding e integração personalizada',
            'Acesso a features beta'
        ],
        cta: '/contact'
    }
]

const Prices = () => {
    return (
        <div className="pb-20 pt-20 bg-[#F7F6FB]">
            <div className="flex flex-col w-[90%] mx-auto text-center gap-6">
                <h1 className="mt-6 text-2xl md:text-3xl capitalize font-bold">Planos e serviços</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Escolha um plano que combine com suas necessidades: teste gratuitamente ou fale com nosso time para soluções corporativas.</p>

                <div className="mt-12">
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
                        {plans.map((plan) => (
                            <div key={plan.key} className="flex flex-col items-start bg-white shadow-md border rounded-lg p-8 gap-4">
                                <div className="flex w-full justify-between items-center">
                                    <h2 className="text-2xl font-semibold">{plan.name}</h2>
                                    <span className="text-xl text-gray-700">{plan.priceLabel}</span>
                                </div>
                                <p className="text-gray-600 text-sm">{plan.description}</p>

                                <ul className='flex flex-col mt-4 mb-4 w-full gap-3'>
                                    {plan.items.map((item) => (
                                        <li key={item} className="flex gap-3 items-start text-sm">
                                            <span className="text-green-500 mt-1"><LuBadgeCheck /></span>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="w-full mt-auto">
                                    <Link href={plan.cta} className="block w-full text-center text-sm px-4 py-2 text-white bg-gradient-to-r from-[#0B2353] to-[#364FCE] rounded-md hover:opacity-95">
                                        {plan.key === 'free' ? 'Comece grátis' : plan.key === 'pro' ? 'Assinar Pro' : 'Fale conosco'}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prices
