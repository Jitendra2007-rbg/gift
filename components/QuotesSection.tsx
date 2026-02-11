import React from 'react';
import { Quote as QuoteIcon } from 'lucide-react';
import { CONTENT } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const QuoteCard: React.FC<{ quote: typeof CONTENT.quotes[0]; index: number }> = ({ quote, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={`relative p-8 md:p-12 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <QuoteIcon className="absolute top-6 left-6 w-10 h-10 text-romantic-200 opacity-50 rotate-180" />
      <div className="relative z-10 text-center">
        <p className="font-serif text-2xl md:text-3xl text-gray-800 leading-relaxed mb-6 italic">
          "{quote.text}"
        </p>

      </div>
    </div>
  );
};

export const QuotesSection: React.FC = () => {
  return (
    <section id="quotes" className="py-24 bg-gradient-to-br from-romantic-50 via-white to-romantic-100 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-romantic-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-romantic-900 mb-4">Words of Love</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto"></div>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {CONTENT.quotes.map((quote, index) => (
            <QuoteCard key={quote.id} quote={quote} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
