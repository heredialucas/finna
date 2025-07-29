'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/design-system/components/ui/accordion';
import { Button } from '@repo/design-system/components/ui/button';
import type { Dictionary } from '@repo/internationalization';
import { MessageCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations';
import { savedLoanData } from './hero';

type FAQProps = {
  dictionary: Dictionary;
};

export const FAQ = ({ dictionary }: FAQProps) => {
  // Create WhatsApp message with saved loan data if available
  const getWhatsAppMessage = () => {
    if (savedLoanData.amount === 0) {
      return "Hola, tengo preguntas sobre los préstamos de Finna. ¿Podrían ayudarme?";
    }

    return `Hola, tengo preguntas sobre mi cotización de préstamo de $${savedLoanData.amount} a ${savedLoanData.term} meses. ¿Podrían ayudarme?`;
  };

  return (
    <div className="w-full py-20 lg:py-40" id="faq">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {dictionary.web.home.faq.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4"></div>
          <p className="text-base text-gray-600 dark:text-gray-300">
            {dictionary.web.home.faq.description}
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-6 items-center lg:items-start"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mb-2">
              <HelpCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              {dictionary.web.home.faq.needMore}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center lg:text-left mb-4">
              {dictionary.web.home.faq.contactDescription}
            </p>
            <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-md" asChild>
              <Link href={`https://wa.me/5493813276300?text=${encodeURIComponent(getWhatsAppMessage())}`} target="_blank">
                {dictionary.web.home.faq.cta}{' '}
                <MessageCircle className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <Accordion type="single" collapsible className="w-full">
              {dictionary.web.home.faq.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`index-${index}`}
                  className="mb-3 border border-green-200 dark:border-green-800 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline font-medium text-gray-800 dark:text-white hover:text-green-600 dark:hover:text-green-400">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
