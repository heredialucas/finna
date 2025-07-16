'use client';

import type { Dictionary } from '@repo/internationalization';
import { Smartphone, Zap, Shield, Percent, BarChart3, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../lib/animations';

type FeaturesProps = {
  dictionary: Dictionary;
};

export const Features = ({ dictionary }: FeaturesProps) => {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: dictionary.web.home.features.items[0].title,
      description: dictionary.web.home.features.items[0].description
    },
    {
      icon: <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: dictionary.web.home.features.items[1].title,
      description: dictionary.web.home.features.items[1].description
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: dictionary.web.home.features.items[2].title,
      description: dictionary.web.home.features.items[2].description
    },
    {
      icon: <Percent className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: dictionary.web.home.features.items[3].title,
      description: dictionary.web.home.features.items[3].description
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: dictionary.web.home.features.items[4].title,
      description: dictionary.web.home.features.items[4].description
    },
    {
      icon: <Users className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: dictionary.web.home.features.items[5].title,
      description: dictionary.web.home.features.items[5].description
    }
  ];

  return (
    <motion.section
      id="ventajas"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="w-full py-20 lg:py-40 relative bg-green-50 dark:bg-green-900/10"
    >
      <div className="container mx-auto px-4">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-10 top-1/2 w-40 h-40 bg-green-500/20 dark:bg-green-500/10 rounded-full blur-2xl"></div>
          <div className="absolute right-20 bottom-1/4 w-32 h-32 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-green-600/40 dark:bg-green-600/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-green-600/20 dark:bg-green-600/10 rounded-full"></div>
        </div>

        {/* Header */}
        <motion.div variants={fadeIn} className="text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 var(--font-nunito)">
            {dictionary.web.home.features.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto var(--font-nunito)">
            {dictionary.web.home.features.description}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-700 transition-all group hover:transform hover:scale-105 shadow-lg"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors var(--font-nunito)">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors var(--font-nunito)">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
