// components/ui/TabsViewFancy.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryIcon } from '@/types/techIcons';
import { OrbitingSkills } from '../OrbitingSkills';

interface Tab {
  id: number;
  name: string;
  icon: string;
  type: string;
  content: React.ReactNode;
}

interface TabsViewFancyProps {
  skillsData: Record<string, string[]>;
}

export default function TabsViewFancy({ skillsData }: TabsViewFancyProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab !== null) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const tabs: Tab[] = Object.keys(skillsData).map((category, index) => ({
    id: index,
    name: category,
    icon: getCategoryIcon(category),
    type: 'content',
    content: <OrbitingSkills skills={skillsData[category]} />,
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-2xl">
        <div className="sm:w-72 flex sm:flex-col rounded-2xl  backdrop-blur-md ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative group flex items-center w-full px-4 py-3 sm:py-4 text-sm sm:text-base font-semibold
                transition-all duration-200
                ${
                  activeTab === tab.id
                    ? 'text-white dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                }
              `}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabBackground"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <div className="flex items-center gap-3 z-10">
                <span className="text-lg sm:text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </div>
              {activeTab === tab.id ? (
                <motion.div
                  layoutId="activeDot"
                  className="absolute right-3 w-2 h-2 rounded-full bg-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                />
              ) : (
                <div className="absolute right-3 w-2 h-2 rounded-full bg-gray-400/0 group-hover:bg-gray-400/20 transition-colors" />
              )}
            </button>
          ))}
        </div>
        <div className="flex-1 relative rounded-2xl  min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="loader"
                className="absolute inset-0 z-20 flex items-center justify-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="animate-spin h-8 w-8 text-cyan-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full flex items-center justify-center"
            >
              {tabs[activeTab]?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}