'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../lib/animations';
import dynamic from 'next/dynamic';
import animation_software from '@/public/software.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type StatsProps = {
  dictionary: Dictionary;
};

export const Stats = ({ dictionary }: StatsProps) => {
  const process = dictionary.web.home.stats.process.map(item => ({
    title: item.title,
    description: item.description
  }));

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="container mx-auto px-4 py-16 relative"
      id="proceso"
    >
      {/* Decorative elements */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl"></div>
      <div className="absolute left-1/4 top-1/2 w-1 h-1 bg-green-600/40 dark:bg-green-600/20 rounded-full"></div>

      {/* Header */}
      <motion.div
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 var(--font-nunito)">
          {dictionary.web.home.stats.title}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-6"></div>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto var(--font-nunito)">
          {dictionary.web.home.stats.description}
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Process List - Always visible first on mobile */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="space-y-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, x: -50 },
                  animate: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex items-start gap-6 group hover:translate-x-2 transition-all duration-300">
                  {/* Number with hover effect */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-md group-hover:bg-green-50 dark:group-hover:bg-green-900/30 transition-all duration-300">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {index + 1}
                      </span>
                    </div>
                    {/* Connector line */}
                    {index < process.length - 1 && (
                      <div className="absolute top-12 left-1/2 w-px h-16 bg-gradient-to-b from-green-200 dark:from-green-800 to-transparent -translate-x-1/2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors var(--font-nunito)">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed group-hover:text-gray-800 dark:group-hover:text-white transition-colors var(--font-nunito)">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute -left-3 top-1/2 w-1 h-8 bg-green-400/0 rounded-r group-hover:bg-green-400/50 -translate-y-1/2 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animation - Moves to the right on desktop */}
        <motion.div
          variants={fadeIn}
          className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center"
        >
          <div className="w-full max-w-md">
            <Lottie animationData={animation_software} loop={true} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
