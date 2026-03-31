import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que torna essa experiência única?",
    answer: `A Pousada Recanto Pitangal oferece mais do que hospedagem, é uma imersão no bem-estar, na natureza e no aconchego.

• Banheira de hidromassagem climatizada com vista para a natureza e cromoterapia integrada
• Iluminação ambiente romântica para momentos especiais
• Fogueira com pedras naturais e bancos rústicos, ideal para marshmallows e conversas ao ar livre
• Clima perfeito para contemplar o céu estrelado
• Churrasqueira completa para preparar aquele jantar especial
• Cozinha equipada com utensílios do dia a dia
• Armário com itens básicos de comida e conveniência
• Garagem coberta para sua comodidade
• Quarto aconchegante
• Sala com lareira para noites quentinhas`,
  },
  {
    question: "Qual o tipo de acomodação?",
    answer: `É um chalé completo e exclusivo, ideal para 2 pessoas, com:

• 1 cama queen-size
• Sala, cozinha, banheiro privativo, varanda e muito mais.`,
  },
  {
    question: "Quais comodidades estão disponíveis?",
    answer: `O espaço conta com:

• Hidromassagem climatizada
• TV 50" com streaming
• Wi-Fi
• Ar-condicionado split
• Lareira
• Chuveiro quente
• Itens de higiene (xampu, sabonete, condicionador)
• Roupas de cama e cobertores extras
• Ferro de passar
• Cozinha com geladeira, fogão, micro-ondas, utensílios e temperos
• Churrasqueira
• Fogueira e rede
• Estacionamento incluso
• Espaço de trabalho`,
  },
  {
    question: "Aceita animais de estimação?",
    answer: "Sim! Animais são bem-vindos! 🐶🐱",
  },
  {
    question: "Tem café da manhã incluso?",
    answer: "Sim! O café da manhã é servido com muito carinho.",
  },
  {
    question: "Quais são os horários de Check-in e Checkout?",
    answer: `Check-in: a partir das 15h
Check-out: até 12h`,
  },
  {
    question: "Onde fica a pousada?",
    answer: `Em Sapucaí-Mirim – MG, perto de cidades turísticas como:

• São Bento do Sapucaí
• Campos do Jordão
• Gonçalves
• Santo Antônio do Pinhal`,
  },
  {
    question: "É seguro e limpo?",
    answer: `Sim! A hospedagem possui:

• Nota 5.0 em limpeza, comunicação e localização
• Avaliações elogiam o cuidado, organização e hospitalidade
• Câmeras externas garantem segurança extra`,
  },
  {
    question: "Como é o anfitrião?",
    answer: "O anfitrião Herbet tem 100% de avaliações 5 estrelas e é conhecido pela atenção, hospitalidade e prontidão.",
  },
  {
    question: "Como faço para reservar?",
    answer: "Você pode conferir datas disponíveis e fazer sua reserva pelo Airbnb ou entrar em contato pelo WhatsApp.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-gold" />
            <span className="font-body text-gold text-base uppercase tracking-[0.2em]">
              Tire suas dúvidas
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
            Dúvidas Frequentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border border-border rounded-lg px-6 overflow-hidden"
            >
              <AccordionTrigger className="font-body text-foreground text-left hover:no-underline hover:text-gold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground whitespace-pre-line leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
