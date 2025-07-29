'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/animations';
import { CreditCard, ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { savedLoanData } from './hero';

type CTAProps = {
  dictionary: Dictionary;
};

export const CTA = ({ dictionary }: CTAProps) => {
  // Create WhatsApp message with saved loan data if available
  const getWhatsAppMessage = () => {
    if (savedLoanData.amount === 0) {
      return "Hola, quiero solicitar un préstamo con Finna";
    }

    return `Hola, quiero solicitar un préstamo con Finna por $${savedLoanData.amount} a ${savedLoanData.term} meses. Mi cotización muestra una cuota mensual de $${savedLoanData.monthlyPayment.toFixed(2)}. ¿Podrían ayudarme con el trámite?`;
  };

  return (
    <div className="w-full py-20 lg:py-32 bg-green-600 dark:bg-green-900">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
          id="contact"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {dictionary.web.home.cta.title}
          </h2>
          <div className="w-20 h-1 bg-white rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-white/90">
            {dictionary.web.home.cta.description}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Apply for loan button */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {dictionary.web.global.primaryCta}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Proceso 100% digital y rápido</p>
                </div>
              </div>

              <p className="mb-8 text-gray-600 dark:text-gray-300">Completa nuestra solicitud en línea y recibe una respuesta inmediata. Nuestros asesores te guiarán durante todo el proceso para que recibas el dinero en menos de 24 horas.</p>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">1</div>
                  <p className="flex-1 text-gray-800 dark:text-gray-200">Calcula tu préstamo con nuestra herramienta</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">2</div>
                  <p className="flex-1 text-gray-800 dark:text-gray-200">Completa el formulario de solicitud por WhatsApp</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">3</div>
                  <p className="flex-1 text-gray-800 dark:text-gray-200">Recibe el dinero en menos de 24hs</p>
                </div>
              </div>

              <Link
                href={`https://wa.me/5493813276300?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank"
                className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-4 rounded-lg font-medium transition-all shadow-lg text-center"
              >
                <Smartphone className="w-5 h-5" />
                <span>{dictionary.web.global.primaryCta}</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
