'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, CreditCard, Shield, CheckCircle } from 'lucide-react';
import logo from '@/public/logo.png';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Dictionary } from '@repo/internationalization';

// Simple loan data structure for saving quotes
const defaultLoanData = {
  amount: 0,
  term: 0,
  rate: 0,
  monthlyPayment: 0,
  totalPayment: 0
};

// Use a fallback if the imported one isn't available yet
let savedLoanData;
try {
  savedLoanData = require('../(home)/components/hero').savedLoanData || defaultLoanData;
} catch (e) {
  savedLoanData = defaultLoanData;
}

type FooterProps = {
  dictionary?: Dictionary;
};

export const Footer = ({ dictionary }: FooterProps) => {
  const params = useParams();
  const locale = params.locale as string;

  // Determine if we're using English
  const isEnglish = locale === 'en';

  // Create WhatsApp message with saved loan data if available
  const getWhatsAppMessage = () => {
    if (!savedLoanData || savedLoanData.amount === 0) {
      return isEnglish
        ? "Hello, I'd like to apply for a loan with Finna"
        : "Hola, quiero solicitar un préstamo con Finna";
    }

    return isEnglish
      ? `Hello, I'd like to apply for a Finna loan of $${savedLoanData.amount} for ${savedLoanData.term} months. My quote shows a monthly payment of $${savedLoanData.monthlyPayment.toFixed(2)}. Could you help me with the process?`
      : `Hola, quiero solicitar un préstamo con Finna por $${savedLoanData.amount} a ${savedLoanData.term} meses. Mi cotización muestra una cuota mensual de $${savedLoanData.monthlyPayment.toFixed(2)}. ¿Podrían ayudarme con el trámite?`;
  };

  // Navigation labels
  const navLabels = {
    navigation: isEnglish ? "Navigation" : "Navegación",
    home: isEnglish ? "Home" : "Inicio",
    advantages: isEnglish ? "Advantages" : "Ventajas",
    process: isEnglish ? "Process" : "Proceso",
    testimonials: isEnglish ? "Testimonials" : "Testimonios",
    faq: isEnglish ? "FAQ" : "Preguntas Frecuentes"
  };

  // Features labels
  const featureLabels = {
    features: isEnglish ? "Features" : "Características",
    loans: isEnglish ? "Personal loans" : "Préstamos personales",
    secure: isEnglish ? "100% secure" : "100% seguro",
    approval: isEnglish ? "Fast approval" : "Aprobación rápida"
  };

  // Contact labels
  const contactLabels = {
    contact: isEnglish ? "Contact" : "Contacto",
    apply: isEnglish ? "Apply for a Loan" : "Solicitar Préstamo"
  };

  // Footer labels
  const footerLabels = {
    rights: isEnglish ? "All rights reserved" : "Todos los derechos reservados",
    privacy: isEnglish ? "Privacy Policy" : "Política de Privacidad",
    terms: isEnglish ? "Terms and Conditions" : "Términos y Condiciones"
  };

  // Company description
  const companyDescription = isEnglish
    ? "We transform access to personal loans with a 100% digital process. Get the financing you need quickly, securely, and hassle-free."
    : "Transformamos el acceso a préstamos personales con un proceso 100% digital. Obtenga la financiación que necesita de manera rápida, segura y sin complicaciones.";

  return (
    <footer className="relative mt-24 border-t border-green-100 dark:border-green-900 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500/5 dark:bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-green-400/5 dark:bg-green-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
          {/* Logo and description */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-2 items-center mb-6"
            >
              <Image
                src={logo}
                alt="Finna - Préstamos Personales"
                width={60}
                height={60}
                className="h-14 w-auto"
              />
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">Finna</span>
            </motion.div>

            <p className="leading-relaxed max-w-sm text-gray-600 dark:text-gray-300">
              {companyDescription}
            </p>
            {/* <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <Linkedin />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-center md:text-left text-gray-800 dark:text-white">
              {navLabels.navigation}
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link
                  href={`/${locale}#inicio`}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {navLabels.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#ventajas`}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {navLabels.advantages}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#proceso`}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {navLabels.process}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#testimonios`}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {navLabels.testimonials}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#faq`}
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  {navLabels.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-center md:text-left text-gray-800 dark:text-white">
              {featureLabels.features}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <CreditCard className="w-4 h-4 text-green-500" />
                <span>{featureLabels.loans}</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{featureLabels.secure}</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start text-gray-600 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{featureLabels.approval}</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-center md:text-left text-gray-800 dark:text-white">
              {contactLabels.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-green-500" />
                <a
                  href="mailto:info@finna.com.ar"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  info@finna.com.ar
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-green-500" />
                <a
                  href="https://wa.me/5493816437968"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  +54 9 3541 28-6481
                </a>
              </li>
              <li className="mt-4">
                <Link
                  href={`https://wa.me/5493816437968?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  {contactLabels.apply}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-100 dark:border-green-900"></div>

        {/* Bottom footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="text-center">
            © {new Date().getFullYear()} Finna. {footerLabels.rights}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <motion.a
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {footerLabels.privacy}
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {footerLabels.terms}
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};
