"use client"

import Link from "next/link";
import Check from "./components/Check/Checks";
import Solucoes from "./components/Solucoes/Solucoes";
import { useEffect, useState } from "react";

function completarZeroEsquerda(qtdDigito:number, numero:number) {
  const numeroString = numero.toString()

  if (numeroString.length < qtdDigito) {
    let quantosZerosFaltam =  qtdDigito - numeroString.length
    let numeroFormatado = numeroString
    while(quantosZerosFaltam > 0) {
      numeroFormatado = "0" + numeroFormatado
      quantosZerosFaltam = quantosZerosFaltam - 1
    }
    return (numeroFormatado)
  }
  return (numeroString)
}

export default function Home() {

const [mensagemSucesso, setMensagemSucesso] = useState('')
const [loading, setLoading] = useState(false)

const handleSubmit = async (event:any) => {

  const data = new Date()

  const dia = completarZeroEsquerda(2, data.getDate())
  const mes = completarZeroEsquerda(2, data.getMonth() + 1)
  const ano = data.getFullYear()
  const hora = data.getHours()
  const minuto = data.getMinutes()

  const dataAtual = `${dia}/${mes}/${ano} ${hora}:${minuto}`

  setLoading(true)
  event.preventDefault();
  const baseUrl = process.env.NEXT_PUBLIC_API_KEY;

  if (!baseUrl) {
    console.error("API key is not defined in the environment variables.");
    setLoading(false);
    return;
  }

  await fetch(baseUrl, {
    method:"POST",
    headers: {
      "Content-Type" : "application/x-www-form-urlencoded"
    },
    body:(`nome=${event.target.nome.value}&telefone=${event.target.telefone.value}&email=${event.target.email.value}&descricao=${event.target.descricao.value}&date=${dataAtual}`)
  }).then(res => res.text()).then(data => {
    console.log(data)
    if (data == "200"){
      setLoading(false)
      setMensagemSucesso("Sua Mensagem foi adicionada com sucesso, um de nossos colaboradores entrará em contato com você em breve")
    }
  }).catch(error => console.log(error))
}

useEffect(() => {
}, [loading])
  

  return (
    <div className="font-[Poppins] ">
      <div className="m-[3em] flex flex-col items-center">
        {mensagemSucesso != '' ? (
          <div className="flex relative p-[1em] w-[80%] ml-auto items-center justify-between mr-auto mb-[-1.5em] text-center rounded-2xl bg-green-500 shadow-lg shadow-green-700 inset-shadow-sm inset-shadow-green-700 animate-fade-down animate-once animate-ease-out animate-normal max-w-[400px]">
            <div className="flex mr-[1em]">
              <img src="/img/checkSucess.png" alt="Sucess" className="bg-white rounded-full p-[20px] w-[80px]"/>
            </div>
            <div className="text-left">
              <p className="font-[Poppins] text-white font-bold">Prontinho!</p>
              <p className="text-[0.9em] text-white">Um de nossos consultores entrará em contato com você!</p>
            </div>
          </div>
        ) : (
          <h1 className="font-bold text-center mb-[2em]">Seja bem vindo! Estamos muito felizes de ter você aqui!</h1>
        )}
        <div className="flex justify-center items-center bg-[#FF6600] p-[1em] = rounded-lg shadow-lg shadow-[#000]/40 max-w-[700px]">
          <form className="bg-[url('/img/background.png')] bg-center bg-cover bg-no-repeat text-white p-[1em] rounded-lg" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome ou Apelido" id="nome" className="w-full bg-[#F9F9F9]/20 py-[0.3em] px-[0.8em] text-white rounded-lg mb-[0.5em] focus:outline focus:outline-[#ff6600] placeholder:text-white placeholder:text-[0.9em]" />
            <input type="email" placeholder="E-mail" id="email" className="w-full bg-[#F9F9F9]/20 py-[0.3em] px-[0.8em] text-white rounded-lg mb-[0.5em] focus:outline focus:outline-[#ff6600] placeholder:text-white placeholder:text-[0.9em]"/>
            <input type="tel" placeholder="Telefone" id="telefone" className="w-full bg-[#F9F9F9]/20 py-[0.3em] px-[0.8em] text-white rounded-lg mb-[0.5em] focus:outline focus:outline-[#ff6600] placeholder:text-white placeholder:text-[0.9em]"/>
            <textarea id="descricao" placeholder="Por que você quer falar com a gente" className="w-full bg-[#F9F9F9]/20 py-[0.3em] px-[0.8em] text-white rounded-lg mb-[0.5em] focus:outline focus:outline-[#ff6600] placeholder:text-white placeholder:text-[0.9em] h-[159px]"></textarea>
            <div className="w-full flex justify-end">
              <button className="text-right py-[0.3em] px-[1em] text-[0.8em] bg-white text-[#FF6600] rounded-lg mt-[1em] hover:bg-[#fffc] transition-all disabled:bg-gray-600/20 disabled:text-gray-950/20 cursor-pointer " disabled={mensagemSucesso !== ''}>{loading ? (
                <img src="/img/loader.png" alt="Load" className="w-[1.5em] animate-spin"/>
              ) : (
                'Enviar'
              )}</button>
            </div>
          </form>

        </div>
      </div>
      <div className="bg-white flex items-center justify-center">
        <div className="flex items-center px-[3em] pt-[2em] max-w-[700px]">
          <img src="/img/imagemFamilia.png" alt="Familia" className="mr-[1em] h-[250px]"/>
          <div className="text-[0.8em]">
            <h2 className="font-bold mb-[1em]">Sua Saúde e Segurança em Boas Mãos</h2>
            <p>Na Optas Consultoria, entendemos que cuidar da saúde e proteger o que é importante para você e sua empresa vai além de uma simples escolha, é uma decisão estratégica!</p>
            <br />
            <p>Com ampla experiência no mercado de saúde suplementar e seguros, oferecemos soluções personalizadas e acompanhamento próximo em todas as etapas. </p>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center">
        <div className="bg-white px-[3em] pt-[2em] pb-[3em] max-w-[700px]">
          <h3 className="font-bold pb-[0.5em]">Por que escolher a Optas Consultoria?</h3>
          <Check>Especialização em Saúde Suplementar</Check>
          <Check>Atendimento Humano e Consultivo</Check>
          <Check>Transparência em Todos os Processos</Check>
          <Check>Ampla Rede de Parceiros e Operadoras</Check>
          <Check>Gestão Contínua e Pós-venda Ativo</Check>
          <Check>Soluções Inteligentes para Redução de Custos</Check>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white m-[3em] p-[2em] rounded-4xl text-[0.8em] max-w-[700px]">
          <h4 className="font-bold mb-[1em]">Para quem é a Optas?</h4>
          <p className="text-[#FF6600] mb-[0.5em]">Se você busca por planos de saúde ideais, gestão completa de benefícios, seguros com respaldo técnico e um atendimento humano e confiável... </p>
          <p className="text-[#FF6600] font-bold italic">Você está no lugar certo!</p>
        </div>
      </div>
      <div className="bg-white p-[3em]">
        <h5 className="text-[#FF6600] text-center font-bold">Soluções sob medida!</h5>
        <p className="text-center text-[0.8em] mb-[0.5em]">Conheça nossos serviços personalizados:</p>
        <div className="bg-white flex justify-center">
          <div className="flex justify-between max-w-[700px]">
            <div className="flex flex-col items-center mr-[0.8em]">
              <p className="mt-[0.8em] mb-[0.5em] text-[0.9em] text-[#FF6600] font-bold">Para você:</p>
              <Solucoes icone="coracao">Seguro Saúde e Odontológico</Solucoes>
              <Solucoes icone="curativo">Seguro de Vida</Solucoes>
              <Solucoes icone="carro">Seguro Auto/Moto</Solucoes>
              <Solucoes icone="casa">Seguro Patrimonial</Solucoes>
              <Solucoes icone="aviao">Seguro Viagem</Solucoes>
            </div>
            <div className="flex flex-col items-center">
              <p className="mt-[0.8em] mb-[0.5em] text-[0.9em] text-[#FF6600] font-bold">Para sua empresa:</p>
              <Solucoes icone="coracao">Seguro Saúde e Odontológico</Solucoes>
              <Solucoes icone="curativo">Seguro de Vida em Grupo</Solucoes>
              <Solucoes icone="predio">Seguro Empresarial</Solucoes>
              <Solucoes icone="escudo">Riscos Digitais</Solucoes>
              <Solucoes icone="trabalhador">Responsabilidade Civil</Solucoes>
            </div>
          </div>
        </div>
        <p className="font-bold text-[#FF6600] text-center text-[0.9em] mt-[1em]">E o melhor: temos ainda mais para oferecer!</p>
      </div>
      <div className="bg-[url('/img/backgroundRetangulo.png')] flex flex-col justify-center items-center bg-center bg-cover bg-no-repeat text-white p-[3em]">
        <div className="flex items-center justify-center mb-[1em]">
          <img src="/img/sms.png" alt="Icone caixa de dialogo" className="mr-[1em]"/>
          <h6 className="font-bold text-[0.9em]">Ficamos no aguardo do seu contato!</h6>
        </div>
        <img src="/img/corporativo.png" alt="Equipe" />
        <div className="bg-[#F9F9F93D] p-[1em] text-[0.8em] mt-[1em] rounded-lg max-w-[700px]">
          <p>Estamos prontos para ouvir você e encontrar a melhor solução para o seu momento. Seja para proteger sua família, sua empresa ou seu futuro, conte com o cuidado e a experiência da Optas.</p>
          <br />
          <p>Preencha o formulário e fale com um de nossos consultores — vamos juntos construir um caminho mais seguro e tranquilo.</p>
          <br />
          <p>Aproveite e acompanhe nossas redes sociais para ficar por dentro de dicas, novidades e conteúdos que podem facilitar sua vida!</p>
        </div>
        <div className="flex justify-center mt-[2em]">
          <Link href="https://www.facebook.com/optasconsultoria/" className="cursor-pointer"><img src="/img/facebook.png" alt="Facebook icon" className="mr-[1em]"/></Link>
          <Link href="https://www.instagram.com/optasconsultoria/" className="cursor-pointer"><img src="/img/instagram.png" alt="Instagram icon" className="mr-[1em]" /></Link>
          <Link href="https://br.linkedin.com/company/optas-consultoria" className="cursor-pointer"><img src="/img/linkedn.png" alt="Linkedn icon"/></Link>
        </div>
      </div>
    </div>
  );
}
