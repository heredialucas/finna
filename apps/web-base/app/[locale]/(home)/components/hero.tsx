'use client';

import type { Dictionary } from '@repo/internationalization';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import animation_focus from '@/public/focus.json';
import logo from '@/public/logo.png';
import { staggerContainer, fadeIn, slideIn } from '../lib/animations';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type HeroProps = {
  dictionary: Dictionary;
};

// Create a simple store for the loan data
export let savedLoanData = {
  amount: 0,
  term: 0,
  rate: 0,
  monthlyPayment: 0,
  totalPayment: 0
};

export const Hero = ({ dictionary }: HeroProps) => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(24);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
    const totalPayment = monthlyPayment * loanTerm;

    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
    setHasCalculated(true);

    // Save to the global store
    savedLoanData = {
      amount: loanAmount,
      term: loanTerm,
      rate: interestRate,
      monthlyPayment: monthlyPayment,
      totalPayment: totalPayment
    };
  };

  // Create WhatsApp message with loan details
  const getWhatsAppMessage = () => {
    if (!hasCalculated) return "Hola, quiero solicitar un préstamo con Finna";

    return `Hola, quiero solicitar un préstamo con Finna por $${loanAmount} a ${loanTerm} meses. Mi cotización muestra una cuota mensual de $${monthlyPayment.toFixed(2)}. ¿Podrían ayudarme con el trámite?`;
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-[calc(100vh-4rem)] flex items-center relative px-4"
      id="inicio"
    >
      {/* Decorative elements specific to the hero */}
      <div className="absolute -top-10 right-1/4 w-20 h-20 bg-green-500/20 dark:bg-green-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-green-600/10 dark:bg-green-600/5 rounded-full blur-2xl"></div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div variants={slideIn} className="pt-8 md:pt-0">
            <motion.div
              className="flex items-center gap-4 mb-8"
              variants={fadeIn}
            >
              <Image
                src={logo}
                alt="Finna - Préstamos Personales"
                width={120}
                height={120}
                className="w-auto h-24"
              />
              <span className="text-4xl font-bold text-green-600 dark:text-green-400">Finna</span>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"
              variants={fadeIn}
            >
              {dictionary.web.home.hero.title}
            </motion.h1>
            <motion.p className="text-gray-600 dark:text-gray-300 text-lg mb-8" variants={fadeIn}>
              {dictionary.web.home.hero.subtitle}
            </motion.p>
            <Link href={`https://wa.me/5493816437968?text=${encodeURIComponent(getWhatsAppMessage())}`} target="_blank">
              <motion.button
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {dictionary.web.home.hero.cta}
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-green-200 dark:border-green-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">{dictionary.web.home.hero.calculator.title}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{dictionary.web.home.hero.calculator.amount}</label>
                <div className="flex items-center">
                  <span className="bg-green-100 dark:bg-green-900 px-3 py-2 rounded-l-md text-green-600 dark:text-green-400 font-medium">$</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="flex-grow border border-green-200 dark:border-green-700 rounded-r-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    min="1000"
                    max="50000"
                    step="1000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{dictionary.web.home.hero.calculator.term}</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full border border-green-200 dark:border-green-700 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="18">18</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{dictionary.web.home.hero.calculator.rate}</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="flex-grow border border-green-200 dark:border-green-700 rounded-l-md p-2 focus:outline-none focus:ring-1 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    min="5"
                    max="40"
                    step="0.5"
                  />
                  <span className="bg-green-100 dark:bg-green-900 px-3 py-2 rounded-r-md text-green-600 dark:text-green-400 font-medium">%</span>
                </div>
              </div>
              <button
                onClick={calculateLoan}
                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all font-medium shadow-md"
              >
                {dictionary.web.home.hero.calculator.calculate}
              </button>
              {monthlyPayment > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-md border border-green-200 dark:border-green-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{dictionary.web.home.hero.calculator.monthlyPayment}:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">${monthlyPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{dictionary.web.home.hero.calculator.totalPayment}:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">${totalPayment.toFixed(2)}</span>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`https://wa.me/5493816437968?text=${encodeURIComponent(getWhatsAppMessage())}`}
                      target="_blank"
                      className="block w-full bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition-all font-medium shadow-md"
                    >
                      {dictionary.web.global.primaryCta}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

